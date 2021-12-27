test1()

function test1() {
    function isString(obj) {
        return typeof obj === 'string' || obj instanceof String
    }
    const s1 = 'hello'
    const s2 = new String('hello')
    console.log(typeof s1) // string
    console.log(typeof s2) // object
    console.log(s1 instanceof String) // false
    console.log(s2 instanceof String) // true
}
