import axios from "axios"
import { ip, socketEvent, socketNameSpace } from "../config";
import session from "./method/storage";
import SocketIO from "./socketIo";
export const config = {
    url: `http://${ip}:5000/`,
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
    urlChangeBanchName: 'backend/ChangeBanchName'
};
export const article_bar_arr = ['首頁', '年度考核分數', '每月考核績效']
export const log_out = ['登出']
export const personal_sidebar = ['每月考核績效', '年度考核分數'];

export function admin_sidebar() {
    const admin_sidebar_orignal = ['組別管理', '總覽', '幹部', '離職員工', '新增年度'];
    var banch = session.getItem('all_banch')
    //console.log(banch)
    if (banch === null || banch === undefined) {
        return admin_sidebar_orignal
    }
    for (let item = 0; item < banch.length; item++) {
        admin_sidebar_orignal.splice(item + 2, 0, banch[item])
    }
    //console.log(admin_sidebar_orignal)
    return admin_sidebar_orignal

}
export function manager_sidebar() {
    var banch = session.getItem('banch')
    const manager = [banch];
    return manager
}

export const position_arr = ['', '管理員', '主管', '一般職員']
export const fixed_title = ['id', '姓名', '年度目標', '年度', '月份', '態度', '效率', '專業', '績效獎金', '績效描述', '遲到', '不當請假', '分數']
export const fixed_title_emp = ['id', '姓名', '組別', '帳號', '密碼', '入職日', '職位權限', '狀態']


export function all_view(data) {
    var temp = []

    for (let key in data) {
        if (key !== '離職員工' && key !== '幹部') {
            data[key].map((item, index) => {
                temp.push(item)
                return item
            })
        }
    }
    return temp
}




export function select_emp_name_id(number) {

    const emp_arr = []
    if (number === 1) {
        for (let i = 0; i < 40; i++) {
            emp_arr.push([i, 'name: ' + i, 'goal' + i, 'attitude', 'efficiency', 'professional', 2000 + i, 'directions' + i, i, 0, 0])
        }
        return (emp_arr)
    }
    else if (number === 2) {
        for (let i = 0; i < 40; i++) {
            emp_arr.push([i, 'name: ' + i, 'goal' + i, 80 + i])
        }
        return (emp_arr)

    }
    else {
        for (let i = 0; i < 40; i++) {
            emp_arr.push([i, 'name: ' + i])
        }
        return (emp_arr)
    }



}

export function select_route(navigate) {

    var permession = session.getItem('permession')
    if (permession === "admin") {
        console.log('\nRoute==>', permession)
        navigate(`/backend/admin/${admin_sidebar()[0]}`)//跳過 組別管理
    }
    else if (permession === "manager") {
        console.log('\nRoute==>', permession)
        navigate(`/backend/manager/${manager_sidebar()[0]}`)
    }
    else if (permession === 'personal') {
        console.log('\nRoute==>', permession)
        navigate(`/backend/personal/${personal_sidebar[0]}`)
    }
    else { navigate('/') }
}


export async function change_banch_name(token, data) {
    return await axios({
        method: 'POST',
        url: config.url + config.urlChangeBanchName,
        data: JSON.stringify({
            'data': data
        }),
        headers: {
            'token': token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((response) => {
        console.log(response)
        //SocketIO.action(socketEvent.change_banch_name, data, socketNameSpace.main)
        return response.data
    }).catch((error) => {
        console.log(error)
        return false
    })
}

export async function performance_banch_change(token, data) {
    return await axios({
        method: 'POST',
        url: config.url + config.urlPerformanceBanchChange,
        data: JSON.stringify({
            'data': data
        }),
        headers: {
            'token': token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((response) => {
        //SocketIO.action(socketEvent.performance_banch_change, data, socketNameSpace.main)
        console.log(response)
        return response.data
    }).catch((error) => {
        console.log(error)
        return false
    })
}


export async function group_change(token, data) {
    return await axios({
        method: 'POST',
        url: config.url + config.urlGroupChange,
        data: JSON.stringify({
            'data': data
        }),
        headers: {
            'token': token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((response) => {
        //SocketIO.action(socketEvent.group_change, data, socketNameSpace.main)
        console.log(response)
        return true
    }).catch((error) => {
        console.log(error)
        return false
    })
}

export async function updata_performance_table(data, token) {
    return await axios({
        method: 'POST',
        url: config.url + config.urlUpdatePerformance,
        data: JSON.stringify({
            'data': data
        }),
        headers: {
            'token': token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((response) => {
        //SocketIO.action(socketEvent.updata_performance_table, data, socketNameSpace.main)
        console.log(response)
        return true
    }).catch((error) => {
        console.log(error)
        return false
    })
};

export async function new_emp_insert_performance_table(token, data) {
    return await axios({
        method: 'POST',
        url: config.url + config.urlNewEmpInsertPerformanceTable,
        data: JSON.stringify({
            'data': data
        }),
        headers: {
            'token': token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }

    }).then((response) => {
        //SocketIO.action(socketEvent.new_emp_insert_performance_table, data, socketNameSpace.main)
        console.log('NewEmpInsertPerformanceTable', response)
        return response.data
    }).catch((error) => {
        console.log(error)
        return error
    })
}

export async function insert_performance_table(token, data) {
    console.log("data of insert_performance_table", data)
    return await axios({
        method: 'POST',
        url: config.url + config.urlInsertPerformanceTable,
        data: JSON.stringify({
            'data': data
        }),
        headers: {
            'token': token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }

    }).then((response) => {
        //SocketIO.action(socketEvent.insert_performance_table, data, socketNameSpace.main)
        console.log('InsertPerformanceTable', response)
        return response.data
    }).catch((error) => {
        console.log(error)
        return error
    })
}

export async function insert_banch_table(token, data) {

    return await axios({
        method: 'POST',
        url: config.url + config.urlInsertBanchTable,
        data: JSON.stringify({
            'data': data,
        }),
        headers: {
            'token': token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((response) => {
        console.log('response data===>', response.data['data'])
        return response.data['data']//data=>insert or update
        //insert=>tell you that this people is a new create.
        //updata=>tell you that this people is exist.
    }).catch((error) => {
        console.log(error)

        return false
    })
}


export async function backend(token) {
    return await axios({
        method: 'POST',
        url: config.url + config.urlBackEnd,
        headers: {
            'token': token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((response) => {
        var data = response.data
        console.log('每月績效', data)
        var result = all_view(data)
        data['總覽'] = result
        session.setItem('data', data)
        return true

    }).catch((error) => {

        console.log(error)
        console.log('token error =>backend')
        return false

    })
}

export async function banch_index(token) {
    return await axios({
        method: 'POST',
        url: config.url + config.urlBanchIndex,
        headers: {
            'token': token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((response) => {
        var data = response.data
        console.log('組員資料', data)
        var result = all_view(data)

        data['總覽'] = result
        session.setItem('banch_index', data)
        return true
    }).catch((error) => {
        console.log(error)
        console.log('token error =>banch_index')
        return false
    })
}

export async function year_performance(token) {
    return await axios({
        method: 'POST',
        url: config.url + config.urlYearPerformance,
        headers: {
            'token': token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((response) => {
        var data = response.data
        var result = all_view(data)
        data['總覽'] = result
        console.log('年度績效', data)
        session.setItem('year_performance', data)

        return true
    }).catch((error) => {
        console.log(error)
        console.log('token error =>year_performance')
        return false
    })
}

export async function select_all_banch(token) {
    return await axios({
        method: 'POST',
        url: config.url + config.urlSelectAllBanch,
        headers: {
            'token': token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((response) => {
        var data = response.data
        console.log('所有組別', data)
        session.setItem('all_banch', data)
        return true
    }).catch((error) => {
        console.log(error)
        console.log('token error =>select_all_banch')
        return false
    })
}


export async function login(login_data) {
    return await axios({
        method: 'POST',
        url: config.url,
        data: JSON.stringify({
            'account': login_data.account,
            'password': login_data.password
        }),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }).then((response) => {
        var data = response.data

        session.setItem('token', data.token)
        session.setItem('user_name', data.user_name)
        session.setItem('banch', data.banch)
        session.setItem('permession', data.permession)
        //SocketIO.action()
        return true

    }).catch((error) => {
        console.log(error)
        alert('帳號或密碼輸入錯誤')
        return false

    })
}
