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
const curriedSum = currying(sum)
console.log(curriedSum(1, 2, 3, 4))
console.log(curriedSum(1)(2, 3, 4))
console.log(curriedSum(1)(2)(3)(4))
console.log(curriedSum(1)(2, 3)(4))
console.log(curriedSum(1, 2, 3)(4))
console.log(curriedSum(1, 2, 3)(4, 5, 6))

/**
 * 参数不固定的情况
 * add(1)(2, 3)(4)()  // 10
 */
// function add(...args) {
//     return args.reduce((a, b) => a + b, 0)
// }

// console.log(add())

const add=(...args)=>{
            let vars=[]
            const curried=(...c)=>{
                vars=[...vars,...c]
                return curried
            }
            curried.toString=()=>{
                 return vars.reduce((a,b)=>a+b,0)
            }
            return curried(...args)
        }
// console.log(add(1)(2)(3, 4)(5).toString())
