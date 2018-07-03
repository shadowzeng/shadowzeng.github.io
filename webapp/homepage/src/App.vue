<template>
  <div id="app">
    <a class="avatar" href="/">
      <img src="./assets/avatar.jpg">
    </a>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 150px;
}
#app a img {
  width: 100px;
  border-radius: 50%;
  box-shadow: 1px 2px 8px -2px grey;
}
</style>
