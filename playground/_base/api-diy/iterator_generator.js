test3()

function test1() {
    function *createIterator() {
        yield 'x'
        yield 'y'
        return 'z'
        yield 'o'
    }

    var g = createIterator()
    console.log([...g]) // ['x', 'y']
}

function test2() {
    function* fibs(n) {
        var a = 0
        var b = 1
        for (let i = 0; i < n; i++) {
            yield a;
            [a, b] = [b, a + b]
        }
    }
    console.log([...fibs(10)])
}


function test3() {
    const readFile = name => {
        return new Promise(resolve => {
            setTimeout(() => resolve(name), Math.random() * 1000)
        })
    }
    const gen = function* () {
        const f1 = yield readFile('file1')
        const f2 = yield readFile('file2')
        console.log(f1)
        console.log(f2)
    }

    const g = gen()
    g.next().value.then(f1 => {
        g.next(f1).value.then(f2 => {
            g.next(f2)
        })
    })
}
