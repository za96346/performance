import { useState,useEffect } from 'react';
import { useNavigate, useParams,useLocation } from 'react-router-dom';
import { sequential_search } from '../ algorithm/sequential_search';
import { intersection } from '../ algorithm/intersection';
import Word_component from './word_component';
import session from '../method/storage';

const Word_preview=()=>{
    const {banch}=useParams()
    const {people}=useParams()
    const {year}=useParams()
    const {month}=useParams()
    const [arr,set_arr]=useState([])
    var permession = session.getItem('permession')

    function identify_undefined(props){
        if(props==='undefined'){
            return undefined
        }
        return props
    }

    const navigate=useNavigate()
    useEffect(() => {
        
        var result_name=[]
        var result_year=[]
        var result_month=[]
        var data = session.getItem('data')[banch]
        
        if(data!==undefined){
            people!=='請選擇組員'&&typeof(people)!='undefined'&&people.length>0
            ?result_name=sequential_search(data,1,people)
            :result_name=data
            year!=='undefined' && year.length>0
            ?result_year=sequential_search(data,4,parseInt(year))
            :result_year=data
            month!=='undefined' && month.length>0 
            ?result_month=sequential_search(data,5,parseInt(month))
            :result_month=data
            var result=intersection(result_month,result_name,result_year)
            
            set_arr(result)
        }
    }, []);
    return(

        <div onClick={()=>navigate(`/backend/${permession}/${banch}/每月考核績效`,{state:{name:identify_undefined(people),year:identify_undefined(year),month:identify_undefined(month)}})}>
        {
            arr.map((item,index)=>{
                return(
                    <Word_component key={index} arr={item}/>
                )
            })
        }
    </div>
    )
}
export default Word_preview;