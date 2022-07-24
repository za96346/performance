export const ip = '127.0.0.1';
export const socketUrl = {
    url: `http://${ip}:5002`,
    urlMain: '/main',
}
export const socketNameSpace = {
    basic: '/',
    main:'/main'
}
export const socketEvent = {
    connect: 'connect',
    disconnect: 'disconnect',
    DataBaseChange: 'DataBaseChange',
}