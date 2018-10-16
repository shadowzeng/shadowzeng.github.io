function print1() {
    for (var i = 0; i < 5; i++) {
        setTimeout(function(){
            console.log(i);
        },100);
    }
}

function print2() {
    for (var i = 0; i < 5; i++) {
        setTimeout((function(a){
            return function() {
                console.log(a);
            }
        })(i),100);
    }
}

function print3() {
    for (let i = 0; i < 5; i++) {
        setTimeout(function(){
            console.log(i);
        },100);
    }
}

print3();