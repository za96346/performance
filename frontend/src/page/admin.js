import Article from "./backend_component/article";
import Sidebar from "./backend_component/sidebar";
import Title from "./backend_component/title";
import { admin_sidebar, log_out, personal_sidebar, article_bar_arr } from "./api";
import { useParams, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useRef } from "react";
import session from "./method/storage";
const Admin = () => {
    const [synchronize, synchronize_update] = useState(false)//設定同步頁面
    const { page } = useParams()
    const { article_page } = useParams()
    const navigate = useNavigate()
    const [combine, setCombine] = useState(admin_sidebar().concat(log_out))
    const [data, set_data] = useState([]);

    const identifyCallback = useCallback(() => {

        function identify() {
            let value = []
            let temp = []
            let state = false
            if (page !== '登出') {
                set_data([])
                if (article_page === article_bar_arr[1]) {
                    //年度
                    if(page === '總覽'){
                        const a = session.getItem('year_performance')[page] || []
                        for(let a_item of a){
                            state = false
                            for(let temp_item of temp){
                                if(temp_item[5] === a_item[5] && temp_item[3] === a_item[3]) {
                                    state = true
                                    temp_item[4] = Math.round((temp_item[4] + a_item[4]) * 10) / 10
                                    break
                                }
                            }
                            if(state === false){
                                temp.push(a_item)
                            }
                        }
                        value = temp || []
                        set_data(value?.length>0?value:[])
                    }
                    else{
                        value = session.getItem('year_performance')[page] || []
                        console.log('年度資料',value)    
                    }

                    set_data(value?.length > 0 ? value : [])
                }
                else if (article_page === article_bar_arr[2]) {
                    //每月
                    value = session.getItem('data')[page] || []
                    //console.log('每月資料',value)
                    set_data(value?.length > 0 ? value : [])
                }
                
                else if (page === '新增年度') {
                    //新增年度
                    value = []
                    const obj = session.getItem('banch_index') || []

                    for(let key in obj){
                        const items = obj[key]
                        if(key !== '離職員工' && key !== '幹部' && key !== '總覽') {
                            for(let i = 0; i < items?.length; i++) {
                                if(items[i][6] !== '管理員') {
                                    value.push(items[i])
                                }
                            }
                        }
                    }

                    console.log('新增年度',value?.length)
                    set_data(value?.length > 0 ? value : [])
                }
                else if(page==='組別管理'){
                    value = session.getItem('all_banch') || []
                    console.log('group_change',value)
                    set_data(value?.length > 0 ? value : [])
                }
                else {
                    //首頁 離職員工
                    
                    value = session.getItem('banch_index')[page] || []
                    console.log('首頁 離職員工資料', value, page)
                    set_data(value?.length > 0 ? value : [])
                }
            }

        }
        console.log('\n\n\n\n\n\nchange\n\n\n\n\n\n\n\n')
        identify()
    }, [synchronize, article_page, page])

    useEffect(() => {
        identifyCallback()
    }, [identifyCallback])

    useEffect(() => {
        if (!synchronize) {
            setCombine(admin_sidebar().concat(log_out))
        } else {
            setCombine(admin_sidebar().concat(log_out))
        }
    }, [synchronize])

    useEffect(() => {
        if (combine.indexOf(page) === -1) {
            navigate('/access====>error')
        }
        else if (article_page) {

            if (personal_sidebar.indexOf(article_page) === -1) {
                navigate('/access====>error')
            }
            else if (article_page === '個人年度目標') {
                navigate('/access====>error')
            }
            else if (page === '組別變動' && article_page !== undefined) {
                navigate('/access====>error')
            }

        }
    });

    return (
        <>
            <div className="head">
                <Title sidebar_arr={admin_sidebar()} synchronize_update={synchronize_update} />
                <Sidebar sidebar_arr={combine} style={"lesssmall"} synchronize_update={synchronize_update}/>
                <Sidebar sidebar_arr={combine} style={"small"} />
            </div>

            <div className="body">
                <Sidebar sidebar_arr={combine} style={"large"} />
                <Article data={data} synchronize_update={synchronize_update} synchronize={synchronize} />
            </div>
        </>
    )
}
export default Admin;