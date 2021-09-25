/**
 * 有一个reject了, 那么整个都reject
 * 所有的promise都resolve, 最终才resolve
 */
function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        let num = 0
        let result = []
        promises.forEach((promise, index) => {
            promise.then(res => {
                num ++
                result[index] = res
                if (num === promises.length)
                    resolve(result)
            }).catch(error => {
                reject(error)
            })
        })
    })
}


/**
 * 有一个resolve了, 那么整个就resolve
 * 所有的promise都reject, 那么整个就会reject
 */
function promiseAny(...promises) {

}


// const promiseList = [
//     new Promise((s,e) => {
//         setTimeout(() => {
//             console.log('1')
//             s(1)
//         }, 2000)
//     }),
//     new Promise((s,e) => {
//         setTimeout(() => {
//             console.log('2')
//             e(2)
//         }, 1000)
//     }),
//     new Promise((s,e) => {
//         setTimeout(() => {
//             console.log('3')
//             s(3)
//         }, 3000)
//     })
// ]
// promiseAll(promiseList).then(result => {
//     console.log('======= result ===========')
//     console.log(result)
// }).catch(error => {
//     console.log('======= error ===========')
//     console.log(error)
// })
new Promise((r,e) => {
 e(1)
})
// .then(r => {console.log('success'); return 3})
// .catch(r => {console.log('error'); return '2'})
.finally(r => console.log(r))
// .then(r => {console.log('success'); return 1})
// .then(r => {console.log(r); return 1})
.catch(r => console.log('error'))
Promise.resolve()