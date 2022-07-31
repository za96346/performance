
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
            if item != sid:
                self.leave_room(sid, item)
                self.redisDB.leaveRoom(sid)
                print('進入房間 => ', item)

    async def on_disconnect(self, sid):
        print("使用者離線 => ", sid)
        for item in self.rooms(sid):
            if item != sid:
                self.leave_room(sid, item)
                self.redisDB.leaveRoom(sid)
                print('離開房間 => ', item)

    async def on_change_banch_name(self, sid, data):
        print('connect change_banch_name', data)
        print('user',sid)

    async def on_performance_banch_change(self, sid, data):
        print('connect performance_banch_change', data)
        print('user',sid)

    async def on_group_change(self, sid, data):
        print('connect group_change', data)
        print('user',sid)

    async def on_updata_performance_table(self, sid, data):
        #user = data[3]
        #banch = data[12]
        room = [data[3], data[12]]
        for item in room:
            await self.emit('updata_performance_table', 'update', room = item, skip_sid = sid, namespace = self.namespace)

    async def on_new_emp_insert_performance_table(self, sid, data):
        print('connect new_emp_insert_performance_table', data)
        print('user',sid)

    async def on_insert_performance_table(self, sid, data):
        print('connect insert_performance_table', data)
        print('user',sid)

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

    


