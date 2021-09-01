/**
 *
 */
class Chain {
    constructor() {
        this.running = false
        this.tasks = []
    }
    runTask() {
        const task = this.tasks.shift()
        if (!task || this.running)
            return
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

new Chain().eat().work().sleep(3000).eat().eat()
