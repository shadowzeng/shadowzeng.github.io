test1()

function test1() {
    new Promise((resolve, reject) => {
        resolve('success')
    })
    .then(val => {
        console.log(val)
        throw new Error('no')
    })
    .catch(e => {
        console.log(e)
        return 'catch'
    })
    .then(val => {
        console.log(val)
    })
    .catch(e => {
        console.log(e)
        return 'catch1'
    })
    .finally(() => {
        console.log('finally')
    })
    .then(() => {
        console.log('finally then')
    })
    .finally(() => {
        console.log('finally')
    })
}
