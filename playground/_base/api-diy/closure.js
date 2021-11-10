test6()

function test1() {
    function count() {
        for (var i = 0; i < 5; i++) {
            setTimeout(() => console.log(i), 1000)
        }
    }
    count()
}

// 使用IIFE, 能保存函数执行时的上下文变量, 后面setTimeout回调执行时能获取到当时保存的变量
function test2() {
    function count() {
        for (var i = 0; i < 5; i++) {
            (function(i){
                setTimeout(() => console.log(i), 1000)
            })(i)
        }
    }
    count()
}

function test3() {
    function count() {
        for (var i = 0; i < 5; i++) {
            (function(){
                var ii = i
                setTimeout(() => console.log(ii), 1000)
            })()
        }
    }
    count()
}

// 利用setTimeout的第三个参数
function test4() {
    function count() {
        for (var i = 0; i < 5; i++) {
            setTimeout(i => console.log(i), 1000, i)
        }
    }
    count()
}

function test5() {
    function foo() {
        let a = []
        return function() {
            a.push(1)
            console.log(a)
        }
    }
    // 不同的两个独立闭包环境
    foo()() // [1]
    foo()() // [1]

    var bar = foo()
    // 同一个闭包函数
    bar() // [1]
    bar() // [1, 1]
}

function test6() {
    let a = 3
    let result = []
    let total = 0
    function test(a) {
        var i = 0;
        for(; i < 3; i++) {
            result[i] = function() {
              total += i * a
              console.log(total)
            }
        }
    }
    test(1)
    result[0]()
    result[1]()
    result[2]()
    // 输出 3 6 9
}