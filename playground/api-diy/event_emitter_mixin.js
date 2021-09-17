var eventList = Symbol('eventList')
var Event = {
    // list: {},
    on: function(id, callback) {
        if (!this[eventList])
            this[eventList] = {}
        const list = this[eventList]
        const callbacks = list[id]
        if (callbacks) {
            callbacks.push(callback)
            return
        }
        list[id] = [callback]
    },
    emit: function(id, ...args) {
        if (!this[eventList])
            return
        const list = this[eventList]
        const callbacks = list[id]
        if (!callbacks)
            return
        callbacks.forEach(callback => {
            callback(...args)
        })
    }
}

// const event1 = new Event()
Event.on('id', function(result){console.log(result)})
Event.on('id', function(){console.log('message')})
Event.emit('id', 'hello')

var p1 = {}
var p2 = {}
Object.assign(p1, Event)
Object.assign(p2, Event)
p1.on('id1', function(){console.log('p1')})
p2.on('id2', function(){console.log('p2')})
p1.emit('id1')
p1.emit('id2')
p2.emit('id1')
p2.emit('id2')
