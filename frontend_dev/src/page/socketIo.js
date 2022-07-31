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
                const data = JSON.stringify({
                    'data': params
                })
                this.#_emitMainEvent(SocketIO.instance, event, data)
            }
        }
        return await SocketIO.instance;
    }

    static #_basicOnListen(instance) {
        instance.socket(socketNameSpace.basic).on(socketEvent.connect, () => {
            console.log('socket io is connected')
        });
        instance.socket(socketNameSpace.basic).on(socketEvent.disconnect, () => {
            console.log('has already been disconnected')
        })
    }

    static #_mainOnListen(instance) {
        instance.socket(socketNameSpace.main).on(socketEvent.change_banch_name, (data) => {
            console.log('change_banch_name data =>', data)
        })
        instance.socket(socketNameSpace.main).on(socketEvent.performance_banch_change, (data) => {
            console.log('performance_banch_change data =>', data)
        })
        instance.socket(socketNameSpace.main).on(socketEvent.group_change, (data) => {
            console.log('group_change data =>', data)
        })
        instance.socket(socketNameSpace.main).on(socketEvent.updata_performance_table, (data) => {
            console.log('updata_performance_table data =>', data)
            alert('data')
        })
        instance.socket(socketNameSpace.main).on(socketEvent.new_emp_insert_performance_table, (data) => {
            console.log('new_emp_insert_performance_table data =>', data)
        })
        instance.socket(socketNameSpace.main).on(socketEvent.insert_performance_table, (data) => {
            console.log('insert_performance_table data =>', data)
        })
    }

    static #_emitBasicEvent(instance, event, params) {
        instance.socket(socketNameSpace.basic).emit(event, params);
    }
    
    static #_emitMainEvent(instance, event, params) {
        instance.socket(socketNameSpace.main).emit(event, params);
    }

}
