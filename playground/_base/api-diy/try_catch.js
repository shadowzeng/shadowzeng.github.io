test2()

/**
 * try catch无法捕获到其中 Promise 的异常
 */
function test1() {
    try {
        new Promise(() => {
            throw new Error('err')
        })
    } catch(e) {
        console.log('xxxxxxxxxxxxxx') // 不会输出
        console.log(e)
    }
}

/**
 * try catch 配合使用 await 可以捕获到
 */
async function test2() {
    try {
        await new Promise(() => {
            throw new Error('err')
        })
    } catch(e) {
        console.log('xxxxxxxxxxxxxx')
        console.log(e)
    }
}
