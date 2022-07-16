import { useState } from "react"

export function Loading(){
    var p={

        
        fontSize:'small',
        color:'rgb(10,30,10)'
    }
    return(
       
            <div className={'container_loading'}>
                
                <div className={'loader'}>
                    
                </div>
                <div style={p}>資料同步中</div>
            </div>

        
    )
}