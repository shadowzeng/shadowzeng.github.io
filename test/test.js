function Animal(){
    this.species = "动物";
}
function Cat(name,color){
    this.name = name;
    this.color = color;
}

Cat.prototype = new Animal();
var cat1 = new Cat("大毛","黄色");
debugger
Cat.prototype.constructor = Cat;
debugger
var cat2 = new Cat("大毛","黄色");
debugger
/*
ChildClass = RootClass.extend({
    constructor: ChildClass,
    init:function(){}
});

function enableClassExtend(RootClass){
    RootClass.$constructor = RootClass;
    RootClass.extend = function(proto){

        var ExtendedClass = function(){
            if (!proto.$constructor) {
                superClass.apply(this, arguments);
            }
            else {
                proto.$constructor.apply(this, arguments);
            }
        };

        attextend(ExtendedClass.prototype,proto);

        ExtendedClass.extend = this.extend;
        ExtendedClass.superCall = superCall;
        ExtendedClass.superApply = superApply;
        zrUtil.inherits(ExtendedClass, this);
        ExtendedClass.superClass = superClass;

        ExtendedClass.prototype = this.prototype;
        proto

    }
}

function attextend(target, source) {
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            target[key] = source[key];
        }
    }
    return target;
}*/