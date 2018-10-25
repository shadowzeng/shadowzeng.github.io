<template>
  <div class="sha-main">
    <main-nav :navItems="mainNavData"></main-nav>
   
    <router-view></router-view>
  </div>
</template>

<script>
import MainNav from '@/components/nav/MainNav'
import {mapState} from 'vuex'

export default {
  name: 'MainPage',
  components: {MainNav},
  computed: {
    ...mapState([
      'mainNavData'
    ])
  },
  watch: {
    // $route: {
    //   handler: function(){
    //     debugger
    //     this.$router.push({
    //       path: this.$route.path + '/list'
    //     })
    //   },
    //   immediate: true
    // }
  },
  created() {
    //debugger
  }
}
</script>

