import { banch_index,backend,year_performance,insert_banch_table, updata_performance_table, new_emp_insert_performance_table, select_all_banch } from "../api"
export async function check_and_recatch_data(token,synchronize_update,sec){
    //負責設定同步畫面及同步抓取資料
    var result1=await banch_index(token)
    var result2=await backend(token)
    var result3=await year_performance(token)
    var result4=await select_all_banch(token)
    synchronize_update(true)//設定同步頁面開始
    setTimeout(() => {
        if(result1===true&&result2===true&&result3===true&&result4===true){
                //代表資料已經更新
            synchronize_update(false)//設定同步頁面結束
            return true
        }
        return false
    }, sec);
};

export async function search(arr,item_index,new_item,reCatchData,synchronize_update,set_new_emp,set_page_data_arr,page){
    //reCatchData=reCatchData.current
    // arr 原陣列 ,,  item_index 更新的資料所在的畫面位置  ,,  new_item 更新的資料
    // function search 把原先的陣列 要更新的資料刪除 之後 加入更新的資料
        var list=[]
        var temp=[]
        var count=0
        console.log('-----------------------------------')
        console.log('arr 原陣列',arr)
        console.log('item_index 要更新的位置',item_index)
        console.log('new_item 新的資料',new_item)
    
        for(let data=0;data<arr.length;data++){
            if(arr[data].length===1){
                //如果判斷到 陣列裡面是「’+‘」號  就不加入 跳過
            }
            else if(data!==item_index){
                list.push(arr[data])
            }
            else{
                //如果跑到的data與item_index要插入的位置相等 
                //新增  並且帶入check function
                list.push(new_item)
                await check_arr(new_item,reCatchData,synchronize_update)
            }
        }
        
        for(let none=0;none<list.length;none++){
            //尋找[[],[],[]] 空字串有幾個 
            count=0
            for(let data of list[none]){
                if(data===''){
                    count+=1
                }
            }
            if(count<list[none].length-2){
                temp.push(list[none])
            }
        }

        var data=JSON.parse(window.sessionStorage.getItem('banch_index'))
        data[page]=temp
            
        window.sessionStorage.setItem('banch_index',JSON.stringify(data))
        var new_data=JSON.parse(window.sessionStorage.getItem('banch_index'))[page]
        set_page_data_arr([...new_data,['+']])
        setTimeout(()=>{
            set_new_emp('已儲存變更')
        },500)
        return temp
};

export async function update(new_item,set_new_emp){
    //function update 更新 performance_per_month的資料
    var token=window.sessionStorage.getItem('token')
    var result1=await updata_performance_table(new_item,token)
    var result2= await backend(token)
    var result3=await year_performance(token)

    var timer=setInterval(()=>{
        if(result1===true&&result2===true&&result3===true){
            set_new_emp('已儲存變更')
            clearInterval(timer)
        }
    },100)
}

export async function check_arr(arr,reCatchData,synchronize_update){
    //當資料填完整後就request api
    //arr=[帳號,密碼,名字,組別,編號,開始日期,職位權限,工作狀態]
    var count=0
    var token=window.sessionStorage.getItem('token')
    for(var data of arr){
        if(data!==''){
            count+=1
        }
    }
    if(count===arr.length){
        var result=await insert_banch_table(token,arr) //api
        //result?alert(`資料庫存取成功${result}`):alert(`資料庫存取失敗${result}`)
        if(result==='update' &&reCatchData===true){
            check_and_recatch_data(token,synchronize_update,200)//負責設定同步畫面及同步抓取資料
            reCatchData=false//重新抓取資料狀態 否
        }
        else if(result==='insert'){
            var a=window.prompt('請輸入新員工 開始的資料(ex:年 月)').split(' ')
            //api
            a=[arr[0],parseInt(a[0]),parseInt(a[1])]
            await new_emp_insert_performance_table(token,a)//新增 新進員工的 每月的績效
            check_and_recatch_data(token,synchronize_update,200)//負責設定同步畫面及同步抓取資料
            reCatchData=false//重新抓取資料狀態 否
        }
        
    }
};

export function obj_to_arr(obj){
    var a=Object.values(obj).map((v)=>{
        return v
    })
    console.log('物件轉陣列',a)
    return a
};

export function rule_num_letter(e){
    var value =e.target.value
    var ascii
    var return_string=''

    for(let num=0;num<value.length;num++){
        ascii=value.codePointAt(num)
        if((ascii>=48&&ascii<=57)||(ascii>=65&&ascii<=90)||(ascii>=97&&ascii<=122)){
            return_string+=String.fromCharCode(ascii)
        }
    }
    e.target.value=return_string
    return return_string

}
export function rule_num(e,maxValue){
    var value =e.target.value
    var ascii
    var return_string=''

    for(let num=0;num<value.length;num++){
        ascii=value.codePointAt(num)
        if((ascii>=48&&ascii<=57)){
            if(num===0 && ascii===48){
                continue;//跳過第一個數為0
            }
            return_string+=String.fromCharCode(ascii)
        }
    }
    return_string=parseInt(return_string.length>0?return_string:'0')//如果是空時  就替換成 '0'
    return_string=return_string>maxValue?maxValue:return_string//如果出來的值大於最大值時，就把他釘在最大值
    e.target.value=return_string
    return return_string

}