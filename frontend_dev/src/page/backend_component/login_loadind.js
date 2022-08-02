

export function Login_loading({text}){
    const p = {

        fontSize:'small',

        color:'rgb(10,30,10)'
    }
    
    return(
       
            <div className={'container_loading'}>
                
                <div style={{marginBottom:'20px'}} className={'loader'}>
                    
                </div>
                <div style={p}>{
                    text
                }</div>
            </div>

        
    )
}