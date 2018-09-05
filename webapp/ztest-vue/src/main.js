// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
debugger

Vue.component('todo-item',{
  template: '<li>待办项</li>'
});

new Vue({
  el: '#app',
  // data: {
  //   ttt:2,
  //   cc:{text:'x'},
  //   zengk:[11,22,33]
  // },
  // methods: {
  //   test: function(){
  //     debugger
  //     this.ttt = 4;
  //     this.zengk.splice(1,1,99);
  //   }
  // }
  //router,
  //components: { App },
  //template: '<App/>'
})
