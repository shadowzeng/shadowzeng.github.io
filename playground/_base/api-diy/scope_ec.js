test2()

function test1() {
    var value = 1
    function foo() {
        console.log(value) // 在定义时就确定下来，这里可访问到的value是1
    }
    function bar() {
        var value = 2
        foo()
    }
    bar()
}

function test2() {
    eval('var foo = 1')
    console.log(foo) // 可以访问
}
