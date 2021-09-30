// let a = 3
// let result = []
// let total = 0
// function test() {
//     var i = 0
//     for(; i < 3; i++) {
//         result[i] = function() {
//             total += i * a
//             console.log(total)
//         }
//     }
// }
// test(1)
// result[0]() // 9
// result[1]() // 18
// result[2]() // 27
// function foo() {
//     console.log(bar)
//     for (var i = 0; i < 5; i++) {
//         var bar = 'test'
//         setTimeout(() => {
//             console.log(i)
//         })
//     }
//     {
//         let test = 'eee'
//         console.log(test)
//     }
// }
// foo()
// console.log(bar)
var a = 'global'
function foo() {
    console.log(a)
    const a = 'local'
}
foo()
