
import { socketUrl } from './api';
import io from 'socket.io-client';

let socket;
export const connectSocket = (token) => {
    if (socket?.connected) return;

    socket = io.connect(socketUrl.url, {
        transports: ['websocket'],
        autoConnect: true,
        forceNew: true,
        query: `${token}siousiou`,
    });
    

    socket.on('connect', (data) => {
        console.log('connect data => ',data)
    });

    socket.on('DataBaseChange', (data) => {
        console.log('hihi data => ', data)
    });
    socket.emit("DataBaseChange",{})
}