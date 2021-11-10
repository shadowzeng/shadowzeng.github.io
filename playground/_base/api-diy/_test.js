// 'use strict'
console.log(foo)
let age = Math.random()

if (age > 0.5) {
    function foo() {
        console.log('111')
    }
} else {
    function foo() {
        console.log('222')
    }
}

foo()