function enableClassExtend(clazz) {
    
    clazz.extend = function (proto) {
        var ExtendedClass = function(){};

        var F = function(){};

        F.prototype = this.prototype;
        ExtendedClass.prototype = new F();
        ExtendedClass.prototype.constructor = ExtendedClass;

        for (var key in proto) {
            ExtendedClass.prototype[key] = proto[key];
        }

        return ExtendedClass;
    }
}

function Parent() {

}

Parent.prototype = {
    a:1,
    b:true,
    c:function(){
        return 'hello';
    }
};

enableClassExtend(Parent);

var Child = Parent.extend({
    e: 3
});
debugger
var c = new Child();
debugger