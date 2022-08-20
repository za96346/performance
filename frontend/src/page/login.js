import { Fragment } from "react"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, select_route, backend, banch_index, year_performance, select_all_banch } from './api'
import { Loading } from "./backend_component/loading";
import { Login_loading } from "./backend_component/login_loadind";
import session from "./method/storage";


const Login = ({ set_permession_state }) => {
    const [load_in, set_load_in] = useState(false)
    const [text, set_text] = useState('登入中')
    const [login_data, set_login_data] = useState({
        account: '',
        password: ''
    })

    const navigate = useNavigate()

    useEffect(() => {
        const token = session.getItem('token')
        if (token) { select_route(navigate) }
        else { set_permession_state(false) }
    }, [])


    const key_press_enter = (event) => {
        if (event.key === "Enter" || event.key === "enter") {
            a()
        }
    }
    async function a() {
        set_load_in(true)
        set_text('正在驗證登入資訊')
        const states = await login(login_data)//return true or false
        if (states) {
            setTimeout(() => {
                set_text('正在收集資料')
            }, 500)

            set_permession_state(true)

            const token = session.getItem('token')
            const result3 = await year_performance(token)
            const result1 = await banch_index(token)
            const result2 = await backend(token)
            const result4 = await select_all_banch(token)
            console.log('here')
            const timer = setInterval(() => {
                if (result1 && result2 && result3 && result4) {

                    set_load_in(false)
                    //代表資料已經更新
                    clearInterval(timer)
                    select_route(navigate)
                }

            }, 10);
        }
        else {
            set_load_in(false)
        }
    }



    return (
        <Fragment>
            <div className="loginbox">
                <div style={{ display: load_in === false ? "flex" : 'none' }} onKeyDown={(event) => key_press_enter(event)} className="login">
                    <p style={{ marginBottom: '8vh' }}>登入</p>
                    <input value={login_data.account} onChange={(e) => set_login_data({ ...login_data, account: e.target.value })} type="text" placeholder="請輸入帳號" />

                    <input value={login_data.password} onChange={(e) => set_login_data({ ...login_data, password: e.target.value })} type="password" placeholder="請輸入密碼" />
                    <button onClick={a}
                    >登入</button>
                </div>
                <div style={{ display: load_in === false ? 'none' : 'flex', alignItems: 'center' }} className='login'>
                    <Login_loading text={text} />
                </div>
            </div>


        </Fragment>
    )
}
export default Login;