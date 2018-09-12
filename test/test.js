function makeClosures(arr, fn) {
    var fnArr = [];
      
    for (var i = 0; i < arr.length; i++){
        var e = arr[i];
        fnArr.push((function(x){
            return function(){
                return fn(x);
            };
        })(e));
    }
      
    return fnArr;
}
var tt = function(x){
    return x*x;
}

var res = makeClosures([1,2,3],tt);

var f1 = res[1]();
debugger