import { Fragment } from "react"
import { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Admin from "./admin";
import Personal from "./personal";
import Manager from "./manager";
import { select_route } from "./api";
import { personal_sidebar } from "./api";
import { admin_sidebar } from "./api";
import { manager_sidebar } from "./api";
import { connectSocket } from "./socketIo";

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
        if(token) {
            connectSocket(token)
        }
    }, [token])

    return(
        <Fragment>
            {
                select_permession()
            }
            
        </Fragment>
    )
}
export default Backend;