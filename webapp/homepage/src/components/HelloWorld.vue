<template>
  <div class="hello">
    <h2>Dear Rebecca</h2>
    <h3>吴雨桐</h3>
    <hr>
    <div class="nav">
      <ul>
        <li class="item"><a href="">首页</a></li>
        <li class="item"><a href="">文章</a></li>
        <li class="item"><a href="">项目</a></li>
        <li class="item"><a href="">更多</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
