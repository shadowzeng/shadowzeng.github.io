var name = 'reb';
debugger
function Person(name) {
    this.name = name;
}

Person.prototype = {
    getName: (function(){
        debugger
        this.name = 'zeng';
        return function(){
            debugger
            return this.name;
        };
    })()
}

var person = new Person('xx');
debugger
console.log(person.getName());

debugger