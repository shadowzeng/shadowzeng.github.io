function Foo() {
    getName = function() {
        console.log(1)
    }
    return this
}

Foo.getName = function() {
    console.log(2)
}

Foo.prototype.getName = function() {
    console.log(3)
}

getName = function() {
    console.log(4)
}

function getName() {
    console.log(5)
}

Foo.getName()
getName()
Foo().getName()
getName()
Foo.getName()
new Foo().getName()