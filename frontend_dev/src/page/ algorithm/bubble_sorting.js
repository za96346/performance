export function bubble_sorting(arr, tar_position, step) {
    //desc 高到低
    //asc 低到高
    console.log(tar_position)
    let direct

    arr[0][tar_position] > arr[arr.length - 1 - step][tar_position] ? direct = 'asc' : direct = 'desc'
    console.log(arr[0][tar_position], arr[arr.length - 1][tar_position])
    let len = arr ? arr.length : 0

    if (direct === 'desc') {
        while (len > 1) {
            for (let i = 0; i < len - 1; i++) {

                if (arr[i][tar_position] < arr[i + 1][tar_position]) {
                    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
                }
            }
            len -= 1
        }
    }
    else if (direct === 'asc') {
        while (len > 1) {
            for (let i = 0; i < len - 1; i++) {

                if (arr[i][tar_position] > arr[i + 1][tar_position]) {
                    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
                }
            }
            len -= 1
        }
    }
    console.log('排序後長度', arr.length)
    return arr
}