// 'use strict'

function task(result) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(result)
        }, 1000)
    })
}

async function foo() {
    const result = await task('hello')
    console.log(result)
}

async function bar() {
    const result = foo()
    console.log(result)
}
bar()
