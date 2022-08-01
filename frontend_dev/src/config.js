export const ip = '127.0.0.1';
// export const ip = '172.21.1.51';
export const config = {
    url: `http://${ip}:5001/`,
    urlYearPerformance: 'backend/year_performance',
    urlBanchIndex: 'backend/banch_index',
    urlBackEnd: 'backend',
    urlInsertBanchTable: 'backend/InsertBanchTable',
    urlInsertPerformanceTable: 'backend/InsertPerformanceTable',
    urlUpdatePerformance: 'backend/UpdatePerformanceTable',
    urlGroupChange: 'backend/GroupChange',
    urlSelectAllBanch: 'backend/SelectAllBanch',
    urlPerformanceBanchChange: 'backend/PerformanceBanchChange',
    urlNewEmpInsertPerformanceTable: 'backend/NewEmpInsertPerformanceTable',
    urlChangeBanchName: 'backend/ChangeBanchName',
    urlGetUserData: 'getUserData'
};
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
    change_banch_name: 'change_banch_name',
    performance_banch_change: 'performance_banch_change',
    group_change: 'group_change',
    updata_performance_table: 'updata_performance_table',
    new_emp_insert_performance_table: 'new_emp_insert_performance_table',
    insert_performance_table: 'insert_performance_table',
    logOut: 'logOut'
}