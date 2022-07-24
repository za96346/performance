import { Fragment } from "react"
import { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fade_in } from "../fade_in";
import session from "../method/storage";
const Title=({sidebar_arr})=>{
    const {page}=useParams()
    const permession = session.getItem('permession')
    const navigate=useNavigate()
    const [style_opacity,set_style_opacity]=useState({opacity:0,transition:''})
    useEffect(()=>{
        fade_in(style_opacity,set_style_opacity,300,'1s')
    },[])
    return(
        <Fragment>
            <div style={style_opacity} onClick={()=>{navigate(`/backend/${permession}/${sidebar_arr[0]}`)}}
                 className="title">
                
            </div>

        </Fragment>
    )
}
export default Title;