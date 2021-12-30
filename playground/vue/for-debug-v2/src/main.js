import Vue from 'vue/dist/vue'
// import App from './App.vue'

Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')

// 全局注册的组件,可在模板中直接使用
Vue.component('global-child', {
    template: '<span>{{msg}}</span>',
    data: () => {
        return {msg: 'glob'}
    }
})

// 局部组件, 必须在components中注册才可以使用
var Foo = {
    template: `
    <div>
        <div>{{foo}}</div>
        <div>{{msg}}</div>
        <div>{{formatMsg}}</div>
    </div>
    `,
    props: ['msg'],
    data: () => {
        return {foo: 'foo'}
    },
    computed: { // computed可认为是动态计算的data
        formatMsg() {
            return this.msg.toUpperCase()
        }
    },
    watch: { // 监听特定的props/data/computed，当变化时执行特定逻辑
        msg(newVal, oldVal) {
            console.log(newVal, oldVal)
        }
    }
}

new Vue({
    el: '#root',
    data: {
        title: 'hello',
        message: 'world',
    },
    methods: {
        test: function() {
            this.title = 'ddd'
            this.message = 'aaa'
        }
    },
    components: {
        'foo': Foo,
    }
})
