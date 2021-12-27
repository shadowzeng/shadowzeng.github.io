test2()

function test1() {
    var test = {
        name: 'test object',
        createFoo: function() {
            return function() {
                console.log(this)
                console.log(arguments)
            }
        },
        createBar: function() {
            return () => {
                console.log(this)
                console.log(arguments)
            }
        }
    }

    var foo = test.createFoo('a', 'b')
    var bar = test.createBar('x', 'y')
    foo()  // this为全局对象, arguments对象为空
    bar()  // this为test对象, arguments为 { '0': 'x', '1': 'y' }
}

function test2() {
    const arr = [
        'hello',
        function() {console.log(this)}
    ]
    arr[1]() // 本质上还是在数组这个对象上调用的方法, 输出为arr对象
}
