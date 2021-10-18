test2()

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

