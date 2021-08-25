/**
 * new Promise((resolve, reject) => {
 *
 * })
 * .then((result, error) => {})
 * .cacth(error => {})
 *
 * new Promise((resolve, reject) => {
 *     resolve('yyy')
 *     throw new Error('dsf')
 *     // console.log('xxx')
 * }).then((res) => {
 *     throw new Error('xxx')
 *     console.log(res)
 *     // return 'ooo'
 * }, err => {
 *     console.log('ttttttt')
 *     console.log(err)
 * })
 * // .then(res => {
 * //     console.log(res)
 * // })
 * // .catch(error => {
 * //     console.log('ccccccc')
 * //     console.log(error)
 * // })
 *
 * https://medium.com/swlh/implement-a-simple-promise-in-javascript-20c9705f197a
 */
function MyPromise(taskFn) {
    this.state = 'pending'
    this.fulfilledCallback = null
    this.rejectedCallback = null
    this.result = null

    const resolve = (result) => {
        if (this.state !== 'pending')
            return
        this.state = 'fulfilled'
        this.result = result
        this.fulfilledCallback && this.fulfilledCallback(result)
    }
    const reject = (result) => {
        if (this.state !== 'pending')
            return
        this.state = 'rejected'
        this.result = result
        this.rejectedCallback && this.rejectedCallback(result)
    }
    try {
        taskFn(resolve, reject)
    } catch(error) {
        reject(error)
    }
}

MyPromise.prototype.then = function(fulfilledCallback, rejectedCallback) {
    this.fulfilledCallback = fulfilledCallback
    this.rejectedCallback = rejectedCallback
    if (this.state === 'fulfilled')
        fulfilledCallback(this.result)
    if (this.state === 'rejected')
        rejectedCallback(this.result)
}

MyPromise.prototype.catch = function(rejectedCallback) {
    // this.rejectedCallback = rejectedCallback
    if (this.state === 'rejected')
        rejectedCallback(this.result)
}

const promise = new MyPromise((resolve, reject) => {
    console.log('task running')
    // throw new Error('error message')
    // resolve('resolved message')
    // reject('rejected message')
    setTimeout(() => {
        resolve('oooooo')
    }, 1000)
})

promise.then(result => {
    console.log('resolve callback===========')
    console.log(result)
}, error => {
    console.log('reject callback===========')
    console.log(error)
})
// .catch(error => {
//     console.log('catch callback===========')
//     console.log(error)
// })
