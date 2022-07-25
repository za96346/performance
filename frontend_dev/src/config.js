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
    change_banch_name: 'change_banch_name',
    performance_banch_change: 'performance_banch_change',
    group_change: 'group_change',
    updata_performance_table: 'updata_performance_table',
    new_emp_insert_performance_table: 'new_emp_insert_performance_table',
    insert_performance_table: 'insert_performance_table'
}