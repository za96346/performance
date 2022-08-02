import { Fragment, useRef } from "react"
import { useState,useEffect } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";

import { manager_sidebar,admin_sidebar,personal_sidebar,article_bar_arr } from "../api";
import Banch_page from "../article_page/banch"
import performance_per_month from "../article_page/performance_per_month"
import Public_relation from "../article_page/public_relation"
import Social_worker from "../article_page/scioal_worker"
import Performance_per_month from "../article_page/performance_per_month";
import Performance_per_year from "../article_page/performance_per_year";
import Emp_workoff from "../article_page/emp_workoff"
import New_performance from "./new_performance";
import Group_manage from "../article_page/group_manage";
import session from "../method/storage";

import FadeIn from "../Hoc/fade_in";

const Fade = FadeIn(1200, 1)
const Article=({data,synchronize_update,synchronize})=>{
    const [article_bar_onclick,set_article_bar_onclick]=useState({
        now_item:'',
        classname:''
    })



    const navigate = useNavigate()
    const {page} = useParams()
    const {article_page} = useParams()
    const permession = session.getItem('permession')

    function article_bar_onclick_class(index){
        if(article_bar_onclick.now_item===article_bar_arr[index]){
            return 'article_bar_onclick'
        }
        else{
            return article_bar_onclick.classname
        }
    }


    useEffect(()=>{
        if(!article_page){
            set_article_bar_onclick({...article_bar_onclick,now_item:article_bar_arr[0]})
        }
        else{
            set_article_bar_onclick({...article_bar_onclick,now_item:article_page})
        }
    }, [article_page])


    
    function article_bar(){
        if(permession!=='personal' && admin_sidebar().indexOf(page)!==-1){
            return(
                <div className="article_bar">
                    {
                        article_bar_arr.map((item,index)=>{
                            if(item==='首頁'){
                                return(
                                    <Link 
                                        className={article_bar_onclick_class(index)}
                                        onClick={(index)=>
                                            set_article_bar_onclick({...article_bar_onclick,now_item:article_bar_arr[index]})}
                                        key={index} 
                                        to={`/backend/${permession}/${page}`}>{item}</Link>
                                )
                            }
                            else{
                                return(
                                    <Link 
                                    className={article_bar_onclick_class(index)}
                                    onClick={(index)=>
                                        set_article_bar_onclick({...article_bar_onclick,now_item:article_bar_arr[index]})}
                                    key={index} to={`/backend/${permession}/${page}/${item}`}>{item}</Link>
                                )
                            }
                        })
                    }
                </div>
            )
        }
    }
    function select_article_page(){
        if(article_page==='每月考核績效'||page==='每月考核績效'){
            return(<Performance_per_month data={data} synchronize={synchronize} synchronize_update={synchronize_update}/>)
        }else if(article_page==='年度考核分數'||page==='年度考核分數'){
            return(<Performance_per_year data={data} synchronize={synchronize} synchronize_update={synchronize_update}/>)
        }
        else if(page==='新增年度'){
            return(<New_performance data={data} synchronize={synchronize} synchronize_update={synchronize_update}/>)
        }
        else if(page==='組別管理'){
            return(<Group_manage synchronize={synchronize} synchronize_update={synchronize_update}  data={data}/>)
        }
        else if(!article_page&&admin_sidebar().indexOf(page)!==-1){
            return(<Banch_page synchronize={synchronize} synchronize_update={synchronize_update}  data={data}/>)
        }

    }

    return(
        <Fragment>
            <Fade className="article">
                <div style={{margin:'2vh 2vw'}}>
                {
                    page === '組別變動' || page === '新增年度' || page === '組別管理'
                    ?<></>
                    :article_bar()
                }
                {
                    select_article_page()
                }
                </div>
            </Fade>
            

        </Fragment>
    )
}
export default Article;