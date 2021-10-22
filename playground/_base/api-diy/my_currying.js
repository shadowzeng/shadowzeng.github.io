/**
 * 为参数数目固定的函数
 */
function currying(fn) {
    const curried = function(...args1) {
        if (args1.length >= fn.length)
            return fn.apply(this, args1)
        return function(...args2) {
            return curried.apply(this, args1.concat(args2))
        }
    }
    return curried
}

function sum(a, b, c, d) {
    return a + b + c +d
}
// const curriedSum = currying(sum)


/**
 * 参数不固定的情况
 * add(1)(2, 3)(4)()  // 10
 */
function add(...args) {
    let allArgs = []
    function curried(...args1) {
        if (args1.length === 0)
            return allArgs.reduce((a, b) => a + b, 0)
        allArgs = [...allArgs, ...args1]
        return curried
    }
    return curried(...args)
}

// console.log(add())

/**
 *  参数不固定2
 */
function add2(...args) {
    let allArgs = []
    function curried(...args1) {
        allArgs = [...allArgs, ...args1]
        return curried
    }
    curried.count = () => {
        return allArgs.reduce((a, b) => a + b, 0)
    }
    return curried(...args)
}

console.log(add2(1,2)(3).count())