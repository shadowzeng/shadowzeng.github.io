<template>
    <div>
        <textarea name="" id="" rows="10" v-model="mdContent"></textarea>
        <button v-on:click="save()">保存</button>
        <div>{{message}}</div>
        <button @click="test()">test</button>
    </div>
</template>

<script>

export default {
    data(){
        return {
            mdContent: '',
            message: 'hello'
        }
    },
    methods: {
        save: function(){
            debugger
            console.log(this.mdContent);
        },
        test: function(){
            this.$data.message = 'zengk';
        }
    }
}
</script>