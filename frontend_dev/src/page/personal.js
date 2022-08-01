import Article from "./backend_component/article";
import Sidebar from "./backend_component/sidebar";
import Title from "./backend_component/title";
import { useEffect,useState,useCallback } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { personal_sidebar, log_out } from "./api";
import { useRef } from "react";
import session from "./method/storage";
const Personal=()=>{
    const [synchronize,synchronize_update]=useState(false)//設定同步頁面
    const {page}=useParams()
    const {article_page}=useParams()
    const navigate=useNavigate()
    var permession= session.getItem('permession')
    const [data,set_data]=useState([]);
    const [combine, setCombine] = useState(personal_sidebar.concat(log_out))

    const identifyCallback=useCallback(()=>{
        function identify(){
            if(page!=='登出'){
                var value=[]

                if(page === personal_sidebar[0]){
                    value = session.getItem('data')[permession] || []
                    set_data(value?.length > 0 ? value : [])
                }
                else if(page===personal_sidebar[1]){
                    value = session.getItem('year_performance')[permession] || []
                    set_data(value?.length > 0 ? value : [])
                }
            }
        }
        console.log('\n\n\n\n\n\nchange\n\n\n\n\n\n\n\n')
        identify()
    },[synchronize,article_page,page])

    useEffect(() => {
        if (!synchronize) {
            setCombine(personal_sidebar.concat(log_out))
        } else {
            setCombine(personal_sidebar)
        }
    }, [synchronize])

    useEffect(()=>{
        identifyCallback()
    },[identifyCallback])

    useEffect(() => {
        if(combine?.indexOf(page) === -1){
            navigate('/access====>error')
        }else if(article_page){
            navigate('/access====>error')
        }
    });

    return(
    <>
        <div className="head">
            <Title sidebar_arr={personal_sidebar} synchronize_update={synchronize_update} />
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
export default Personal;