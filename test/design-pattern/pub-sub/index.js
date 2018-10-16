// var puber = {   // 发布者
//     handlerMap:{},   // 消息类型与消息处理的映射，多个订阅者可监听同一个消息，绑定消息处理回调
//     on:function(type,handler){  // 订阅者通过该函数注册监听消息
//         if (!this.handlerMap[type]){
//             this.handlerMap[type] = [];
//         }
//         this.handlerMap[type].push(handler);
//     },
//     trigger:function(type){  // 发布（触发）消息，会通知所有订阅了该消息的订阅者，即触发回调
//         // Array.prototype.shift.call(arguments)  // 可通过取出第一个参数作为type
//         var handlerList = this.handlerMap[type];
//         if (handlerList&&handlerList.length){
//             for (var i = 0; i < handlerList.length; i++){
//                 handlerList[i].apply(this,arguments);
//             }
//             // handlerList.forEach(function(handler) {
//             //     handler();
//             // });
//         }
//     }
// };
// debugger
// puber.on('A',function(type,name){
//     console.log(name);
// });
// puber.on('B',function(type,name){
//     console.log(name);
// });

// puber.trigger('A','zengk');
// puber.trigger('B','reb');
//////////////////////////////////////////////////////////////////////////////////

function Puber(){
    this.handlerMap = {};
}

Puber.prototype = {
    on:function(type,handler){  // 订阅者通过该函数注册监听消息
        if (!this.handlerMap[type]){
            this.handlerMap[type] = [];
        }
        this.handlerMap[type].push(handler);
    },
    trigger:function(type){  // 发布（触发）消息，会通知所有订阅了该消息的订阅者，即触发回调
        // Array.prototype.shift.call(arguments)  // 可通过取出第一个参数作为type
        var handlerList = this.handlerMap[type];
        if (handlerList&&handlerList.length){
            for (var i = 0; i < handlerList.length; i++){
                handlerList[i].apply(this,arguments);
            }
            // handlerList.forEach(function(handler) {
            //     handler();
            // });
        }
    }
}

var puber = new Puber();
puber.on('A',function(type,name){
    console.log(name);
});
puber.on('B',function(type,name){
    console.log(name);
});

puber.trigger('A','zengka');
puber.trigger('B','reb');