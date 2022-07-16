import { Fragment } from "react"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, select_route, backend, banch_index, year_performance, select_all_banch } from './api'
import { fade_in } from "./fade_in";
import { Loading } from "./backend_component/loading";
import { Login_loading } from "./backend_component/login_loadind";
const Login = ({ set_permession_state }) => {
    const [load_in, set_load_in] = useState(false)
    const [text, set_text] = useState('登入中')
    const [login_data, set_login_data] = useState({
        account: '',
        password: ''
    })
    const [style0, set_style0] = useState(
        { opacity: 0, transition: '' }
    )
    const [style1, set_style1] = useState(
        { opacity: 0, transition: '' }
    )
    const [style2, set_style2] = useState(
        { opacity: 0, transition: '' }
    )
    const [style3, set_style3] = useState(
        { opacity: 0, transition: '', marginTop: '3vh' }
    )

    const navigate = useNavigate()

    useEffect(() => {
        var token = window.sessionStorage.getItem('token')
        if (token) { select_route(navigate) }
        else { set_permession_state(false) }
        fade_in(style0, set_style0, 0, '1s')
        fade_in(style1, set_style1, 300, '0.3s')
        fade_in(style2, set_style2, 700, '0.7s')
        fade_in(style3, set_style3, 1100, '1.1s')
    }, [])


    const key_press_enter = (event) => {
        if (event.key === "Enter" || event.key === "enter") {
            a()
        }
    }
    async function a() {
        set_load_in(true)
        set_text('正在驗證登入資訊')
        var states = await login(login_data)//return true or false
        if (states) {
            setTimeout(() => {
                set_text('正在收集資料')
            }, 500)

            set_permession_state(true)

            var token = window.sessionStorage.getItem('token')
            var result3 = await year_performance(token)
            var result1 = await banch_index(token)
            var result2 = await backend(token)
            var result4 = await select_all_banch(token)
            console.log('here')
            var timer = setInterval(() => {
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
                <div style={{ ...style0, display: load_in === false ? "block" : 'none' }} onKeyDown={(event) => key_press_enter(event)} className="login">
                    <p style={{ marginBottom: '8vh' }}>登入</p>
                    <input style={style1} value={login_data.account} onChange={(e) => set_login_data({ ...login_data, account: e.target.value })} type="text" placeholder="請輸入帳號" /><br />

                    <input style={style2} value={login_data.password} onChange={(e) => set_login_data({ ...login_data, password: e.target.value })} type="password" placeholder="請輸入密碼" /><br />
                    <button style={style3} onClick={a}
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