from database_init import drop_all,create_database,create_table
from database import insert_to_table_performance_per_month,use_name_select_user_account
import package.xlrd as xlrd
from database import insert_to_table_user,insert_to_table_banch

def social(path,year,banch):
    data = xlrd.open_workbook(path)
    for month in range(1,13):
        
        file=data.sheet_by_index(month)
        #print(file.ncols,file.nrows)
        for j in range(2,file.nrows):
            #跑data
            
            emp_data=file.row_values(j)
            print(year,month,emp_data[1])
            emp_account=use_name_select_user_account(emp_data[1])

            insert_to_table_performance_per_month(
                                emp_data[3],
                                year,
                                month,
                                emp_account[0],
                                banch,
                                int(emp_data[4]),
                                int(emp_data[5]),
                                int(emp_data[6]),
                                emp_data[9],
                                int(emp_data[11]) if emp_data[11] else 0,
                                int(emp_data[12]) if emp_data[12] else 0)

def babysitter(path,year):
    data = xlrd.open_workbook(path)
    for month in range(1,13):
        
        file=data.sheet_by_index(month)
        #print(file.ncols,file.nrows)
        for j in range(2,file.nrows):
            #跑data
            
            emp_data=file.row_values(j)
            print(year,month,emp_data[1])
            emp_account=use_name_select_user_account(emp_data[1])
            if emp_data[13]=='A':
                banch='保育A組'
            elif emp_data[13]=='B':
                banch='保育B組'
            elif emp_data[13]=='C':
                banch='保育C組'
            insert_to_table_performance_per_month(
                                emp_data[3],
                                year,
                                month,
                                emp_account[0],
                                banch,
                                int(emp_data[4]),
                                int(emp_data[5]),
                                int(emp_data[6]),
                                emp_data[9],
                                int(emp_data[11]) if emp_data[11] else 0,
                                int(emp_data[12]) if emp_data[12] else 0)

def babysitter_half(path,year,start,end):
    data = xlrd.open_workbook(path)
    for month in range(1,end-start+2):
        
        file=data.sheet_by_index(month)
        #print(file.ncols,file.nrows)
        for j in range(2,file.nrows):
            #跑data
            
            emp_data=file.row_values(j)
            print(year,month+start-1,emp_data[1])
            emp_account=use_name_select_user_account(emp_data[1])
            if emp_data[13]=='A':
                banch='保育A組'
            elif emp_data[13]=='B':
                banch='保育B組'
            elif emp_data[13]=='C':
                banch='保育C組'
            insert_to_table_performance_per_month(
                                emp_data[3],
                                year,
                                month+start-1,
                                emp_account[0],
                                banch,
                                int(emp_data[4]),
                                int(emp_data[5]),
                                int(emp_data[6]),
                                emp_data[9],
                                int(emp_data[11]) if emp_data[11] else 0,
                                int(emp_data[12]) if emp_data[12] else 0)



def emp_create():
    data = xlrd.open_workbook('./Gmail/員工資料.xls')
    file=data.sheet_by_index(0)

    print(file.ncols,file.nrows)


    for i in range(0,file.nrows):
        #新增所有的員工 =>在職
        if i>4:
            emp_data=file.row_values(i)
            #print(emp_data)
            temp=[emp_data[2],emp_data[6],emp_data[3],emp_data[1],emp_data[2],int(emp_data[5]),emp_data[7],'on']
            #insert=[帳號,密碼,名字,組別,編號,開始日期,職位權限,工作狀態]
            insert_to_table_user(temp)

    file=data.sheet_by_index(2)
    for i in range(2,file.nrows):
        #新增所有的員工 =>離職
        emp_data=file.row_values(i)
        temp=[emp_data[5],emp_data[5],emp_data[2],'保育A組',emp_data[0],int(emp_data[3]),'一般職員','off']
        insert_to_table_user(temp)
        



if __name__=='__main__':
    drop_all()
    create_database()
    create_table()
    emp_create()
    social('./Gmail/109績效月表(嬰幼兒組).xls',109,'保育A組')
    social('./Gmail/108績效月表(嬰幼組).xls',108,'保育A組')
    social('./Gmail/110績效月表(嬰幼兒組).xls',110,'保育A組')
###############
    social('./Gmail/108績效月表(行政組).xls',108,'行政組')
    social('./Gmail/109績效月表行政組.xls',109,'行政組')
    social('./Gmail/110績效月表(行政組) .xls',110,'行政組')
###############
    social('./Gmail/109績效月表社工組.xls',109,'社工組')
    social('./Gmail/108績效月表社工組.xls',108,'社工組')
    social('./Gmail/110績效月表社工組.xls',110,'社工組')
###############
    babysitter('./Gmail/108績效月表(兒童組).xls',108)
    babysitter('./Gmail/109績效月表新制.xls',109)
    babysitter('./Gmail/110年績效(佳宜).xls',110)
    babysitter('./Gmail/110績效月表(采筑新).xls',110)
###############
    babysitter_half('./Gmail/108績效月表(青少組).xls',108,1,7)
    babysitter_half('./Gmail/109績效月表(舊制).xls',109,8,12)



    for i in ['保育A組','保育B組','保育C組','行政組','公關組','社工組','基金會']:
        insert_to_table_banch(i)