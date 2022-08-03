from cgi import print_arguments
import socketio
import uvicorn
import os
from package.dotenv import load_dotenv
from backend import token_decoding
from database import select_banch_all, select_user_banch,select_banch
from redisdb import redisdb
import time
from loger import log

#Sanic是Python 3.5及更新版本的一個非常高效的異步web伺服器。
#sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins = '*', logger=False, engineio_logger=False)
#mgr = socketio.AsyncRedisManager('redis://127.0.0.1:5002', write_only = True)
#app = socketio.ASGIApp(sio, static_files={
 #   '/': 'app.html',
#})

socketEvent = {
    'connect': 'connect',
    'disconnect': 'disconnect',
    'DataBaseChange': 'DataBaseChange',
    'change_banch_name': 'change_banch_name',
    'performance_banch_change': 'performance_banch_change',
    'group_change': 'group_change',
    'updata_performance_table': 'updata_performance_table',
    'new_emp_insert_performance_table': 'new_emp_insert_performance_table',
    'insert_performance_table': 'insert_performance_table'
}



def praseToken(token):
    #因為"QUERY_STRING" 自帶尾巴 所以要把尾巴處理掉
    letter = "siou"
    amount = 0
    for strStep in range(len(token)-1, 0, -1):
        if token[strStep-4:strStep] == letter:
            amount += 1
        if amount == 2:
            return token_decoding(token[0: strStep-4])

class App (socketio.ASGIApp):
    def __init__(self, socketio_server, other_asgi_app=None, static_files=None, socketio_path='socket.io', on_startup=None, on_shutdown=None):
        super().__init__(socketio_server, other_asgi_app, static_files, socketio_path, on_startup, on_shutdown)
        
class RedisManager (socketio.AsyncRedisManager):
    def __init__(self, url='redis://127.0.0.1:6379', channel='socketio', write_only=False, logger=None, redis_options=None):
        super().__init__(url, channel, write_only, logger, redis_options)

class BasicNamespace(socketio.AsyncNamespace):
    def __init__(self, namespace):
        super().__init__(namespace)
        self.namespace = namespace
    async def on_connect(self, sid, environ):
        pass

        #await self.emit('DataBaseChange', {'user': user}, room = "lobby", namespace = 'main')
        #print('transport', sio.transport(sid))
    async def on_disconnect(self, sid): 
        #print("使用者離線 => ", sid)
        self.leave_room(sid, 'lobby')
        #await self.close_room('lobby')
        #raise ConnectionRefusedError('authentication failed')
        
    def on_connect_error(self, sid): 
        print("connection Error! => ", sid)

class MainNamespace(socketio.AsyncNamespace):
    def __init__(self, namespace):
        super().__init__(namespace)
        load_dotenv()
        host = os.getenv('REDIS_DB_HOST')
        port = int(os.getenv('REDIS_DB_PORT'))
        self.namespace = namespace
        self.redisDB = redisdb(host, port, db = 0)
    
    async def on_connect(self, sid, environ):
        data, status = praseToken(environ["QUERY_STRING"])
        user = data['account']
        userBanch = select_user_banch(user);
        userPermession = select_banch(user);
        logInTime = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())
        print("token解碼狀態 => ", status)
        print("connected!", sid)
        print("使用者連線 => ", user)
        print('部門 => ', userBanch)


        self.redisDB.saveUser({
            'user': user,
            'banch': userBanch, 
            'permession': userPermession,
            'sid': sid,
            'connectDate': logInTime
        })

        log.writeLog(f'使用者{user}  登入時間{logInTime}')
        
        self.enter_room(sid, userBanch)
        self.enter_room(sid, userPermession)
        self.enter_room(sid, user)
        for item in self.rooms(sid):
            print('進入房間 => ', item)

    async def on_disconnect(self, sid):
        print("使用者離線 => ", sid)
        for item in self.rooms(sid):
            if item != sid:
                self.leave_room(sid, item)
                self.redisDB.leaveRoom(sid)
                print('離開房間 => ', item)

    async def on_change_banch_name(self, sid, data):
        #data => {"data": [ ["fvwef", "fvwef"], ["保育組", "保育組"], ["公關組", "公關組f"], ["社工組", "社工組"]]}
        print('connect change_banch_name', data)
        data = self.redisDB.jde(data)['data']
        for item in data:
            if item[0] != item[1]:
                label = {'user': '', 'banch': [item[0]], 'permession': 'changeBanchName', 'event': 'change_banch_name'}
                await self.broadCast(label, sid)
        
    async def on_insert_banch_table(self, sid, data):
        #data => {"data": ["sockio", "200", "hiyou", "公關組", "w", "91", "一般職員", "on"]}
        print('connect insert_banch_table', data)
        data = self.redisDB.jde(data)['data']
        label = {
            'user': data[0], 
            'banch': [data[3]], 
            'permession': select_banch(data[0]),
            'event': 'insert_banch_table'
            }
        await self.broadCast(label, sid)

    async def on_performance_banch_change(self, sid, data):
        #data => { "data": ["managerPublicRelations", 154, 4, "社工組", "公關組"] }
        print('connect performance_banch_change', data)
        data = self.redisDB.jde(data)['data']
        label = {
            'user': data[0], 
            'banch': [data[3]] if data[3] == data[4] else [data[3], data[4]], 
            'permession': select_banch(data[0]),
            'event': 'performance_banch_change'
        }
        await self.broadCast(label, sid)

    async def on_group_change(self, sid, data):
        #暫不作用
        print('connect group_change', data)
        print('user',sid)

    async def on_updata_performance_table(self, sid, data):
        #data => 
        # {"data":
        #   ["3",
        #   "personalPublicRelations1",
        #   "1、食物存frwef放區，保持清潔。並分類管理\n2、廚房自主管理ewf\n3、活動餐點主導。",
        #   "personalPublicRelations1",
        #   119,
        #   5,
        #   8,
        #   10,
        #   7,
        #   2500,
        #   "1.方案執行確實。2.季核銷效率待加強。",
        #   1,
        #   2,
        #   "公關組"]
        # }
        print('connect updata_performance_table', data)
        data = self.redisDB.jde(data)['data']
            
        label = {'user': data[3], 'banch': [data[-1]], 'permession': select_banch(data[3]), 'event': 'updata_performance_table'}
        await self.broadCast(label, sid)

    async def on_new_emp_insert_performance_table(self, sid, data):
        #暫不作用
        print('connect new_emp_insert_performance_table', data)
        print('user',sid)

    async def on_insert_performance_table(self, sid, data):
        #暫不作用
        print('connect insert_performance_table', data)
        print('user',sid)

    async def broadCast(self, label, sid):
        #current data label => {'user': data[3], 'banch': data[13], 'permession': select_banch(data[3])}
        print('廣播的房間', label)
        if label['permession'] == 'manager':
            await self.emit(label['event'], 'update', room = 'admin', skip_sid = sid, namespace = self.namespace)
            await self.emit(label['event'], 'update', room = label['user'], skip_sid = sid, namespace = self.namespace)
        elif label['permession'] == 'personal':
            print('==>==>', self.redisDB.selectManager(label['banch']))
            await self.emit(label['event'],  'update', room = 'admin', skip_sid = sid, namespace = self.namespace)

            await self.emit(label['event'] , 'update', room = label['user'], skip_sid = sid, namespace = self.namespace)
            for banch in label['banch']:
                await self.emit(
                                    label['event'], 
                                    'update', 
                                    to = self.redisDB.selectManager(label[banch])['sid'],
                                    skip_sid = sid, 
                                    namespace = self.namespace
                )
        elif label['permession'] == 'changeBanchName':
            allUser = self.redisDB.selectUserAll()
            for user in allUser:
                if user['banch'] == label['banch'][0]:
                    await self.emit(
                        label['event'],
                        'update', 
                        to = user['sid'],
                        skip_sid = sid, 
                        namespace = self.namespace
                    )

class SocketIo (socketio.AsyncServer):
    def __init__(self, client_manager=None, logger=False, json=None, async_handlers=True, namespaces=None, **kwargs):
        super().__init__(client_manager, logger, json, async_handlers, namespaces, **kwargs)
        self.register_namespace(MainNamespace('/main'))
        self.register_namespace(BasicNamespace('/'))

        


if __name__ == '__main__': 
    load_dotenv()
    host = os.getenv('SOCKET_IO_HOST')
    port = int(os.getenv('SOCKET_IO_PORT'))
    SocketIoInstance = SocketIo(async_mode='asgi', cors_allowed_origins = '*', logger=False, engineio_logger=False)
    uvicorn.run(App(SocketIoInstance,static_files='*/html'), host = host, port = port)