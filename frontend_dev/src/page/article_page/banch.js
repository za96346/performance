import { useParams,useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";

import  {Return_component}  from "../backend_component/data_input";
import { Loading } from "../backend_component/loading";
import { New_employee } from "../backend_component/search_input";


const Banch_page=({data,synchronize_update,synchronize})=>{
    var permession=window.sessionStorage.getItem('permession')
    const {page}=useParams()
    const {article_page}=useParams()
    const [page_data_arr,set_page_data_arr]=useState([])
    const [new_emp,set_new_emp]=useState('未更改')


    useEffect(()=>{
        
        if(data.length!==0){
            page==='離職員工'||permession!=='admin'
            ?set_page_data_arr(data)
            :set_page_data_arr([...data,['+']])
        }
        else{
            set_page_data_arr([])
        }
    },[page,article_page,data])
    



    if(!page_data_arr||synchronize===true){
        return(<Loading/>)
    }
    else if(permession==='admin'){
        return(
            <>
                <div className="search_bar">
                    <div>
                      <New_employee new_emp={new_emp}/>{/*自動存取的按鈕 */}

                    </div>
                </div>
                {
                    page_data_arr.length!==0
                    ?<Return_component 
                    page_data_arr={page_data_arr}
                    set_page_data_arr={set_page_data_arr}
                    set_new_emp={set_new_emp}
                    number={4} 
                    synchronize_update={synchronize_update} 
                    page={page} />
                    :<div className="container">查無結果</div>
                }

            </>
        )
    }
    else if(permession==='manager'){
        return(
            <>
                {
                    page_data_arr.length!==0
                    ?<Return_component
                        page_data_arr={page_data_arr}
                        set_page_data_arr={set_page_data_arr}
                        number={3}
                        page={page}
                        synchronize_update={synchronize_update}/>
                    :<div className="container">查無結果</div>
                }
            </>
        )
    }



}
export default Banch_page;