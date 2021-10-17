test1()
/**
 * 浏览器环境输出: timer1, promise1, timer2, promise2
 * node v11输出: timer1, timer2, promise1, promise2
 * node v12中在timer回调执行后会清空promise队列(与浏览器保持一致)
 */
function test1() {
    setTimeout(() => {
        console.log('timer1')
        Promise.resolve().then(() => console.log('promise1'))
    })
    setTimeout(() => {
        console.log('timer2')
        Promise.resolve().then(() => console.log('promise2'))
    })
}

function test2() {
    setTimeout(() => {
        console.log('timer1')
        Promise.resolve().then(() => console.log('promise1'))
        process.nextTick(() => {
            console.log('tick1')
            process.nextTick(() => {
                console.log('tick2')
            })
        })
    })
    setTimeout(() => {
        console.log('timer2')
        Promise.resolve().then(() => console.log('promise2'))
        process.nextTick(() => {
            console.log('tick3')
        })
    })
}
