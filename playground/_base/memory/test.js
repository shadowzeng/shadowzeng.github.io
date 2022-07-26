/**
 * 使用 heapdump 在代码执行开始和结束时记录内存快照，生成两个快照文件，
 * 比较前后两个文件大小来判断有没有内存泄漏
 */
const heapdump = require('heapdump');
heapdump.writeSnapshot('start.heapsnapshot');
let foo = null;
function outer() {
    {
        let bar = foo;
        function unused() { // 未使用到的函数
            console.log(`bar is ${bar}`);
        }
    }

    console.log(unused)
    foo = { // 给foo变量重新赋值
        bigData: new Array(100000).join("this_is_a_big_data"), // 如果这个对象携带的数据非常大，将会造成非常大的内存泄漏
        inner: function() {
            console.log(`inner method run`);
        }
    }
}
for(let i = 0; i < 1000; i++) {
    outer();
}
heapdump.writeSnapshot('end.heapsnapshot');