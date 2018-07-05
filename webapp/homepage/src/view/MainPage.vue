<template>
  <div class="main">
    <a class="avatar" href="/">
      <img src="../assets/avatar.jpg">
    </a>
    <h2>{{English_Name}}</h2>
    <h3>{{Chinese_Name}}</h3>
    <hr>
    <MainNav></MainNav>
  </div>
</template>

<script>
import MainNav from './common/MainNav'
export default {
  name: 'MainPage',
  data () {
    return {
      English_Name: 'Dear Rebecca',
      Chinese_Name: '吴雨桐'
    }
  },
  components: {
    MainNav
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

hr {
  max-width: 400px;
  width: 40%;
  height: 1px;
  border: none;
  background-image: -webkit-linear-gradient(0deg, transparent, #d5d5d5, transparent);
}
</style>
