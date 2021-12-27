test5()

// 函数声明整体都会提升
function test1() {
    console.log(foo) // Function
    function foo(){}
    console.log(foo) // Function
}

// 函数表达式中, 变量会提升,函数定义不提升
function test2() {
    console.log(foo) // undefined
    var foo = function(){}
    console.log(foo)
}

// 函数表达式中不是用匿名函数，外部访问函数名都会报错（不管是定义前还是定义后）
function test3() {
    console.log(foo) // undefined
    console.log(bar) // ReferenceError
    var foo = function bar(){}
    console.log(foo)
}

// 函数提升会覆盖变量提升，但是变量赋值语句又会修改
function test4() {
    console.log(typeof foo) // function
    console.log(typeof bar) // undefined
    var foo = 'hello'
    var bar = function(){return 'world'}
    function foo() {}
    console.log(typeof foo) //string
}

function test5() {
    function test() {
        // console.log(woo) // ReferenceError
        woo = 1 // woo会成为全局变量
        console.log(woo) // 后面访问不报错
    }
    test()
    console.log(woo) // 可以访问到
}
