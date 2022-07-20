
import { socketUrl } from './api';
import io from 'socket.io-client';

let socketBasic, socketMain;
export const connectSocket = (token) => {
    if (socketBasic?.connected) return;

    socketBasic = io.connect(socketUrl.url, {
        transports: ['websocket'],
        autoConnect: true,
        forceNew: true,
        query: `${token}siousiou`,
    });

    socketMain = io.connect(socketUrl.url + socketUrl.urlMain, {
        transports: ['websocket'],
        autoConnect: true,
        forceNew: true,
        query: `${token}siousiou`,
    });

    socketBasic.on('connect', (data) => {
        console.log('connect data => ',data)
    });


    socketMain.on('DataBaseChange', (data) => {
        console.log('hihi data => ', data)
    });
    socketMain.emit("DataBaseChange",{})
}