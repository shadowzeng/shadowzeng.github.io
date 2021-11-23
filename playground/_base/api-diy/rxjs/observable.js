/**
 * const ob = new Observable((subscriber) => {
 *  subscriber.next('1')
 *  setTimeout(() => {
 *    subscriber.next('2')
 *    subscriber.complete()
 *  })
 * })
 *
 * ob.subscribe(() => {})
 * ob.subscribe(() => {})
 */
class Observable {
    constructor(taskFn) {
        this.taskFn = taskFn
        this.ops = []
    }

    pipe(...ops) {
        this.ops = ops
    }

    subscribe(nextFn, errorFn, completeFn) {
        const subscriber = {
            next: val => {
                nextFn(val)
            },
            error: val => {
                errorFn(val)
            },
            complete: val => {
                completeFn(val)
            },
        }
        this.taskFn && this.taskFn(subscriber)
    }
}

const ob = new Observable((subscriber) => {
 subscriber.next('1')
 setTimeout(() => {
   subscriber.next('2')
   subscriber.complete()
 }, 1000)
})

ob.subscribe(val => {
    console.log(`next--${val}`)
}, val => {
    console.log(`error--${val}`)
}, val => {
    console.log(`complete--${val}`)
})
