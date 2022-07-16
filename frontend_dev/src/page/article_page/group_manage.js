import { Loading } from "../backend_component/loading";
import { Return_component } from "../backend_component/data_input";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { change_banch_name } from "../api";
import { check_and_recatch_data } from "../method/method_func";

const Group_manage=({data,synchronize_update,synchronize})=>{
    const {page}=useParams()
    var token=window.sessionStorage.getItem('token')

    const {article_page}=useParams()
    const [page_data_arr,set_page_data_arr]=useState([])
    const [new_arr,set_new_arr]=useState(['',''])
    const [commit,set_commit]=useState([])
    const [btn,set_btn]=useState('block')
    useEffect(()=>{
        //當input更改資料的時候
        //new_arr=[原來的組,更改名稱後的組]
        var original_group=new_arr[0]
        var change_group=new_arr[1]
        console.log('new_arr',new_arr)
        if(change_group!==''&&change_group!=='新增'){
            var temp=commit.map((item)=>{
                //item [原來的組,更改名稱後的組]
                if(original_group===item[0]){
                    return [item[0],change_group]
                }
                else{
                    return item
                }
            })
            set_commit(temp)
        }
        
    },[new_arr])
    useEffect(()=>{
        console.log('commit',commit)
    },[commit])


    useEffect(()=>{

        if(data.length!==0){
            set_page_data_arr(data)
            var temp=data.map((item)=>{
                return [item,item]
            })
            set_commit(temp)
        }
        else{
            set_commit(['',''])
            set_page_data_arr([])
        }
    },[page,article_page,data])

    if(!page_data_arr||synchronize===true){
        return(<Loading/>)
    }
    return(
        <>
            
            {
                page_data_arr.length>0
                ?<Return_component
                page_data_arr={page_data_arr}
                set_page_data_arr={set_page_data_arr}
                number={6} 
                synchronize_update={synchronize_update}
                page={page}
                set_new_arr={set_new_arr}
                />
                :<div className="container">查無結果</div>
            }
            <div style={{overflow:'auto',width:'100%',alignItems:'center',justifyContent:'center',display:'flex'}}>
                <button 
                    style={{display:btn}}
                    onClick={()=>{
                        set_page_data_arr([...page_data_arr,`新增`])
                        set_commit([...commit,[`新增`,'新增']])
                        set_btn('none')
                    }}>
                    新增</button>
                <button
                onClick={async()=>{
                    await change_banch_name(token,commit)
                    check_and_recatch_data(token,synchronize_update,1000)
                }}
                >儲存</button>
            </div>
        </>
    )

}
export default Group_manage;