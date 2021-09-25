let a = 3
let result = []
let total = 0
function test() {
    var i = 0
    for(; i < 3; i++) {
        result[i] = function() {
            total += i * a
            console.log(total)
        }
    }    
}
test(1)
result[0]() // 9
result[1]() // 18
result[2]() // 27