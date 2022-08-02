import { Fragment } from "react"
import { useState,useEffect } from "react";
import { useNavigate,Link,NavLink, useParams } from "react-router-dom";
import { fade_in } from "../fade_in";
import session from "../method/storage";
const Sidebar=({sidebar_arr,style})=>{
    const {page}=useParams()
    const navigate=useNavigate()
    const [disp,set_disp]=useState({display:'none'})
    const [sidebar_onclick,set_sidebar_onclick]=useState({
        now_item:'',
        classname:''
    })
    const permession = session.getItem('permession')
    function sidebar_onclick_class(index){
        if(sidebar_onclick.now_item===sidebar_arr[index]){
            return 'sidebar_div_onclick'
        }
        else{
            return sidebar_onclick.classname
        }
    }
    useEffect(()=>{
        set_sidebar_onclick({sidebar_onclick,now_item:page})

    }, [page])
    const [style_opacity,set_style_opacity]=useState({opacity:0,transition:''})
    useEffect(()=>{
        fade_in(style_opacity,set_style_opacity,600,'1.5s')
    },[])

    return(
        <Fragment>
            <div style={style_opacity} className={style}>
                

                {
                    sidebar_arr?.map((item,index)=>{
                            if(sidebar_arr[0]==='組別管理'&&index===0){
                                return(                                    
                                    <Link
                                    onMouseEnter={(e)=>{e.target.style.background='rgb(16, 63, 65)'}}
                                    onMouseLeave={(e)=>{e.target.style.background='rgb(155, 229, 226, 0.5)'}}
                                    to={`/backend/${permession}/組別管理`}
                                    className={sidebar_onclick_class(index)}
                                        onClick={()=>{
                                                disp.display==='none'
                                                ?set_disp(style==='large'?{display:'flex'}:{display:'flex'})
                                                :set_disp({display:'none'})
                                            }}
                                        key={index}>
                                        {item}
                                </Link>)
                            }
                            else if(sidebar_arr[0]==='組別管理'&&index<sidebar_arr.length-3){
                                return(
                                    <Link 
                                        onMouseEnter={(e)=>{e.target.style.color='rgb(16, 63, 65)'}}
                                        onMouseLeave={(e)=>{e.target.style.color='rgb(255,0,0)'}}
                                        className={sidebar_onclick_class(index)}
                                            style={{...disp,borderRadius:'0px',color:'rgb(255,0,0)'}}
                                            onClick={()=>
                                                set_sidebar_onclick({...sidebar_onclick,now_item:sidebar_arr[index]})} 
                                        key={index}
                                        to={`/backend/${permession}/${item}`}>
                                        {item}
                                    </Link>
                                )
                            }
                            else{
                                return(
                                    <Link className={sidebar_onclick_class(index)}
                                            onMouseEnter={(e)=>{e.target.style.background='rgb(16, 63, 65)'}}
                                            onMouseLeave={(e)=>{e.target.style.background='rgb(155, 229, 226, 0.5)'}}
                                            onClick={()=>
                                                set_sidebar_onclick({...sidebar_onclick,now_item:sidebar_arr[index]})} 
                                        key={index}
                                        to={`/backend/${permession}/${item}`} >
                                        {item}
                                    </Link>
                                )
                            }
                        }
                    )
                }
            </div>
            

        </Fragment>
    )
}
export default Sidebar;