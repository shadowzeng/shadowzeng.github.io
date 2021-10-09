/**
 * IIFE使用场景
 *  - 结合闭包进行封装
 *  - 给全局变量设置别名
 *  - 安全的变量作用域,外界无法访问
 *  - 循环执行异步任务的场景
 */

test3()

function test1() {
    const user = (function(){
        let name = 'foo'
        return {
            getName: () => name,
            setName: (val) => name = val,
        }
    })()
    console.log(user.getName())
    console.log(user.setName('bar'))
    console.log(user.getName())
}

// 给全局变量设置别名
function test2() {
    (function($){
        // 使用 $ 代替 jQuery
    })(jQuery)
}

function test3() {
    (function () {
        var greeting = 'hello'
        console.log(greeting); // hello
    })()
    console.log(greeting) // Error
}

function test4() {
    for (var i = 0; i < 10; i++) {
        (function(i){
            setTimeout(() => console.log(i), 1000)
        })(i)
    }
}
