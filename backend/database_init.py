import sys,os
sys.path.append(os.path.dirname(os.path.abspath(__file__))+'/package')
sys.path.append(os.path.dirname(os.path.abspath(__file__))+'\package')

from mysql import connector

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
    return connection
def drop_all():
    connection=__init__()
    cursor=connection.cursor()
    cursor.execute('drop database `dajia`;')

def create_database():
    connection=__init__()
    cursor=connection.cursor()
    cursor.execute('create database `dajia`;')
    cursor.execute('set global max_connections=1000;')

def create_table():
    connection=__init__()
    cursor=connection.cursor()
    cursor.execute('use `dajia`')
    cursor.execute(
        #work_state have 'on' or 'off' argument
        # 'on' is onWork  'off' is offWork
        '''create table `user`(`account` varchar(50) primary key,
                                `password`varchar(50),
                                `name` varchar(50),
                                `banch` varchar(50),
                                `emp_id` varchar(50),
                                `on_work_day` varchar(50),
                                `position` varchar(5),
                                `work_state` varchar(3)
                                );''')

    cursor.execute(
        '''create table `banch`(
                                `banch` varchar(50) primary key
                                );''')

    cursor.execute(
        '''create table `performance_per_month`(
                                `goal` varchar(1000),
                                `year` int,
                                `month` int,
                                `account` varchar(50),
                                `banch` varchar(50),
                                `attitude` int,
                                `efficiency` int,
                                `professional` int,
                                `directions` varchar(1000),
                                `be_late` int,
                                `day_off_not_on_rule` int              
                                );''')



    cursor.execute("alter table `performance_per_month` add primary key (account,year,month);")

    #cursor.execute("alter table `banch` add foreign key(manager)references user(account) on update cascade;")
    #cursor.execute("alter table `performance_per_month` add foreign key(account)references user(account) on update cascade;")





def init():
    drop_all()
    create_database()
    create_table()
if __name__=="__main__":
    drop_all()
    create_database()
    create_table()

