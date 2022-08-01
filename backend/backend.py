
import sys,os
from database import for_loop_new_emp_insert_performance,update_or_insert_to_change_banch_name
from database import select_performance_year_month_account, update_performance_who_change_banch
from database import updata_to_table_user_group
sys.path.append(os.path.dirname(os.path.abspath(__file__))+'/package')
sys.path.append(os.path.dirname(os.path.abspath(__file__))+'\package')
from database import update_to_table_performance_per_month
from database import for_loop_insert_performance,use_position_select_admin_user_name_emp_id
from database import select_performance_admin,select_performance_manager,select_banch_all
from package.flask_cors import CORS, cross_origin
import package.jwt as jwt
from database import choose_insert_or_update_to_user,select_performance_admin_off_work,select_admin_user_off_work,sort
from database import verify_user,select_user_banch,select_banch,select_performance_personal,select_performance_admin_select_manager
from database import select_manager_user_name_emp_id,select_admin_user_name_emp_id,select_user_account
from flask import Flask, app, request, jsonify

from package.dotenv import load_dotenv

app = Flask(__name__)


load_dotenv()
secret=os.getenv('JWT_SECRET_KEY')

def token_encoding(account):
    #編碼
    print('------------------------token_encoding____________________________')
    token = jwt.encode({"account":account },
                               secret, algorithm='HS256')
    print('token',token)
    token_decoding(token)
    return token

def token_decoding(token):
    print('------------------------token_decoding____________________________')
    
    data = jwt.decode(token, secret, algorithms='HS256')

    if select_user_account(data['account']):
        print('data',data)
        return data,True
    print(data)
    return {},False




def handle(arr,state,permession,account):
    dic={}
    print(arr)
    if state==1:
        #每月績效
        for banch in arr:
            if(permession=='manager'):
                banch_data=select_performance_manager(banch[0],'on')
                
                dic[banch[0]]=banch_data
                manager_personal=select_performance_personal(account)
                dic['manager_personal']=manager_personal
            elif(permession=='admin'):
                banch_data=select_performance_admin(banch[0],'on')
                dic[banch[0]]=banch_data
                
        if permession=='admin':
            off_work=select_performance_admin_off_work('off')
            dic['離職員工']=[]if off_work==False else off_work
            manager_data=select_performance_admin_select_manager()
            dic['幹部']=[]if manager_data==False else manager_data
        return dic
    elif state==2:
        #年度績效分數
        for banch in arr:
            if(permession=='manager'):
                banch_data=select_performance_manager(banch[0],'on')
                manager_personal=select_performance_personal(account)
                dic[banch[0]]=sort(banch_data)
                dic['manager_personal']=sort(manager_personal)
            elif(permession=='admin'):
                banch_data=select_performance_admin(banch[0],'on')
                sort_data=sort(banch_data)
                dic[banch[0]]=sort_data
        if permession=='admin':
            #加上離職員工
            off_work=select_performance_admin_off_work('off')
            off_work=sort(off_work)
            dic['離職員工']=[]if off_work==False else off_work
            manager_data=select_performance_admin_select_manager()
            manager_data=sort(manager_data)
            dic['幹部']=[]if manager_data==False else manager_data
        return dic
    
        

def accroding_permession_select_route(permession,account,state):
    dic={}
    if(permession=='admin'):
        banch=select_banch_all()
    elif(permession=='manager'):
        banch=[[select_user_banch(account)]]
    else:
        if(state==1):
            dic['personal']=select_performance_personal(account)
            return dic
        else:
            dic['personal']=sort(select_performance_personal(account))
            return dic
    print('banch::::',banch)
    return handle(banch,state,permession,account)
        
@app.route('/backend', methods=['POST'])
@cross_origin()
def backend():
    token = request.headers['token']
    token,status=token_decoding(token)
    if status:
        permession=select_banch(token['account'])
        data=accroding_permession_select_route(permession,token['account'],1)
        return jsonify(data),200
    return jsonify('fail'),500


@app.route('/backend/year_performance', methods=['POST'])
@cross_origin()
def backend_year_performance():
    token = request.headers['token']
    token,status=token_decoding(token)
    if status:
        permession=select_banch(token['account'])
        data=accroding_permession_select_route(permession,token['account'],2)
        return jsonify(data),200
    return jsonify('fail'),500



def handle_select_employee(arr,permession,account):
    dic={}
    print(arr)
    if permession=='admin':
        for banch in arr:
            banch_data=select_admin_user_name_emp_id(banch[0])
            dic[banch[0]]=banch_data
        off_work=select_admin_user_off_work()
        dic['離職員工']=[]if off_work==False else off_work
        manager_data=use_position_select_admin_user_name_emp_id('主管')
        dic['幹部']=[]if manager_data==False else manager_data
        return dic
    elif permession=='manager':
        for banch in arr:
            banch_data=select_manager_user_name_emp_id(banch[0])
            #banch_data,temp=splite(banch_data,2,account)
            dic[banch[0]]=banch_data
        return dic

@app.route('/backend/banch_index', methods=['POST'])
@cross_origin()
def backend_banch_index():
    token = request.headers['token']
    token,status=token_decoding(token)
    
    dic={}
    if status:
        account=token['account']
        permession=select_banch(token['account'])
        if(permession=='admin'):
            banch=select_banch_all()
            data=handle_select_employee(banch,permession,account)
        elif(permession=='manager'):
            banch=[[select_user_banch(account)]]
            data=handle_select_employee(banch,permession,account)
        else:
            dic['personal']=['not permession']
            return jsonify(dic),200
            
        print('banch::::',banch)

        
        return jsonify(data),200
    return jsonify('fail'),500

@app.route('/', methods=['POST'])
@cross_origin()
def login():
    data = request.get_json()
    account=data['account']
    password=data['password']

    print('original password account ==>',password,account)
    user_name=verify_user(account,password)
    if user_name:
        banch=select_user_banch(account)
        permession=select_banch(account)
        token=token_encoding(account)
        dic = {
            'token': token,
            'user_name': user_name,
            'banch':banch,
            'permession':permession
        }
        return jsonify(dic),200
    return jsonify('帳號或密碼輸入錯誤'),500

@app.route('/getUserData', methods=['POST'])
@cross_origin()
def getUserData():
    token = request.headers['token']
    user, status = token_decoding(token)
    print('getUserData => ', user, status)
    user = user["account"]
    if status:
        banch = select_user_banch(user)
        permession = select_banch(user)
        token = token_encoding(user)
        dic = {
            'token': token,
            'banch':banch,
            'permession':permession
        }
        return jsonify(dic),200
    return jsonify('擷取資料錯誤'),500


@app.route('/backend/InsertBanchTable',methods=['POST'])
@cross_origin()
def backend_InsertBanchTable():
    token=request.headers['token']
    token,status=token_decoding(token)
    if status:
        data=request.get_json()

        print('/backend/InsertBanchTable ==>',data)
        result=choose_insert_or_update_to_user(data['data'])
        dict={}
        dict['data']=result
        return jsonify(dict),200
    return jsonify('fail'),500
    
@app.route('/backend/InsertPerformanceTable',methods=['POST'])
@cross_origin()
def backendInsertPerformanceTable():
    token=request.headers['token']
    token,status=token_decoding(token)
    if status:
        data=request.get_json()
        result=for_loop_insert_performance(data['data'])
        return jsonify(result),200
    return jsonify('fail'),500

@app.route('/backend/SelectAllBanch',methods=['POST'])
@cross_origin()
def backendSelectAllBanch():
    token=request.headers['token']
    token,status=token_decoding(token)
    temp=[]
    if status:
        data=select_banch_all()
        if data:
            for i in data:
                temp.append(i[0])
            return jsonify(temp),200
        return jsonify([]),200
    return jsonify('fail'),500

@app.route('/backend/UpdatePerformanceTable',methods=['POST'])
@cross_origin()
def backendUpdatePerformanceTable():
    token=request.headers['token']
    token,status=token_decoding(token)
    if status:
        data=request.get_json()
        try:
            update_to_table_performance_per_month(data['data'])
            return jsonify('新增成功'),200
        except:
            return jsonify('更改失敗 資料重複'),200
    return jsonify('fail'),500
'''
@app.route('/backend/getfile',methods=['POST'])
@cross_origin()
def backendGetFile():
    token=request.headers['token']
    token,status=token_decoding(token)
    if status:
        
        return jsonify(),200
    return jsonify('fail'),500
'''
@app.route('/backend/GroupChange',methods=['POST'])
@cross_origin()
def backendGroupChange():
    token=request.headers['token']
    token,status=token_decoding(token)

    if status:
        data=request.get_json()
        updata_to_table_user_group(data['data'])
        return jsonify('l'),200
    return jsonify('fail'),500


@app.route('/backend/PerformanceBanchChange',methods=['POST'])
@cross_origin()
def backendPerformanceBanchChange():
    token=request.headers['token']
    token,status=token_decoding(token)
    if status:
        data=request.get_json()
        update_performance_who_change_banch(data['data'])#更新組別
        result=select_performance_year_month_account(data['data'])#尋找是否有更新進去
        if result:
            return jsonify('更改成功'),200
        return jsonify('更改失敗 未找到資料'),200
    return jsonify('fail',500)



@app.route('/backend/NewEmpInsertPerformanceTable',methods=['POST'])
@cross_origin()
def backendNewEmpInsertPerformanceTable():
    token=request.headers['token']
    token,status=token_decoding(token)
    
    if status:
        data=request.get_json()
        #data=[帳號,年,月]
        result=for_loop_new_emp_insert_performance(data['data'])
        return jsonify(result),200
    return jsonify('fail'),500



@app.route('/backend/ChangeBanchName',methods=['POST'])
@cross_origin()
def backendChangeBanchName():
    token=request.headers['token']
    token,status=token_decoding(token)
    
    if status:
        data=request.get_json()
        result=update_or_insert_to_change_banch_name(data['data'])
        return jsonify(result),200
    return jsonify('fail'),500


cors = CORS(app, resources={r"/*": {"origins": "*"}})

if __name__=="__main__":

    #=accroding_permession_select_route('personal','personalSocialWorker')
    #rint(a)
    # 跨域請求套件
    app.debug = True
    app.run(host='0.0.0.0', port=5000,threaded=True)
    
    