test1()

function test1() {
    const task = (time, order) => {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log(order)
                resolve()
            }, time)
        })
    }

    // 不能保证输出是 0 1 2 顺序
    function useForEach() {
        Array.from(Array(3).keys()).forEach(async(index) => {
            await task(Math.random() * 1000, index)
        })
    }

    // 可以保证是 0 1 2 顺序
    async function useForLoop() {
        for (let i = 0; i < 3; i++) {
            await task(Math.random() * 1000, i)
        }
    }

    useForLoop()
}
