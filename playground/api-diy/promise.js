/**
 * new Promise((resolve, reject) => {
 * 
 * })
 * .then((result, error) => {})
 * .cacth(error => {})
 */
new Promise((resolve, reject) => {
    // resolve('yyy')
    reject('---')
    // console.log('xxx')
}).then((res, error) => {
    console.log(error)
    // return 'ooo'
})
// .then(res => {
//     console.log(res)
// }).catch(error => {
//     console.log(error)
// })