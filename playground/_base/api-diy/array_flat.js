function flat1(arr) {
    let result = []
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i]))
            result = result.concat(flat1(arr[i]))
        else
            result.push(arr[i])
    }
    return result
}

function flat2(arr) {
    return arr.reduce((prev, next) => {
        if (Array.isArray(next))
            return prev.concat(flat2(next))
        return prev.concat(next)
    }, [])
}

const data = [[1,2], 3, [4, [5, 6, [7], 8], 9]]
console.log(flat2(data))