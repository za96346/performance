import { useNavigate, useParams,useLocation, Link } from "react-router-dom";
import { admin_sidebar,backend } from "../api";
import { useEffect,useState } from "react";
import  {Return_component}  from "../backend_component/data_input";
import {Search_year,Search_name,Search_month,New_employee} from "../backend_component/search_input";
import { Loading } from "../backend_component/loading";
import { sequential_search } from "../ algorithm/sequential_search";
import { intersection } from "../ algorithm/intersection";

const Performance_per_month=({data,synchronize_update,synchronize})=>{
    const {page}=useParams()
    const {state}=useLocation()
    const navigate=useNavigate()
    const {article_page}=useParams()
    const [display,set_display]=useState('none')
    const [page_data_arr,set_page_data_arr]=useState([])
    const [new_emp,set_new_emp]=useState('未更改')
    const [search,set_search]=useState({
        name:'',
        year:undefined,
        month:undefined,
    })


    useEffect(()=>{
        console.log('name=>',state)
        set_search({...search,
            name:!state?'':state.name,
            year:!state?undefined:state.year,
            month:!state?undefined:state.month})
        if(data.length!==0){
            set_page_data_arr(data)
        }
        else{
            set_page_data_arr([])
        }
    },[page,article_page,data])
    useEffect(()=>{
        var result_name=[]
        var result_year=[]
        var result_month=[]
        console.log('search',search)
        if(typeof(page_data_arr)!='undefined'&&data){
            
            search.name!=='請選擇組員'&&typeof(search.name)!='undefined'&&search.name.length>0
            ?result_name=sequential_search(data,1,search.name)
            :result_name=data
            typeof(search.year)!='undefined' && search.year.length>0
            ?result_year=sequential_search(data,4,parseInt(search.year))
            :result_year=data
            typeof(search.month)!='undefined' && search.month.length>0
            ?result_month=sequential_search(data,5,parseInt(search.month))
            :result_month=data
            
            
            var result=intersection(result_month,result_name,result_year)
            console.log(`data長度${data.length}`)
            console.log(`名字 收尋結果${result_name.length}則`)
            console.log(`年度 收尋結果${result_year.length}則`)
            console.log(`月份 收尋結果${result_month.length}則`)
            console.log(`總收尋結果${result.length}則`)
            set_page_data_arr(result)
        }
    },[search,data])


    function bar(){
        if(admin_sidebar().indexOf(page)===-1){
            return(
                <> 
                    <New_employee new_emp={new_emp}/>{/*自動存取的按鈕 */}
                    <Search_year search={search} set_search={set_search}/>
                    <Search_month search={search} set_search={set_search}/>
                </>
            )
        }
        else{
            return(
            <>
                <New_employee new_emp={new_emp}/>{/*自動存取的按鈕 */}
                <Search_name search={search} set_search={set_search}/>
                <Search_year search={search} set_search={set_search}/>
                <Search_month search={search} set_search={set_search}/>
            </>
            )
        }
    }
    if(!page_data_arr||synchronize===true){
        return(<Loading/>)
    }
    return(
        <>
        <div className="search_bar">
            <div>
                {
                    bar()
                }
            </div>
        </div>

        {
            page_data_arr.length!==0
            ?<Return_component
            page_data_arr={page_data_arr}
            set_page_data_arr={set_page_data_arr}
            number={1}
            page={page}
            set_new_emp={set_new_emp}
            synchronize_update={synchronize_update}/>
            :<div className="container">查無結果</div>
        }
        
        <div style={{overflow:'auto',width:'100%',alignItems:'center',justifyContent:'center',display:article_page==='每月考核績效'?'flex':'none'}}>
            <Link  
                to={`/backend/wordFile/${page}/${search.name.length===0?'請選擇組員':search.name}/${search.year}/${search.month}`}>
                <button>

                        預覽列印
                    
                </button>
            </Link>
        </div>
        </>
    )
}
export default Performance_per_month;