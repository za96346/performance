import { Fragment } from "react"
import { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Admin from "./admin";
import Personal from "./personal";
import Manager from "./manager";
import { personal_sidebar } from "./api";
import { admin_sidebar } from "./api";
import SocketIO from "./socketIo";
import session from "./method/storage";

const Backend=({access})=>{
    const {page}=useParams()
    const {article_page}=useParams()
    var token = session.getItem('token')
    var permession = session.getItem('permession')
    const navigate=useNavigate()
    useEffect(()=>{
        if(page==="登出"){
            session.clear()
            navigate('/')
            // SocketIO.action().then((result) => {
            //     result.disconnect()
            // })
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

    useEffect(() => {
        SocketIO.action()
    }, [])

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