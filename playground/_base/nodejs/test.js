console.log('111')
setTimeout(() => {
    console.log('222')
}, 0)
process.nextTick(() => {
    console.log('333')
})
setImmediate(() => {
    console.log('immediate')
})
new Promise((resolve) => {
    console.log('444')
    resolve()
}).then(() => {
    console.log('555')
})
