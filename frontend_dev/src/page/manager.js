import Article from "./backend_component/article";
import Sidebar from "./backend_component/sidebar";
import Title from "./backend_component/title";
import { article_bar_arr, manager_sidebar, select_route } from "./api";
import { personal_sidebar } from "./api";
import { log_out } from "./api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect,useState,useCallback } from "react";
import { sequential_search } from "./ algorithm/sequential_search";
import { useRef } from "react";
import session from "./method/storage";
const Manager=()=>{
    const [synchronize,synchronize_update] = useState(false)//設定同步頁面
    const {page} = useParams()
    const {article_page} = useParams()
    const navigate = useNavigate()
    const [combine, setCombine] = useState(manager_sidebar().concat(personal_sidebar,log_out))
    const [data,set_data] = useState([])


    //article_bar_arr=['首頁','年度考核分數','每月考核績效']
    //personal_sidebar=['個人年度目標','每月考核績效','年度考核分數'];
    const identifyCallback=useCallback(()=>{

        function identify(){
            if(page!=='登出'){
                var year_perform = session.getItem('year_performance')[page] || []
                var manager_personal_year = session.getItem('year_performance')['manager_personal'] || []
                
                var month_perform = session.getItem('data')[page] || []
                var manager_personal_month = session.getItem('data')['manager_personal'] || []
                if(article_page === article_bar_arr[1]){
                    set_data(year_perform?.length > 0 ? year_perform : [])
                }
                else if(article_page === article_bar_arr[2]){
                    set_data(month_perform?.length > 0 ? month_perform : [])
                }
                else if(page === personal_sidebar[0]){
                    set_data(manager_personal_month?.length > 0 ? manager_personal_month : [])
                }
                else if(page === personal_sidebar[1]){
                    set_data(manager_personal_year?.length > 0 ? manager_personal_year : [])
                }
                else{
                    var value = session.getItem('banch_index')[page] || []
                    set_data(value?.length > 0 ? value : [])
                }
            }
        }
        console.log('\n\n\n\n\n\nchange\n\n\n\n\n\n\n\n')
        identify()
    },[synchronize,article_page,page])

    useEffect(() => {
        if (!synchronize) {
            setCombine(manager_sidebar().concat(personal_sidebar,log_out))
        } else {
            setCombine(personal_sidebar)
        }
    }, [synchronize])

    useEffect(()=>{
        identifyCallback()
    },[identifyCallback])

    useEffect(() => {
        if(combine?.indexOf(page) === -1) {
            navigate('/access====>error')
        } else if (personal_sidebar?.indexOf(page) !== -1 && article_page ){
            navigate('/page====>error')
        } else if (article_page) {
            if(personal_sidebar?.indexOf(article_page) === -1) {
                navigate('/access====>error')
            }
        }
    });
    
    return(
    
    <>
    <div className="head">
        <Title sidebar_arr={manager_sidebar()} synchronize_update={synchronize_update} />
        <Sidebar sidebar_arr={combine} style={"lesssmall"} />
        <Sidebar sidebar_arr={combine} style={"small"} />
    </div>

    <div className="body"> 
        <Sidebar sidebar_arr={combine} style={"large"}/>
        <Article data={data} synchronize={synchronize} synchronize_update={synchronize_update}/>
    </div>
    </>
    
    )
}
export default Manager;