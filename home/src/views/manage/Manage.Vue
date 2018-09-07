<template>
    <div class="A">
      <div class="P"></div>

      <!--
      <textarea name="" id="" rows="10" v-model="mdContent"></textarea>
      <button v-on:click="save()">保存</button>
      <div>{{message}}</div>
      <button @click="test()">test</button>  -->
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

<style lang="">
  .A {
    width:500px;
    height: 300px;
    border: 2px solid black;
  
    left:30px;
    top:30px;

  }
  .P {
    width: 80px;
    height: 50px;
    background: green;

    margin: auto 0;
    top: 0;
    bottom: 0;
  }

</style>