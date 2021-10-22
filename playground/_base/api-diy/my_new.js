/**
 * new 操作符调用构造函数时
 *  - 创建了一个空对象
 *  - 将空对象的原型指向构造函数的原型
 *  - this指向该对象, 执行构造函数体(为对象添加属性)
 *  - 如果构造函数没有return 或者是 return 原生类型, 那么 new 操作后返回构造出的新对象
 *    如果构造函数返回其他对象, 那么new 操作返回该对象
 */

function myNew(fn, ...args) {
    if (typeof fn !== 'function')
        throw new Error('fn should be a function')
    const obj = Object.create(fn.prototype)
    const result = fn.apply(obj, args)
    return result instanceof Object ? result : obj
}

function Foo(id, name) {
    this.id = id
    this.name = name
    // return []
}

Foo.prototype.base = 'base'

Foo.prototype.print = function(content) {
    console.log(content)
}

// console.log(new Foo())

const myFoo = myNew(Foo, 1, 'foo')
console.log(myFoo)
console.log(myFoo.base)
myFoo.print('hello')