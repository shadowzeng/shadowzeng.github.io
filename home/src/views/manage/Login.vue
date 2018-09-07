<template>
  <div>
    <h3>用户名</h3>
    <input type="text" v-model="username"/>
    <h3>密码</h3>
    <input type="text" v-model="password"/>
    <button @click="login">登录</button>
  </div>
</template>

<script>
  import axios from '../../utils/axios'

  export default {
    data() {
      return {
        username:'22',
        password:'22'
      }
    },
    methods: {
      login: function(){
        axios.get('/login',{params:{username,password:password}}).then(res => {
          debugger
        });
      }
    }
  }
</script>