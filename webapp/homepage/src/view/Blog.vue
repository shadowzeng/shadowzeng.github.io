<template>
  <div>
    <div class="navi">
      <MainNav/>
    </div>
    <hr>
    <div class="blog-list">
      <ul>
        <li><router-link to="/blog/test1">测试文章1</router-link></li>
        <li><router-link to="/blog/test2">测试文章2</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
import MainNav from './common/MainNav'
export default {
    name: 'Blog',
    components:{
      MainNav
    }
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