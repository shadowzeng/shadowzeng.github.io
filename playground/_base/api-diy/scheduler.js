/**
 * 模拟fetch请求
 */
const fetch = function(url) {
    return new Promise((resolve, reject) => {
        const time = (Math.random() * 2 + 1) * 1000
        console.log(url + `开始, 执行时间${time/1000}s`)
        setTimeout(() => {
            Math.random() > 0.5 ? resolve(url + '==> success') : reject(url + '==> error')
        }, time)
    })
}

const urlList = ['url-1', 'url-2', 'url-3', 'url-4', 'url-5']

/**
 * 实现批量请求 sendRequest(urls, max, callback)
 *  - 最大并发度 max
 *  - 所有请求结束后,执行callback回调函数传入所有结果
 *  - 这里不要求结果按urls的顺序
 */
function sendRequest(urls, max, callback) {
    const result = []
    const queue = []
    let concurrent = 0
    function run() {
        if (concurrent >= max)
            return
        const task = queue.shift()
        if (!task)
            return
        concurrent ++
        task().then(res => {
            result.push(res)
            concurrent --
            if (result.length === urls.length) {
                callback(result)
                return
            }
            run()
        }).catch(error => {
            result.push(error)
            concurrent --
            if (result.length === urls.length) {
                callback(result)
                return
            }
            run()
        })
    }
    urls.forEach(url => {
        // 注意这里的写法
        queue.push(() => {return fetch(url)})
        run()
    })
}

/**
 * 实现批量请求函数 multiRequest(urls, max)
 *  - 最大并发度 max
 *  - 所有请求完成后,按urls顺序输出
 */
function multiRequest(urls, max, callback) {
    const result = Array(urls.length).fill(false)
    const queue = []
    let concurrent = 0
    function run() {
        if (concurrent >= max)
            return
        const task = queue.shift()
        if (!task)
            return
        concurrent ++
        const index = task.index
        task.runner().then(res => {
            result[index] = res
            concurrent --
            // 注意这里不能再用result.length判断
            if (!result.includes(false)) {
                callback(result)
                return
            }
            run()
        }).catch(error => {
            result[index] = error
            concurrent --
            if (!result.includes(false)) {
                callback(result)
                return
            }
            run()
        })
    }
    urls.forEach((url, index) => {
        // 注意这里的写法
        queue.push({
            index,
            runner: () => {return fetch(url)}
        })
        run()
    })
}

// sendRequest(urlList, 3, (result) => {
//     console.log('==========')
//     console.log(result)
// })

// multiRequest(urlList, 2, (result) => {
//     console.log('==========')
//     console.log(result)
// })

test()

function test() {
    /**
     * 同时发送多个请求，每个请求耗时不同，需要按顺序输出
     * req1: 10ms
     * req2: 5ms
     * 那么输出过程是: 10ms后输出 req1 req2
     * req1: 5ms
     * req2: 10ms
     * 那么输出过程是: 5ms后输出 req1, 再过5ms输出 req2
     */
    function sendRequests(reqs) {
        const tasks = reqs.map(req => {
            return fetch(req.time, req.error)
        })
        tasks.reduce((chain, promise, index) => {
            return chain.then(() => promise)
            .then(data => console.log(data)).catch(err => console.error(err))
        }, Promise.resolve())
    }

    async function sendRequests1(reqs) {
        const tasks = reqs.map(req => {
            return fetch(req.time, req.error)
        })
        for (let i = 0; i < tasks.length; i++) {
            try {
                const res = await tasks[i]
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
    }

    function fetch(time, error = false) {
        return new Promise((resolve, reject) => {
            console.log('send')
            setTimeout(() => {
                if (error)
                    reject('error')
                else
                    resolve(time.toString())
            }, time)
        })
    }
    sendRequests([
        {time: 2000, error: false},
        {time: 4000, error: false},
        {time: 3000, error: true},
        {time: 1000, error: false},
    ])
}


function test4() {
    /**
    * 实现带有并发限制的调度器Scheduler
    */
    class Scheduler {
        constructor(concurrency) {
            this.concurrency = concurrency
            this.runningNum = 0
            this.taskQueue = []
        }

        /**
        * task: () => Promise
        */
        add(task) {
            this.taskQueue.push(task)
            this.runTask()
        }

        runTask() {
            if (this.runningNum >= this.concurrency)
                return
            const task = this.taskQueue.shift()
            if (!task)
                return
            this.runningNum ++
            task().then(() => {
                this.runningNum --
                this.runTask()
            }).catch(() => {
                this.runningNum --
                this.runTask()
            })
        }
    }

    const scheduler = new Scheduler(3)

    const timeout = (time) => new Promise(resolve => {
        setTimeout(resolve, time)
    })
    const addTask = (time, order) => {
        scheduler.add(() => timeout(time).then(() => console.log(order)))
    }
    // 并发数为2时 期待输出 2 3 1 4
    addTask(1000, '1')
    addTask(500, '2')
    addTask(300, '3')
    addTask(400, '4')
}
