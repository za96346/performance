
import { useState,useEffect } from "react"
import { select } from "react-cookies"
import { useParams } from "react-router-dom"
import { admin_sidebar } from "../api"
import session from "../method/storage"

export function Search_month({search,set_search}){

    const [style,set_style]=useState({
        button_display:{display:'inline-block'},
        input_display:{display:'none'},
        text:'請輸入月份'
    })

    return(
        <>
        <button style={style.button_display} 
                                        onClick={()=>
                                            set_style({...style,
                                                button_display:{display:'none'},
                                                input_display:{display:'inline-block'},
                                                text:''})}>
            {style.text}
        </button>
            <input  placeholder='月份:xx'
                    defaultValue={search.month}
                    onChange={(e)=>{set_search({...search,month:e.target.value})}}
                    style={style.input_display} 
                    className="search_input"
                    type="number" 
                    min="1" max="12"
                    step="1" />
        </>
    )
}
export function Search_year({search,set_search}){

    const [style,set_style]=useState({
        button_display:{display:'inline-block'},
        input_display:{display:'none'},
        text:'請輸入年份'
    })

    return(
        <>
        <button style={style.button_display}  
                onClick={()=>
                    set_style({...style,
                    button_display:{display:'none'},
                    input_display:{display:'inline-block'},
                    text:''})}>
            {style.text}
        </button>
        <input 
            placeholder="民國:xxx"
            defaultValue={search.year}
            onChange={(e)=>{set_search({...search,year:e.target.value})}}
            style={style.input_display} 
            className="search_input"
            type="number"
            min="90" 
            max="900" step="1" />
        </>
    )
}
export function Search_name({search,set_search}){
    const {page}=useParams()

    const [style,set_style]=useState({
        button_display:{display:'inline-block'},
        input_display:{display:'none'},
        text:'請選擇組員'
    })
    const name_arr=[]
    const banch_index = session.getItem('banch_index')
    const permession = session.getItem('permession') || ''
    for(const data of banch_index[page]){
        permession === 'admin'
        ?name_arr.push(data[2])
        :name_arr.push(data[1])
    }
    

    useEffect(() => {

        console.log('banch_index',banch_index[page])

    }, [page]);

    return(
    <>
        <button style={style.button_display}
        onClick={()=>
            set_style({...style,
                button_display:{display:'none'},
                input_display:{display:'inline-block'},
                text:''})}>
        {style.text}
        </button>
        
        <input onChange={(e)=>set_search({...search,name:e.target.value})} value={search.name}  style={style.input_display} type='text' list='people'/>
        <datalist id="people" style={{position:'relative',left:0}}>
                {
                    name_arr
                    ?name_arr.map((item,index)=>{
                        return(
                            <option  key={index}>{item}</option>
                        )
                    })
                    :<></>
                }
        </datalist>
    </>
    )
}
export function New_employee({new_emp}){
   
    const {page}=useParams()
    const [bt_style,set_bt_style]=useState({backgroundColor:'rgb(46,139,87)'})
    useEffect(()=>{
        if(new_emp!=='未更改'&&new_emp!=='已儲存變更'){
            set_bt_style({...bt_style,backgroundColor:'rgb(255,0,0)'})
        }
        else{
            set_bt_style({...bt_style,backgroundColor:'rgb(46,139,87)'})
        }
    },[new_emp])
    return(
        <>
            <button style={bt_style}>
                {
                    new_emp
                }
            </button>
        </>
    )
}


