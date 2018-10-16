function Model(option,parentModel,ecModel){
    this.parentModel = parentModel;
    this.ecModel = ecModel;
    this.option = option;
}

var GlobalModel = Model.extend({
    constructor: GlobalModel,
    init: function(option, parentModel, theme, optionManager){
        this.option = null;
        this._theme = new Model(theme);
        this._optionManager = optionManager;
    },
    setOption: function(option){
        this._optionManager.setOption(option);
    }
});

Model.prototype = {
    constructor: Model,
    init: null,
    mergeOption: function (option) {
        zrUtil.merge(this.option, option, true);
    }
}

// echarts src/util/clazz.js
function enableClassExtend(RootClass){
    RootClass.$constructor = RootClass;
    RootClass.extend = function(proto){
        var superClass = this;
        var ExtendedClass = function(){
            if (!proto.$constructor) {
                superClass.apply(this, arguments);
            }
            else {
                proto.$constructor.apply(this, arguments);
            }
        };

        zrUtil.extend(ExtendedClass.prototype, proto);

        ExtendedClass.extend = this.extend;
        ExtendedClass.superCall = superCall;
        ExtendedClass.superApply = superApply;
        zrUtil.inherits(ExtendedClass, this);
        ExtendedClass.superClass = superClass;

        return ExtendedClass;
    }
}
function superCall(context, methodName) {
    var args = zrUtil.slice(arguments, 2);
    return this.superClass.prototype[methodName].apply(context, args);
}

function superApply(context, methodName, args) {
    return this.superClass.prototype[methodName].apply(context, args);
}

// zrender
var zrUtil = function(){
    var arrayProto = Array.prototype;
    var nativeSlice = arrayProto.slice;

    return {
        extend: function(target, source){
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    target[key] = source[key];
                }
            }
            return target;
        },
        inherits: function(clazz, baseClazz){
            var clazzPrototype = clazz.prototype;
            function F() {}
            F.prototype = baseClazz.prototype;
            clazz.prototype = new F();

            for (var prop in clazzPrototype) {
                clazz.prototype[prop] = clazzPrototype[prop];
            }
            clazz.prototype.constructor = clazz;
            clazz.superClass = baseClazz;
        },
        mixin: function(target, source, overlay){
            target = 'prototype' in target ? target.prototype : target;
            source = 'prototype' in source ? source.prototype : source;

            defaults(target, source, overlay);
        },
        defaults: function(target, source, overlay){
            for (var key in source) {
                if (source.hasOwnProperty(key)
                    && (overlay ? source[key] != null : target[key] == null)
                ) {
                    target[key] = source[key];
                }
            }
            return target;
        },
        slice: function(){
            return Function.call.apply(nativeSlice, arguments);
        }
    }
}