/**
 * 链式调用, 延迟执行
 */
class Chain {
    constructor() {
        this.running = false
        this.tasks = []
    }
    runTask() {
        if (this.running)
            return
        if (this.tasks.length === 0)
            return
        const task = this.tasks.shift()
        this.running = true
        task().then(() => {
            this.running = false
            this.runTask()
        })
    }
    eat() {
        const task = () => {
            return new Promise((resolve) => {
                console.log('eat')
                resolve()
            })
        }
        this.tasks.push(task)
        this.runTask()
        return this
    }
    work() {
        const task = () => {
            return new Promise((resolve) => {
                console.log('work')
                resolve()
            })
        }
        this.tasks.push(task)
        this.runTask()
        return this
    }
    sleep(time) {
        const task = () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve()
                }, time)
            })
        }
        this.tasks.push(task)
        this.runTask()
        return this
    }
}

console.log('---')
// new Chain().sleep(1000).eat().work().sleep(2000).eat().sleep(1000).eat()
// new Chain().eat().eat().work().work()
new Chain().sleep(1000).sleep(2000)
