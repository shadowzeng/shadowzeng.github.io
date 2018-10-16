/**
 * 对象深拷贝
 */

function objClone(target) {
    var cloneObj = null;

    if (Object.prototype.toString.call(target) == '[object Object]') {
        cloneObj = {};
        Object.keys(target).forEach(function(key){
            cloneObj[key] = objClone(target[key]);
        });
    }else if (Object.prototype.toString.call(target) == '[object Array]') {
        cloneObj = Array.prototype.slice.call(target);
    }else {
        cloneObj = target;
    }

    return cloneObj;
}

var a = 1;
debugger
var b = objClone(a);
debugger