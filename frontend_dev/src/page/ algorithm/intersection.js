export function intersection(arr1,arr2,arr3){
    var temp=arr1.filter(
                    (item)=>{return(arr2.indexOf(item)>-1)})
    return temp.filter(
                    (item)=>{return(arr3.indexOf(item)>-1)})
}