test1()

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
