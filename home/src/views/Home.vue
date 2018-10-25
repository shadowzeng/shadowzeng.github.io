<template>
  <div class="main">
    <a class="avatar" href="/">
      <img src="../assets/avatar.jpg">
    </a>
    <h2 class="en-name" @click="manager">{{English_Name}}</h2>
    <h3 class="ch-name">{{Chinese_Name}}</h3>
    <hr class="home-hr">
    <main-nav :navItems="mainNavData"></main-nav>
  </div>
</template>

<script>
import MainNav from '@/components/nav/MainNav'
import {mapState} from 'vuex'

export default {
  name: 'Home',
  components: { MainNav },
  computed: {
    ...mapState([
      'mainNavData'
    ])
  },
  data () {
    return {
      English_Name: '_shadowzeng',
      Chinese_Name: '梧桐'
    }
  },
  methods: {
    manager: function() {
      debugger
      this.$router.push({
        path: '/login'
      });
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
.en-name {
  margin-top:15px;
  margin-bottom:15px;
}
.ch-name {
  margin-top:14px;
  margin-bottom:14px;
}
.home-hr {
  max-width: 400px;
  width: 40%;
  height: 1px;
  border: none;
  background-image: -webkit-linear-gradient(0deg, transparent, #d5d5d5, transparent);
  margin:auto;
  margin-bottom:10px
}
</style>
