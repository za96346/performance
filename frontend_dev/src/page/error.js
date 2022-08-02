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
 
                    <>
                        可能是因為您的權限被更新<br/> 
                        導致無法訪問頁面 <br/> 
                        請按下面的按鈕重新導向<br/> 
                    </>

            <button style={{width: '300px', height: '50px', marginTop: '30px'}} 
                onClick={() => select_route(navigate)}>
                press me to redirect route
            </button>
        </div>
        </>
    )
}
export default Error;