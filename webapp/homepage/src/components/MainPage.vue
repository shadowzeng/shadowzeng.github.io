<template>
  <div class="main">
    <a class="avatar" href="/">
      <img src="../assets/avatar.jpg">
    </a>
    <h2>Dear Rebecca</h2>
    <h3>吴雨桐</h3>
    <hr>
    <nav class="nav">
      <ul>
        <li class="item"><router-link to="/">首页</router-link></li>
        <li class="item"><router-link to="/blog">文章</router-link></li>
        <li class="item"><router-link to="/project">项目</router-link></li>
        <li class="item"><router-link to="/about">关于</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 150px;
}
img {
  width: 100px;
  border-radius: 50%;
  box-shadow: 1px 2px 8px -2px grey;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
}
li:after {
  content: '|';
  font-size: 12px;
  color: #ccc;
  width: 20px;
  display: inline-block;
}
li:last-of-type:after {
  content: '';
  width: 0;
}
a {
  font-size: 13px;
  text-decoration: none;
  color: #6b6882;
  transition: all 0.4s;
}
hr {
  max-width: 400px;
  width: 40%;
  height: 1px;
  border: none;
  background-image: -webkit-linear-gradient(0deg, transparent, #d5d5d5, transparent);
}
</style>
