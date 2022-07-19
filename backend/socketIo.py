
from asyncore import write
from os import stat
from unicodedata import name
from unittest import skip
from flask import jsonify
import socketio
import uvicorn
from backend import token_decoding
#Sanic是Python 3.5及更新版本的一個非常高效的異步web伺服器。
sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins = '*', logger=False, engineio_logger=False)
mgr = socketio.AsyncRedisManager('redis://127.0.0.1:5002', write_only = True)
app = socketio.ASGIApp(sio, static_files={
    '/': 'app.html',
})

def praseToken(token):
    #因為"QUERY_STRING" 自帶尾巴 所以要把尾巴處理掉
    letter = "siou"
    amount = 0
    for strStep in range(len(token)-1, 0, -1):
        if token[strStep-4:strStep] == letter:
            amount += 1
        if amount == 2:
            return token_decoding(token[0: strStep-4])

@sio.on('DataBaseChange')
async def DataBaseChange(sid, data):
    print('connect DataBaseChange', data)
    user = await sio.get_session(sid)
    print(f"{user['user']}進入了房間",user)
    sio.enter_room(sid, 'lobby')


@sio.event
async def connect(sid,b,c):
    print("connected!", sid)
    data, status = praseToken(b["QUERY_STRING"])
    user = data['account']

    print("使用者 => ", user)
    print("token解碼狀態 => ", status)
    await sio.save_session(sid, {'user': user})
    await sio.emit('DataBaseChange', {'user': user}, room = "lobby", skip_sid = sid)

@sio.event 
def connect_error(sid): 
    print("connection failed! => ", sid)

@sio.event 
def disconnect(sid): 
    print("disconnected! => ", sid)
    sio.leave_room(sid, 'lobby')
    #raise ConnectionRefusedError('authentication failed')



if __name__ == '__main__': 
    #result = praseToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50IjoiYWRtaW4xIn0.mftiskKX-PAEhDVtKXI7irw9az5PG8CXvR0C7I7AWj4siousiou&EIO=4&transport=websocket")
    #print("tokenPrase result => ", result)
    uvicorn.run(app, host='127.0.0.1', port=5002)

    


