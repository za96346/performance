import {Search_name,Search_year} from "../backend_component/search_input";
import  {Return_component}  from "../backend_component/data_input";
import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { backend,admin_sidebar } from "../api";
import { Loading } from "../backend_component/loading";
import { sequential_search } from "../ algorithm/sequential_search";
import { intersection } from "../ algorithm/intersection";
const Performance_per_year=({data,synchronize_update,synchronize})=>{
    const {page}=useParams()
    const {article_page}=useParams()

    const [page_data_arr,set_page_data_arr]=useState([])
    const [search,set_search]=useState({
        name:'',
        year:undefined,
        month:undefined,
    })

    let result_name = []
    let result_year = []


    useEffect(() => {
        if ( data.length !== 0) {
            set_page_data_arr(data)
        } else {
            set_page_data_arr([])
        }
       
    },[page, article_page,data])

    useEffect(() => {
        console.log('search',search)
        if(typeof(page_data_arr)!='undefined' && data){
            search.name!=='請選擇組員'&&typeof(search.name)!='undefined'&&search.name.length>0
            ?result_name=sequential_search(data,1,search.name)
            :result_name=data
            typeof(search.year)!='undefined' && search.year.length>0
            ?result_year=sequential_search(data,3,parseInt(search.year))
            :result_year=data

            const result = intersection(data, result_name, result_year)
            console.log(`名字 收尋結果${result_name.length}則`)
            console.log(`年度 收尋結果${result_year.length}則`)
            console.log(`總收尋結果${result.length}則`)
            set_page_data_arr(result)
        }
    },[search,data])
    function bar(){
        if(article_page==='年度考核分數'&&admin_sidebar().indexOf(page)!==-1){
            return(
                <>            
                    <Search_name search={search} set_search={set_search}/>
                    <Search_year search={search} set_search={set_search}/>
                </> 
            )
        }
        else{
            return(<Search_year search={search} set_search={set_search}/>)
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
                number={2} 
                synchronize_update={synchronize_update}
                page={page}
                />
                :<div className="container">查無結果</div>
            }
        </>
    )
}
export default Performance_per_year;