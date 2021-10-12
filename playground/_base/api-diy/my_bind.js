/**
 * https://medium.com/geekculture/custom-implementation-of-bind-method-in-javascript-c5db931b1cf4
 * https://github.com/mqyqingfeng/Blog/issues/12
 */

Function.prototype.myBind = function(thisContext, ...formerArgs) {
    /**
     * // 注意箭头函数不能作为constructor, 这种写法返回的bind方法不能使用 new
     * return (...newArgs) => {
     *     // 这里 this 指向父作用域，也就是myBind方法中的 this, 而myBind中的this由最终被谁调用确定
     *     this.apply(thisContext, args.concat(newArgs))
     * }
     */
    const fn = this
    return function(...latterArgs) {
        return fn.apply(thisContext, formerArgs.concat(latterArgs))
    }
}

Function.prototype.myBind2 = function(thisContext, ...formerArgs) {
    const fn = this
    function bound(...latterArgs) {
        return fn.apply(thisContext, formerArgs.concat(latterArgs))
    }
    bound.prototype = fn.prototype
    return bound
}

function Test(x, y) {
    this.name = x
    this.id = y
    console.log(this.name)
    console.log(this)
}
Test.prototype.root = 'root'

const BoundTest = Test.myBind2({name: 'xxx'}, '111')
const t = new BoundTest('222')
console.log(t.root)

// global.hello = 'global hello'

// function test(foo, bar) {
//     console.log(this.hello)
//     console.log(foo)
//     console.log(bar)
// }

// test()

// const test1 = test.myBind({hello: 'object hello'}, 'foo', 'xxx')
// test1('bar')

// function test(foo, bar) {
//     this.x = foo
//     this.y = bar
// }

// const test1 = test.myBind({x: 111, y: 222})

// const t = new test1()
// console.log(t)
