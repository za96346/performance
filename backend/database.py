import sys,os

sys.path.append(os.path.dirname(os.path.abspath(__file__))+'/package')
sys.path.append(os.path.dirname(os.path.abspath(__file__))+'\package')

from mysql import connector

#print(os.path.dirname(os.path.abspath(__file__)))當前的工作目錄

from progressBar import bar
import os
from package.dotenv import load_dotenv

def __init__():
    load_dotenv()
    host=os.getenv('DATABASE_HOST')
    port=os.getenv('DATABASE_PORT')
    user=os.getenv('DATABASE_USER')
    password=os.getenv('DATABASE_PASSWORD')
    connection = connector.connect(
        auth_plugin='mysql_native_password',
        host=host,
        port=port,
        user=user,
        password=password
        
    )
    cursor=connection.cursor()
    cursor.execute('set global max_connections=1000;')
    cursor.execute('''SET SESSION sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY,',''));''')#設置group by
    return connection


def return_combine_emp_id(emp_id_arr, search_account_arr):
    #print('\n------------------------return_combine_emp_id_____________________________')
    if emp_id_arr and search_account_arr:
        for performance_arr in search_account_arr:
            temp_list = []
            for emp_id in emp_id_arr:
                performance_arr.insert(0, emp_id)

    else:
        return False


def return_tuple_to_list(arr):
    #print('\n------------------------return_tuple_to_list_____________________________')
    data_list = []
    i=0
    if arr:
        for tuple_arr in arr:
            temp_list = []
            for item in range(0, len(tuple_arr)):
                temp_list.append(tuple_arr[item])
            data_list.append(temp_list)

            #print(temp_list)
            #bar('tuple_to_list',i,len(arr))
            i+=1
        return data_list
    else:
        return []


def return_tuple_to_single(arr):
    #print('\n------------------------return_tuple_to_single_____________________________')
    if arr:
        for i in arr[0]:
            #print(i)
            return i
    else:
        return []


def select_user_account(account):
    connection = __init__()
    cursor = connection.cursor()
    cursor.execute('use `dajia`;')

    cursor.execute(
        f"select * from `user` where `account`='{account}';")
    data = cursor.fetchall()
    data = return_tuple_to_single(data)
    cursor.close()
    connection.close()
    #print('\n------------------------select_user_account_____________________________')
    
    if data:
        print("right account", data)
        return True
    else:
        print("wrong account", data)
        return False

def select_user_work_state(account):
    connection=__init__()
    cursor=connection.cursor()
    cursor.execute('use `dajia`;')
    cursor.execute(
        f"select `work_state` from `user` where `account`='{account}';")
    data = cursor.fetchall()
    data = return_tuple_to_single(data)
    #print('\n------------------------select_user_work_state_____________________________')
    cursor.close()
    connection.close()
    if data=='on':
        return True
    elif data=='off':
        return False



def select_user_password(account, password):
    connection = __init__()
    cursor = connection.cursor()
    cursor.execute('use `dajia`;')
    cursor.execute(
        f"select `password` from `user` where `account`='{account}';")

    data = cursor.fetchall()
    data = return_tuple_to_single(data)
    #print('\n------------------------select_user_password____________________________')
    cursor.close()
    connection.close()
    if data:
        if password == data:
            print("right password", data)
            return True
        else:
            return False

    else:
        print("wrong password", data)
        return False


def select_user_name(account):
    connection = __init__()
    cursor = connection.cursor()
    cursor.execute('use `dajia`;')
    cursor.execute(f"select `name` from `user`where `account`='{account}';")
    data = cursor.fetchall()
    #print('\n------------------------select_user_name____________________________')
    print('user name', data)
    data = return_tuple_to_list(data)
    print('user name transfer after ==>', data[0])
    cursor.close()
    connection.close()
    return data[0]

def use_name_select_user_account(name):
    connection = __init__()
    cursor = connection.cursor()
    cursor.execute('use `dajia`;')
    cursor.execute(f"select `account` from `user`where `name`='{name}';")
    data = cursor.fetchall()
    data = return_tuple_to_list(data)
    cursor.close()
    connection.close()
    return data[0]

def select_admin_user_name_emp_id(banch):
    connection = __init__()
    cursor = connection.cursor()
    cursor.execute('use `dajia`;')
    cursor.execute(f"select * from `user`where `banch`='{banch}' and `work_state`='on';")
    data = cursor.fetchall()
    #print('\n------------------------select_admin_user_name_emp_id____________________________')
    cursor.close()
    connection.close()
    data = return_tuple_to_list(data)
    return data
def use_position_select_admin_user_name_emp_id(position):
    connection = __init__()
    cursor = connection.cursor()
    cursor.execute('use `dajia`;')
    cursor.execute(f"select * from `user`where `position`='{position}' and `work_state`='on';")
    data = cursor.fetchall()
    #print('\n------------------------select_admin_user_name_emp_id____________________________')
    cursor.close()
    connection.close()
    data = return_tuple_to_list(data)
    return data

def select_admin_user_off_work():
    connection = __init__()
    cursor = connection.cursor()
    cursor.execute('use `dajia`;')
    cursor.execute(f"select * from `user`where `work_state`='off';")
    data = cursor.fetchall()
    #print('\n------------------------select_admin_user_name_emp_id____________________________')
    cursor.close()
    connection.close()
    data = return_tuple_to_list(data)
    return data


def select_manager_user_name_emp_id(banch):
    connection = __init__()
    cursor = connection.cursor()
    cursor.execute('use `dajia`;')
    cursor.execute(f"select `emp_id`,`name`,`account` from `user`where `position`='一般職員' and `banch`='{banch}' and `work_state`='on';")
    data = cursor.fetchall()
    #print('\n------------------------sselect_manager_user_name_emp_id____________________________')
    cursor.close()
    connection.close()
    data = return_tuple_to_list(data)
    return data


def select_user_banch(account):
    connection = __init__()
    cursor = connection.cursor()
    cursor.execute('use `dajia`;')
    cursor.execute(f"select `banch` from `user` where `account`='{account}';")
    data = cursor.fetchall()
    #print('\n------------------------select_user_banch____________________________')
   # print('banch', data)
    cursor.close()
    connection.close()
    data = return_tuple_to_single(data)
    #print('banch transfer after ==>', data)
    return data


def select_banch_all():
    connection = __init__()
    cursor = connection.cursor()
    cursor.execute('use `dajia`;')
    cursor.execute(f"select `banch` from `banch`;")
    data = cursor.fetchall()
    #print('\n------------------------select_banch_all____________________________')
    cursor.close()
    connection.close()
    data = return_tuple_to_list(data)
    return data




def select_banch(account):
    connection = __init__()
    cursor = connection.cursor()
    cursor.execute('use `dajia`;')
    cursor.execute(f"select `position` from `user` where `account`='{account}';")
    position = cursor.fetchall()
    cursor.close()
    connection.close()
    #print('\n------------------------select_banch____________________________')
    position = return_tuple_to_single(position)
    if position=='管理員':
        print('permession:admin')
        return 'admin'
    elif position=='主管':
        print('permession:manager')
        return 'manager'

    elif position=='一般職員':
        print('permession:personal')
        return 'personal'



def select_user_emp_id(account):
    connection = __init__()
    cursor = connection.cursor()
    cursor.execute('use `dajia`;')
    cursor.execute(f"select `emp_id` from `user` where `account`='{account}';")
    data = cursor.fetchall()
    #print('\n------------------------select_user_emp_id____________________________')
    print(data)
    cursor.close()
    connection.close()
    data = return_tuple_to_single(data)
    return data





def sort(arr):
    #arr=[
    # [編號1,姓名1,目標,帳號1,年度,月份,態度分數,效率分數,專業分數,績效描述,遲到,未依規定請假]
    #[編號2,姓名2,目標,帳號2,年度,月份,態度分數,效率分數,專業分數,績效描述,遲到,未依規定請假]......
    # ]
    emp_arr=[]
    year_arr=[]
    data=[]
    if not arr:
        return []
    for data_in_arr in arr:
        if data_in_arr[3] not in emp_arr:
            emp_arr.append(data_in_arr[3])
        if data_in_arr[4] not in year_arr:
            year_arr.append(data_in_arr[4])
    #print('員工',emp_arr)
    #print('年度',year_arr)
    i=0
    banch=select_user_banch(emp_arr[0])

    for account in emp_arr:
        for year in year_arr:
            state=False
            attitude=0
            efficiency=0
            professional=0
            for data_in_arr in arr:

                if data_in_arr[3]==account:
                    if data_in_arr[4]==year:
                        state=True
                        emp_id=data_in_arr[0]
                        emp_name=data_in_arr[1]
                        emp_goal=data_in_arr[2]
                        emp_account=data_in_arr[3]
                        attitude+=data_in_arr[6]
                        efficiency+=data_in_arr[7]
                        professional +=data_in_arr[8]
                #bar(f'sort {banch}年度績效 排序',i,len(arr)*len(year_arr)*len(emp_arr))
                i+=1
                
            if emp_id and state==True:
                score=round(((attitude+efficiency+professional)/360)*100,1)
                data.append([emp_id,emp_name,'',year,score,emp_account])
                #print([emp_id,emp_name,emp_goal,year,score,emp_account])
    return data


def splite(arr,target_position,target):
    #把自己跟組員的資料分開
    return_arr=[]
    temp=[]
    i=0
    #print('------------------splite----------------------------------------------------')
    if not arr:
        return [],[]
    for data_in_arr in arr:
        if data_in_arr[target_position]==target:


            temp.append(data_in_arr)
            #print('manager 分開後',arr)
            #print('manager_personal',data_in_arr)

        else:
            return_arr.append(data_in_arr)
            #print('manager_group',data_in_arr)
        bar('部門組別',i,len(arr))
        i+=1   
    return return_arr,temp


def select_performance_personal(account):
    connection = __init__()
    cursor = connection.cursor()
    cursor.execute('use `dajia`;')
    cursor.execute(f'''select user.`emp_id`,
                            user.`name`,
                            performance_per_month.`goal`,
                            performance_per_month.`account`,
                            performance_per_month.`year`,
                            performance_per_month.`month`,
                            performance_per_month.`attitude`,
                            performance_per_month.`efficiency`,
                            performance_per_month.`professional`,
                            performance_per_month.`directions`,
                            ifnull(performance_per_month.`be_late`,0),
                            ifnull(performance_per_month.`day_off_not_on_rule`,0),
                            performance_per_month.`banch`
                                from `performance_per_month` 
                                    left join  `user` on
                                        user.`account`=performance_per_month.`account`

                                        where performance_per_month.`account`='{account}'  
                                        order by `year` desc,`month` asc;''')
    data = cursor.fetchall()
    #print('\n------------------------select_performance_personal____________________________')
    #print(data)
    data = return_tuple_to_list(data)
    cursor.close()
    connection.close()
    return data


def select_performance_manager(banch,state):
    connection = __init__()
    cursor = connection.cursor()
    cursor.execute('use `dajia`;')
    cursor.execute(f'''select user.`emp_id`,
                            user.`name`,
                            performance_per_month.`goal`,
                            performance_per_month.`account`,
                            performance_per_month.`year`,
                            performance_per_month.`month`,
                            performance_per_month.`attitude`,
                            performance_per_month.`efficiency`,
                            performance_per_month.`professional`,
                            performance_per_month.`directions`,
                            ifnull(performance_per_month.`be_late`,0),
                            ifnull(performance_per_month.`day_off_not_on_rule`,0),
                            performance_per_month.`banch`
                                from `performance_per_month` 
                                    inner join  `user` on
                                        user.`account`=performance_per_month.`account`
                                        and user.`work_state`='{state}'
                                        and user.`position`='一般職員'

                                    where user.`banch`='{banch}'
                                        and
                                        (performance_per_month.`banch`='{banch}'
                                        or performance_per_month.`banch`='')
                                    order by `year` desc,`month` asc;''')
    data = cursor.fetchall()
    #print('\n------------------------select_performance_manager____________________________')
    #print(data)
    #data = return_tuple_to_list(data)
    cursor.close()
    connection.close()
    return data


def select_performance_admin(banch,state):
    connection = __init__()
    cursor = connection.cursor()
    cursor.execute('use `dajia`;')
    
    cursor.execute(f'''select user.`emp_id`,
                            user.`name`,
                            performance_per_month.`goal`,
                            performance_per_month.`account`,
                            performance_per_month.`year`,
                            performance_per_month.`month`,
                            performance_per_month.`attitude`,
                            performance_per_month.`efficiency`,
                            performance_per_month.`professional`,
                            performance_per_month.`directions`,
                            ifnull(performance_per_month.`be_late`,0),
                            ifnull(performance_per_month.`day_off_not_on_rule`,0),
                            performance_per_month.`banch`
                                from `performance_per_month` 
                                    inner join  `user` on
                                        user.`account`=performance_per_month.`account`
                                        and user.`work_state`='{state}'
                                        
                                        where performance_per_month.`banch`='{banch}'
                                        order by `year` desc,`month` asc;''')
    data = cursor.fetchall()
    #print('\n------------------------select_performance_manager____________________________')
    #print(data)
    cursor.close()
    connection.close()
    data = return_tuple_to_list(data)
    return data

def select_performance_admin_select_manager():
    connection = __init__()
    cursor = connection.cursor()
    cursor.execute('use `dajia`;')
    cursor.execute(f'''select user.`emp_id`,
                            user.`name`,
                            performance_per_month.`goal`,
                            performance_per_month.`account`,
                            performance_per_month.`year`,
                            performance_per_month.`month`,
                            performance_per_month.`attitude`,
                            performance_per_month.`efficiency`,
                            performance_per_month.`professional`,
                            performance_per_month.`directions`,
                            ifnull(performance_per_month.`be_late`,0),
                            ifnull(performance_per_month.`day_off_not_on_rule`,0),
                            performance_per_month.`banch`
                                from `performance_per_month` 
                                    inner join  `user` on
                                        user.`account`=performance_per_month.`account`
                                        and user.`work_state`='on'
                                        and user.`position`='主管'

                                        order by `year` desc,`month` asc;''')
    data = cursor.fetchall()
    #print('\n------------------------select_performance_manager____________________________')
    #print(data)
    cursor.close()
    connection.close()
    data = return_tuple_to_list(data)
    return data

def select_performance_admin_off_work(state):
    connection = __init__()
    cursor = connection.cursor()
    cursor.execute('use `dajia`;')
    cursor.execute(f'''select user.`emp_id`,
                            user.`name`,
                            performance_per_month.`goal`,
                            performance_per_month.`account`,
                            performance_per_month.`year`,
                            performance_per_month.`month`,
                            performance_per_month.`attitude`,
                            performance_per_month.`efficiency`,
                            performance_per_month.`professional`,
                            performance_per_month.`directions`,
                            ifnull(performance_per_month.`be_late`,0),
                            ifnull(performance_per_month.`day_off_not_on_rule`,0),
                            performance_per_month.`banch`
                                from `performance_per_month` 
                                    inner join  `user` on
                                        user.`account`=performance_per_month.`account`
                                        and user.`work_state`='{state}'

                                        order by `year` desc,`month` asc;''')
    data = cursor.fetchall()
    #print('\n------------------------select_performance_manager____________________________')
    #print(data)
    cursor.close()
    connection.close()
    data = return_tuple_to_list(data)
    return data

def select_performance_year_month(year,month):
    connection = __init__()
    cursor = connection.cursor()
    cursor.execute('use `dajia`;')
    cursor.execute(f'''select 
                            `year`,
                            `month`,
                            user.`name`,
                            `goal`,
                            `professional`,
                            `efficiency`,
                            `attitude`,
                            `be_late`,
                            `day_off_not_on_rule`,
                            `directions`
                        from `performance_per_month`
                        inner join  `user` on
                                        user.`account`=performance_per_month.`account`
                                        and user.`work_state`='on'
                    where `year`={year}
                        and   `month`={month};''')
    data=cursor.fetchall()
    data=return_tuple_to_list(data)
    cursor.close()
    connection.close()
    return data

def select_performance_year_month_account(data):
    #data=[帳號,年,月,要換的組別]
    connection = __init__()
    cursor = connection.cursor()
    cursor.execute('use `dajia`;')

    cursor.execute(f'''select * from `performance_per_month` 
                        where `month`={data[2]}
                        and   `year`={data[1]}
                        and    `account`='{data[0]}'
                        and    `banch`='{data[3]}';''')
    data=cursor.fetchall()
    cursor.close()
    connection.close()
    return data
    

def verify_user(account, password):
    if select_user_account(account):
        if select_user_password(account, password):
            if select_user_work_state(account):
                return select_user_name(account)
            return False
        return False
    return False


def insert_to_table_performance_per_month(goal,year, month, account, banch, attitude, efficiency, professional, directions,be_late,day_off_not_on_rule):
    connection = __init__()
    cursor = connection.cursor()
    cursor.execute('use `dajia`;')
    cursor.execute(f'''insert into `performance_per_month`value(
                            '{goal}',
                            {year},
                            {month},
                            '{account}',
                            '{banch}',
                            {attitude},
                            {efficiency},
                            {professional},
                            '{directions}',
                            {be_late},
                            {day_off_not_on_rule}

                            );''')
    connection.commit()
    cursor.close()
    connection.close()

def insert_to_table_banch(banch):
    connection = __init__()
    cursor = connection.cursor()
    cursor.execute('use `dajia`;')
    
    cursor.execute(f'''insert into `banch`value(
                                    '{banch}'
                                            );''')
    connection.commit()
    cursor.close()
    connection.close()




def insert_to_table_user(data):
    #data=[帳號,密碼,名字,組別,編號,開始日期,職位權限,工作狀態]
    connection = __init__()
    cursor = connection.cursor()
    cursor.execute('use `dajia`;')
    
    cursor.execute(f'''insert into `user`value(
                            '{data[0]}',
                            '{data[1]}',
                            '{data[2]}',
                            '{data[3]}',
                            '{data[4]}',
                            '{data[5]}',
                            '{data[6]}',
                            '{data[7]}'
                            );''')
    connection.commit()
    cursor.close()
    connection.close()



def update_to_table_user(target_account,data):
    #data=[帳號,密碼,名字,組別,編號,開始日期,職位權限,工作狀態]
    connection = __init__()
    cursor = connection.cursor()
    cursor.execute('use `dajia`;')

    cursor.execute(f'''update `user` set
                            `account`='{data[0]}',
                            `password`='{data[1]}',
                            `name`='{data[2]}',
                            `banch`='{data[3]}',
                            `emp_id`='{data[4]}',
                            `on_work_day`='{data[5]}',
                            `position`='{data[6]}',
                            `work_state`='{data[7]}'
                        where `account`='{target_account}';
                                        ''')
    connection.commit()    
    cursor.close()
    connection.close()

def updata_to_table_user_group(data):
    #data=[帳號,組別]
    connection = __init__()
    cursor = connection.cursor()
    cursor.execute('use `dajia`;')

    cursor.execute(f'''update `user` set
                            `banch`='{data[1]}'
                        where `account`='{data[0]}'
                                        ''')
    connection.commit()
    cursor.close()
    connection.close()
    a=select_banch_all()
    
    temp=[]
    for i in a:
        temp.append(i[0])
    if data[1] not in temp:
        insert_to_table_banch(data[1])
        print('新增部門')
    else:
        print('未新增部門')

def update_or_insert_to_change_banch_name(data):
    #data=[[更改前的組別名稱,更改後的組別名稱],[更改前的組別名稱,更改後的組別名稱]....]
    print(data,'\n')
    connection = __init__()
    cursor = connection.cursor()
    cursor.execute('use `dajia`;')
    for i in data:
        if i[0]!='新增':
            if i[0]!=i[1]:
                
                print(i)
                cursor.execute(f'''
                        update `performance_per_month` set
                            `banch`='{i[1]}'
                        where `banch`='{i[0]}';
                        ''')
                connection.commit()
                cursor.execute(f'''
                        update `user` set
                            `banch`='{i[1]}'
                        where `banch`='{i[0]}';
                        ''')
                connection.commit()
                cursor.execute(f'''
                        update `banch` set
                            `banch`='{i[1]}'
                        where `banch`='{i[0]}';
                        ''')
                connection.commit()
        else:
            insert_to_table_banch(i[1])
    cursor.close()
    connection.close()
    return '新增成功'



def update_to_table_performance_per_month(data):
    #data=[編號,名字,目標,帳號,年度,月份,態度,效率,專業,績效獎金,績效描述,遲到,未依規定請假]
    connection = __init__()
    cursor = connection.cursor()
    cursor.execute('use `dajia`;')
    

    cursor.execute(f'''update `performance_per_month` set
                            `goal`='{data[2]}',
                            `attitude`={data[6]},
                            `efficiency`={data[7]},
                            `professional`={data[8]},
                            `directions`='{data[10]}',
                            `be_late`={data[11]},
                            `day_off_not_on_rule`={data[12]}
                        where `year`={data[4]}
                        and   `month`={data[5]}
                        and   `account`='{data[3]}';''')
    connection.commit()
    cursor.close()
    connection.close()

def update_performance_who_change_banch(data):
    #data=[帳號,年,月,要換的組別]
    print(data)
    connection = __init__()
    cursor = connection.cursor()
    cursor.execute('use `dajia`;')
    
    for month in range(data[2],13):
        cursor.execute(f'''update `performance_per_month` set
                            `banch`='{data[3]}'
                            where `year`={data[1]}
                            and   `month`={month}
                            and   `account`='{data[0]}';''')
        connection.commit()
    cursor.close()
    connection.close()

def choose_insert_or_update_to_user(data):
    #data=[帳號,密碼,名字,組別,編號,開始日期,職位權限,工作狀態]
    
    banch=data[3]
    account=data[0]

    result=select_user_account(account)
    if result:
        result='update'
        update_to_table_user(account,data)
    else:
        insert_to_table_user(data)
        result='insert'

    return result


def for_loop_new_emp_insert_performance(data):
    #新員工新增資料到performance_per_month
    account=data[0]
    year=data[1]
    start_month=data[2]
    banch=select_user_banch(account)
    for month in range(start_month,13):
        insert_to_table_performance_per_month(
        '',year,month,account,banch,0,0,0,'',0,0
        )
    return '新增成功'

def for_loop_insert_performance(arr):
    #arr =>[[account1,year,('yes' or 'no')],[account2,year,('yes' or 'no')].....]
    #yesr is the admin want to create whole a new year.
    
    for personData in arr:
        account = personData[0]
        year = personData[1]
        state = personData[2]

        if state=='yes':
            #如果狀態為yes就要去尋找這帳號目前的部門
            banch=select_user_banch(account)
            for month in range(1,13):
                try:
                    insert_to_table_performance_per_month(
                        '',year, month, account, banch, 0, 0, 0, '', 0, 0
                    )
                except:
                    pass
    return '新增成功'

'''
def office_preview_handle(search_data):
    #search_data=[人,年,月]
    data=select_performance_year_month(101,5)
    for i in data:
        goal_list=i[3].splitlines()
        performance_list=[i[4],i[5],i[6],i[7],i[8],i[9]]
        write_in(f'{i[0]}-{i[1]}',i[2],goal_list,performance_list)

'''


if __name__ == "__main__":

    print('------------------__name__ == "__main__"----------------------------------------------------')

    data=[
        'change',
        'it is password',
        'here is a name',
        '保育組',
        '9527',
        '102',
        '一般職員',
        'off'
    ]
    #updata_to_table_user_group(['a','保育組'])
    #a=use_name_select_user_account('楊佳慧')
    #print(a)
    #select_performance_admin_select_manager()
    data=select_performance_admin('社工組','on')
    for i in sort(data):
        
        print(i)

