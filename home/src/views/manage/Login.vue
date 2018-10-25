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
  //import axios from '../../utils/axios'

  export default {
    data() {
      return {
        username:'zeng',
        password:'123'
      }
    },
    methods: {
      login: function(){
        // axios.get('/login',{params:{username,password:password}}).then(res => {
        //   debugger
        // });
        debugger
        if (this.username=='zeng'&&this.password=="123") {
          this.$router.push({
            path: '/manage'
          });
        }
      }
    }
  }
</script>