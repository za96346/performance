import {Manager} from 'socket.io-client';
import {socketEvent} from '../config';
import session from './method/storage';
import { socketUrl, socketNameSpace } from '../config';

export default class SocketIO extends Manager{
    constructor() {
        super(socketUrl.url,{
            transports: ['websocket'],
            autoConnect: true,
            forceNew: true,
            query: `${session.getItem('token')}siousiou`,
        })
        this.socketID = null;
    }

    static async action(event = null, params = null, nameSpace = '/') {
        //action 1 => get only one instanse of this class => params is not must
        //action 2 => emit event => event is must
        if (!SocketIO.instance) {
            //only first instance to create listen on Channel
            SocketIO.instance = new SocketIO()
            //console.log(SocketIO.instance)
            this.#_basicOnListen(SocketIO.instance)
            this.#_mainOnListen(SocketIO.instance)
        }
        if (event) {
            if (nameSpace === socketNameSpace.basic) {
                this.#_emitBasicEvent(SocketIO.instance, event, params)
            }
            else if(nameSpace === socketNameSpace.main){
                this.#_emitMainEvent(SocketIO.instance, event, params)
            }
        }
        return await SocketIO.instance;
    }

    static #_basicOnListen(instance) {
        instance.socket(socketNameSpace.basic).on(socketEvent.connect, (data) => {
            console.log('socket io is connected', data)
        });
        instance.socket(socketNameSpace.basic).on(socketEvent.disconnect, () => {
            console.log('has already been disconnected')
        })
    }

    static #_mainOnListen(instance) {
        instance.socket(socketNameSpace.main).on(socketEvent.DataBaseChange, (data) => {
            console.log('DataBaseChange data =>', data)
        })
    }

    static #_emitBasicEvent(instance, event, params) {
        instance.socket(socketNameSpace.basic).emit(event, params);
    }
    
    static #_emitMainEvent(instance, event, params) {
        instance.socket(socketNameSpace.main).emit(event, params);
    }

}
