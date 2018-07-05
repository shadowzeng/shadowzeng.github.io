<template>
  <div>
    <div class="navi">
      <nav class="nav">
        <ul>
          <li class="item"><router-link to="/">首页</router-link></li>
          <li class="item"><router-link to="/blog">文章</router-link></li>
          <li class="item"><router-link to="/project">项目</router-link></li>
          <li class="item"><router-link to="/about">关于</router-link></li>
        </ul>
      </nav>
    </div>
    <hr>
    <div class="blog-list">
      <ul>
        <li><router-link to="/blog/test1">测试文章1</router-link></li>
        <li><router-link to="/blog/test2">测试文章2</router-link></li>
      </ul>
    </div>
    <div class="blog-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Blog'
}
</script>

<style>
.navi {
  margin-top:150px;
}

hr {
  max-width: 400px;
  width: 40%;
  height: 1px;
  border: none;
  background-image: -webkit-linear-gradient(0deg, transparent, #d5d5d5, transparent);
}
.blog-list {
    width:300px;
    margin:auto;
}
.blog-list ul {
    padding:0;
}
.blog-list ul li {
  list-style-type: none;
  padding: 5px;
}
.blog-list a {
  font-size: 14px;
  text-decoration: none;
  color: #6b6882;
  transition: all 0.4s;
}
</style>