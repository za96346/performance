import { useParams, useNavigate } from "react-router-dom"
import { Return_component } from "./data_input"
import { Loading } from "./loading"
import { useState,useEffect, useRef } from "react"
import { insert_performance_table } from "../api"
import { select } from "react-cookies"
import { check_and_recatch_data } from "../method/method_func"
import session from "../method/storage"
const New_performance = ({data, synchronize_update, synchronize}) => {
    const {page} = useParams()
    const navigate = useNavigate()
    const token = session.getItem('token')
    const [confirm_data, set_confirm_data] = useState([])
    const [page_data_arr, set_page_data_arr] = useState([])
    const [select_year, set_select_year] = useState('請選擇年份')

    const year=['請選擇年份']
    const Today = new Date();
    for(let i=-3;i<=3;i++){
        year.push(Today.getFullYear()-1911+i)
    }
    useEffect(()=>{
        if (data.length !== 0) {
            set_page_data_arr(data)
            const arr = data.map((item) => {
                return([item[0], select_year, 'yes'])//account,year,(yes or no)
                //yes =>this people need to insert to the table
                //no =>this people dont need to insert to the table
            })
            set_confirm_data(arr)
        } else {
            set_page_data_arr([])
            set_confirm_data([])
        }
    },[page, data, select_year])

    async function insert(){
        //send api to insert performance table
        //api(token,confirm_data)
        
        if(select_year==='請選擇年份'){
            alert('請選擇年度')
            return
        }
        synchronize_update(true)
        var result=await insert_performance_table(token,confirm_data)
        if(result==='新增成功'){
            check_and_recatch_data(token,synchronize_update,2000, () => {})
        }
        alert(result)
    }

    if(!page_data_arr||synchronize===true){
        return(<Loading/>)
    }
    return(
<>
                <select onChange={(e)=>set_select_year(e.target.value)}>
                    {
                        year.map((item,index)=>{
                            return(<option value={index!==0?item:0} key={index}>{index!==0?`民國${item}`:item}</option>)
                        })
                    }
                </select>
            {
                page_data_arr.length!==0
                ?<Return_component 
                    page_data_arr={page_data_arr}
                    set_page_data_arr={set_page_data_arr}
                    synchronize_update={synchronize_update}
                    number={5}
                    page={page}
                    confirm_data={confirm_data}
                    set_confirm_data={set_confirm_data}/>
                :<></>
            }
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',zIndex:100000}}>
                <button name="create" 
                    onClick={insert}>確認新增</button>
            </div>
</>
    )
}
export default New_performance;