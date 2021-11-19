const rx = require('rxjs')

const obs = new rx.Observable(sub => {
    sub.next(Math.random())
    setTimeout(() => {
        sub.next('2')
        sub.complete()
    }, 1000)
})

obs.subscribe(val => {
    console.log(val)
})

obs.subscribe(val => {
    console.log(val)
})
