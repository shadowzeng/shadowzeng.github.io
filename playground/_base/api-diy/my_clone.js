
/** http://www.conardli.top/blog/article/JS%E8%BF%9B%E9%98%B6/%E5%A6%82%E4%BD%95%E5%86%99%E5%87%BA%E4%B8%80%E4%B8%AA%E6%83%8A%E8%89%B3%E9%9D%A2%E8%AF%95%E5%AE%98%E7%9A%84%E6%B7%B1%E6%8B%B7%E8%B4%9D.html#%E5%BE%AA%E7%8E%AF%E5%BC%95%E7%94%A8 */
function clone(obj, map = new WeakMap()) {
    if (typeof obj === 'object' && obj !== null) {
        if (map.has(obj))
            return map.get(obj)
        const target = Array.isArray(obj) ? [] : {}
        map.set(obj, target)
        for (let key in obj)
            target[key] = clone(obj[key], map)
        return target
    }
    return obj
}

const obj1 = {
    a: 1,
    b: {x: true},
    c: [null, {y: 'test'}, [1, 2]]
}
obj1.foo = obj1
const obj2 = clone(obj1)
console.log(obj2.foo === obj1)
