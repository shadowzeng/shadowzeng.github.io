test1()

/**
 * 实现 observable和observe函数
 * const person = observable({name: '张三', age: 20})
 * function print() { console.log(`${person.name}, ${persion.age}`) }
 * observe(print)
 * person.name = '李四' // 输出 '李四, 20'
 */
function test1() {
    const observers = new Set()

    function observable(obj) {
        return new Proxy(obj, {
            set(target, key, value) {
                // target[key] = value
                /**
                 * 使用Reflect设置而不使用 target[key]=value的好处时,可以获得一个返回结果表示是否设置成功
                 */
                const result = Reflect.set(target, key, value)
                observers.forEach(o => o())
                return result
            }
        })
    }

    function observe(fn) {
        observers.add(fn)
    }

    const person = observable({name: '张三', age: 20})
    function print() { console.log(`${person.name}, ${person.age}`) }
    observe(print)
    person.name = '李四' // 输出 '李四, 20'
}