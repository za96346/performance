import { Fragment } from "react"
import { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Admin from "./admin";
import Personal from "./personal";
import Manager from "./manager";
import { personal_sidebar } from "./api";
import { admin_sidebar } from "./api";
import SocketIO from "./socketIo";

const Backend=({access})=>{
    const {page}=useParams()
    const {article_page}=useParams()
    var token=window.sessionStorage.getItem('token')
    var permession=window.sessionStorage.getItem('permession')
    const navigate=useNavigate()


    function select_permession(){
        if(token){

            if(permession==="admin"){
                return(<Admin/>)

            }
            else if(permession==="manager"){
                return(<Manager/>)
            }
            else{
                return(<Personal/>)
            }
        }
    }
    useEffect(()=>{
        if(page==="登出"){
            window.sessionStorage.clear()
            navigate('/')
            SocketIO.action('disconnect', {}, '/')
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
                select_permession()
            }
            
        </Fragment>
    )
}
export default Backend;