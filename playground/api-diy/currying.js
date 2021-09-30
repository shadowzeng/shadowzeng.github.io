/**
 * add(1)(2, 3)(4)()  // 10
 */
function add(...args) {
    return args.reduce((a, b) => a + b, 0)
}

console.log(add())
