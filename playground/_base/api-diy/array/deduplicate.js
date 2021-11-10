/** */
export function deduplicate(arr) {
    return Array.from(new Set(arr))
}

export function deduplicate2(arr) {
    const result = []
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr.indexOf(arr[i]) === i)
            result.push(arr[i])
    }
    return result
}

export function deduplicate3(arr) {
    const map = new Map()
    arr.forEach((e, i) => {
        map.set(e, i)
    })
    return [...map.keys()]
}
