export function intersection(arr1,arr2,arr3){
    const temp = arr1.filter (
                    (item) => arr2.indexOf(item) > -1 )
    return temp.filter(
                    (item) => arr3.indexOf(item) > -1 )
}