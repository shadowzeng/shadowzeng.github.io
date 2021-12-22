const co = require('co')

const readFile = name => {
    return new Promise(resolve => {
        console.log('read')
        setTimeout(() => resolve(name), Math.random() * 1000)
    })
}
const gen = function* () {
    const f1 = yield readFile('file1')
    const f2 = yield readFile('file2')
    // console.log(f1)
    // console.log(f2)
    return 'test'
}

co(gen).then(r => console.log(r))
