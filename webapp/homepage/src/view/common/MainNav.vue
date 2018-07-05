<template>
  <div class="main-nav">
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

<style>
.nav {
  text-align: center;
}
.nav ul {
  list-style-type: none;
  padding: 0;
}
.nav ul li {
  display: inline-block;
}
.nav li:after {
  content: '|';
  font-size: 12px;
  color: #ccc;
  width: 20px;
  display: inline-block;
}
.nav li:last-of-type:after {
  content: '';
  width: 0;
}
.nav a {
  font-size: 13px;
  text-decoration: none;
  color: #6b6882;
  transition: all 0.4s;
}
</style>