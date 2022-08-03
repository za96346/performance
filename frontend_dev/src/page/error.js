import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { select_route } from "./api";
import { useState } from "react";
const Error=()=>{
    const navigate = useNavigate()
    return(
        <>
        <div style={{fontSize:'30px'}}>
            404 not found<br/>

            <button style={{width: '300px', height: '50px', marginTop: '30px'}} 
                onClick={() => {
                    select_route(navigate)
                    window.location.reload()
                }}>
                press me to redirect route
            </button>
        </div>
        </>
    )
}
export default Error;