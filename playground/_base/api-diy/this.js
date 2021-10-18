var test = {
    name: 'test object',
    createFoo: function() {
        return function() {
            console.log(this)
            console.log(arguments)
        }
    },
    createBar: function() {
        return () => {
            console.log(this)
            console.log(arguments)
        }
    }
}

var foo = test.createFoo('a', 'b')
var bar = test.createBar('x', 'y')
foo()  // this为全局对象, arguments对象为空
bar()  // this为test对象, arguments为 { '0': 'x', '1': 'y' }
