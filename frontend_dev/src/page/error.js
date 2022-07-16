import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { select_route } from "./api";
import { useState } from "react";
const Error=()=>{
    const navigate=useNavigate()
    const [a,set_a]=useState(5)

    

    useEffect(()=>{

        if(a>0){
            setTimeout(() =>{
                set_a(a-1)
            }, 1000);
        }                         
        else{
            select_route(navigate)
        }
    },[a]);
    return(
        <>
        <div className="time_up_to_navigate">
            <div>
                {
                    a
                }
                秒後跳轉
            </div>
        </div>
        <div style={{fontSize:'30px'}}>
            404 not found<br/>
        </div>
        </>
    )
}
export default Error;