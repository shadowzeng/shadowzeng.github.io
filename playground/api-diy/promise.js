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
    this.error = null
    function resolve(result) {
        this.state = 'fulfilled'
        this.result = result
    }
    function reject(error) {
        this.state = 'rejected'
        this.error = error
    }
    taskFn(resolve.bind(this), reject.bind(this))
}

MyPromise.prototype.then = function(fulfilledCallback, rejectedCallback) {
    this.fulfilledCallback = fulfilledCallback
    this.rejectedCallback = rejectedCallback
    if (this.state === 'fulfilled')
        fulfilledCallback(this.result)
    if (this.state === 'rejected')
        rejectedCallback(this.error)
}

MyPromise.prototype.catch = function(rejectedCallback) {
    this.rejectedCallback = rejectedCallback
}

new MyPromise((resolve, reject) => {
    console.log('task running')
    resolve('error message')
}).then(result => {
    console.log('result===========')
    console.log(result)
}, error => {
    console.log('error===========')
    console.log(error)
})