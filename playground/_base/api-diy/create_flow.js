/*
 * delay = (time) => {
 *     return new Promise((resolve) => {
 *         setTimeout(resolve, time)
 *     })
 * }
 * createFlow([
 *   () => console.log('a')
 *   () => console.log('b')
 *   () => delay(1000).then(() => console.log('c'))
 *   () => console.log('d')
 * ]).run(() => {
 *     console.log('e')
 * })
 * 输出 a b 隔一秒 c d 最后 e
 */

class Flow {
    constructor(taskList, concurrency) {
        this.taskList = taskList
        this.concurrency = concurrency
        this.finshed = 0
        this.taskQueue = []
    }

    add(task) {
        this.taskQueue.push(task)
    }

    runTask() {
        const task = this.taskQueue.shift()
        if (this.finshed === this.taskList.length) {
            this.callback && this.callback()
        }
        if (!task)
            return
        const taskRun = task()
        if (taskRun instanceof Promise) {
            taskRun.then(() => {
                this.finshed ++
                this.runTask()
            })
        } else {
            this.finshed ++ 
            this.runTask()
        }
    }

    run(callback) {
        this.callback = callback
        this.taskList.forEach(task => {
            this.taskQueue.push(task)
        })
        this.runTask()
    }
}

function createFlow(taskList) {
    const flow = new Flow(taskList)
    return flow
}

delay = (time) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}
createFlow([
  () => delay(2000).then(() => console.log('yy')),
  () => console.log('a'),
  () => delay(2000).then(() => console.log('xx')),
  () => console.log('b'),
  () => delay(1000).then(() => console.log('c')),
  () => console.log('d'),
]).run(() => {
    console.log('e')
})