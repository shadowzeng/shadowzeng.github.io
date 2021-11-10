test1()

function test1() {
    const obj = {x: 'foo'}
    const proxy = new Proxy(obj, {
        deleteProperty: function(target, key) {
            console.log('删除key')
            console.log(target === obj)
            Reflect.deleteProperty(target, key)
        }
    })

    // delete proxy['x']
    Reflect.deleteProperty(proxy, 'x')
    console.log(proxy)
    console.log(obj)
}