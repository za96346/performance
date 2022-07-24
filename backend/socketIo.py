
import socketio
import uvicorn
from backend import token_decoding
#Sanic是Python 3.5及更新版本的一個非常高效的異步web伺服器。
#sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins = '*', logger=False, engineio_logger=False)
#mgr = socketio.AsyncRedisManager('redis://127.0.0.1:5002', write_only = True)
#app = socketio.ASGIApp(sio, static_files={
 #   '/': 'app.html',
#})
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
        print("connected!", sid)
        data, status = praseToken(environ["QUERY_STRING"])
        user = data['account']

        print("使用者連線 => ", user)
        print("token解碼狀態 => ", status)
        await self.save_session(sid, {'user': user}, namespace = self.namespace)
        
        self.enter_room(sid, 'lobby')
        #await self.emit('DataBaseChange', {'user': user}, room = "lobby", namespace = 'main')
        #print('transport', sio.transport(sid))
    async def on_disconnect(self, sid): 
        print("使用者離線 => ", sid)
        self.leave_room(sid, 'lobby')
        print(await self.get_session(sid))
        #await self.close_room('lobby')
        #raise ConnectionRefusedError('authentication failed')
        
    def on_connect_error(self, sid): 
        print("connection Error! => ", sid)

class MainNamespace(socketio.AsyncNamespace):
    def __init__(self, namespace):
        super().__init__(namespace)
        self.namespace = namespace
    async def on_DataBaseChange(self, sid, data):
        print('connect DataBaseChange', data)
        #user = await self.get_session(sid,namespace='/')
        print('user',sid)
        #print(f"{user['user']}進入了房間",user)
        self.enter_room(sid, 'lobby')
        print('rooms member', self.rooms(sid))

class SocketIo (socketio.AsyncServer):
    def __init__(self, client_manager=None, logger=False, json=None, async_handlers=True, namespaces=None, **kwargs):
        super().__init__(client_manager, logger, json, async_handlers, namespaces, **kwargs)
        self.register_namespace(MainNamespace('/main'))
        self.register_namespace(BasicNamespace('/'))

        


if __name__ == '__main__': 
    #result = praseToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50IjoiYWRtaW4xIn0.mftiskKX-PAEhDVtKXI7irw9az5PG8CXvR0C7I7AWj4siousiou&EIO=4&transport=websocket")
    #print("tokenPrase result => ", result)
    SocketIoInstance = SocketIo(async_mode='asgi', client_manager= RedisManager(), cors_allowed_origins = '*', logger=False, engineio_logger=False)
    uvicorn.run(App(SocketIoInstance,static_files='*/html'), host='127.0.0.1', port=5002)

    


