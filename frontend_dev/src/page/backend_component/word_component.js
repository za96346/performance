import { useRef,useState,useEffect } from "react"

const Word_component=({arr})=>{
    const clientHeight1_ref=useRef()//px
    const clientHeight2_ref=useRef()//px
    const [div1,set_div1]=useState(4.5)
    const [div2,set_div2]=useState(4.5)
    function handle_goal(goal){
        return( goal.split('\n').map((item,index)=>{
            if(item.length===0||item===''){
                return(<></>)
            }
            return(
                <>
                    &nbsp;&nbsp;&nbsp; {item}&nbsp;&nbsp;&nbsp;&nbsp;□已完成  □目標持續中<br/>
                </>
            )
        })
        )

    }
    useEffect(() => {
        set_div1(parseInt(clientHeight1_ref.current.clientHeight)*0.04)
        set_div2(parseInt(clientHeight2_ref.current.clientHeight)*0.04)
    });
    function cal_break(num1,num2){

        //console.log(div1,div2)
        if(div1+div2>=num1&& div1+div2<num2){
            return 'always'
        }
        else{
            return 'avoid'
        }

    }

    return(
        <div className='print_page'>

                <p style={{fontSize:'8px'}}>臺中市私立鎮瀾兒童家園</p>
                <div style={{fontSize:'20px',justifyContent:'center',border:'none',marginBottom:'0.5cm'}}>工作督導月紀錄</div>
                <div style={{height:'1cm'}}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'4.5cm'}} >日期</div>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'4.5cm'}}>{arr[4]}-{arr[5]<10?'0'+arr[5]:arr[5]}</div>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'4.5cm'}}>姓名</div>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'4.5cm'}}>{arr[1]}</div>
                </div>
                <div ref={clientHeight1_ref}
                    style={{minHeight:'4.5cm',height:'fit-content'}}>
                    <div className='print_page_column_one'>工作自評</div>
                    <div className='print_page_column_two'>
                    1、	紀錄繳交 □依規定完成  □遲交  □未完成<br/>
                    2、	方案執行 □依規定完成  □遲交  □未完成<br/>
                    3、	個人目標<br/>
                        {
                            handle_goal(arr[2])
                        }


                    </div>
                </div>
                <div 
                    ref={clientHeight2_ref}
                    style={{minHeight:'4.5cm',height:'fit-content'}}>
                    <div className='print_page_column_one'>前月績效</div>
                    <div className='print_page_column_two'>
                    專業績效:{arr[8]}&nbsp;    行政效率:{arr[7]}&nbsp;    工作態度:{arr[6]}<br/>
                    出勤狀況&nbsp;&nbsp;&nbsp;遲到:{arr[10]}&nbsp;    未依規定請假:{arr[11]}<br/>
                    績效描述:<br/> {arr[9].split('\n').map((item)=>{
                        return (<>{item}<br/></>)
                    })}<br/>

                    </div>
                </div>
                <div style={{height:'2.5cm',
                    marginTop:cal_break(27.5,div2)==="always"?'1.5cm':'0px',
                    pageBreakBefore:cal_break(27.5,div2)}}>
                    <div className='print_page_column_one'>組員回饋</div>
                    <div className='print_page_column_two'></div>
                </div>
                <div style={{height:'5.5cm',
                    marginTop:cal_break(25,27.5)==="always"?'1.5cm':'0px',
                    pageBreakBefore:cal_break(25,27.5)}}>
                    <div className='print_page_column_one'>工作督導</div>
                    <div className='print_page_column_two'>
                    一、組員議題（可複選） <br/>
                    &nbsp;&nbsp;&nbsp; □理論運用 □專業方法 □專業倫理 □專業關係 □督導關係 □同儕關係<br/>
                    &nbsp;&nbsp;&nbsp; □機構運作 □價值衝突 □行政業務 □個人自我突破與成長<br/>
                    &nbsp;&nbsp;&nbsp; □其他（請說明）________________________________  <br/>

                    二、督導之處置（可複選） <br/>
                    &nbsp;&nbsp;&nbsp; □專業概念解說與討論 □情緒支持與同理 □與機構主管溝通 <br/>
                    &nbsp;&nbsp;&nbsp; □協助組員進行反思 □提供閱讀資源  □提供個人實習經驗<br/>
                    &nbsp;&nbsp;&nbsp; □向園方反應 □要求組員達成園方基本要求 <br/>
                    &nbsp;&nbsp;&nbsp; □他（請說明）________________________________ 
                    </div>
                </div>
                <div style={{height:'2.25cm',
                    marginTop:cal_break(20,25)==="always"?'1.5cm':'0px',
                    pageBreakBefore:cal_break(20,25)}}>
                    <div className='print_page_column_one'>督導回饋</div>
                    <div className='print_page_column_two'></div>
                </div>
                <div style={{height:'2.25cm',
                    marginTop:cal_break(17.5,20)==="always"?'1.5cm':'0px',
                    pageBreakBefore:cal_break(17.5,20)}}>
                    <div className='print_page_column_one'>追蹤事項</div>
                    <div className='print_page_column_two'></div>
                </div>
                <div
                    style={{height:'1cm',
                    marginTop:cal_break(15,17.5)==="always"?'1.5cm':'0px',
                    pageBreakBefore:cal_break(15,17.5)}}>
                    <div style={{display:'flex',alignItems:'center',width:'9cm'}}>記錄者簽章:</div>
                    <div style={{display:'flex',alignItems:'center',width:'9cm'}}>督導簽章:</div>
                </div>
                <div style={{diplay:'flex',justifyContent:'end',fontSize:'8px'}}>
                1080101第三次修定
                </div>

        </div>
    )

}
export default Word_component;