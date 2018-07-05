<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
pre {
    overflow: auto;
    padding: 10px 10px;
    background-color: #f6f8fa;
    border-radius: 3px;
}
code {
    line-height: 1;
    font-size: 80%;
    font-family: Consolas,"Liberation Mono",Menlo,Courier,monospace;
}
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
