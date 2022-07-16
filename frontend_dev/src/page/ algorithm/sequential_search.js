export function sequential_search(arr,tar_position,tar){
    var list=[]
    for(let data of arr){
        if(data[tar_position]===tar){
            list.push(data)
        }
    }
    
    return list
}