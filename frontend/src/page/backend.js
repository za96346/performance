import { Fragment } from "react"
import { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Admin from "./admin";
import Personal from "./personal";
import Manager from "./manager";
import { personal_sidebar } from "./api";
import { admin_sidebar } from "./api";
import session from "./method/storage";

const Backend=({access})=>{
    const {page}=useParams()
    const {article_page}=useParams()
    const token = session.getItem('token')
    const permession = session.getItem('permession')
    const navigate=useNavigate()
    useEffect(()=>{
        if(page === "登出"){
            session.clear()
            navigate('/')
        }
        else if(admin_sidebar().indexOf(page)===-1&&
                personal_sidebar.indexOf(page)===-1){
                    navigate('/access====>error')
        }
        console.log("page",page,"article_page",article_page)

        if(!token){navigate("/")}

        if(access!==permession){
            navigate('/access====>error')
        }

    })

    return(
        <Fragment>
            {
                token && (
                    permession === "admin"
                    ?<Admin/>
                    :permession === "manager"
                        ?<Manager/>
                        :<Personal/>
                )
            }
            
        </Fragment>
    )
}
export default Backend;