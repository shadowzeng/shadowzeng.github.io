function myInstanceof(obj, fn) {
    if (typeof fn !== 'function')
        throw new Error('fn should be a function')
    let proto = Object.getPrototypeOf(obj)
    while (proto) {
        if (proto === fn.prototype)
            return true
        proto = Object.getPrototypeOf(proto)
    }
    return false
}

class A {}
class B extends A {}
class C extends B {}
class D {}

const c = new C()
console.log(myInstanceof(c, D))
console.log(myInstanceof(C, Function))
console.log(myInstanceof(new Date(), Date))