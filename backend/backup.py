from mysql import connector
from package.dotenv import load_dotenv

import os


class backupMysql():
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
