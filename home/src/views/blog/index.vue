<template>
  <div class="blog-main">
    <blog-list :listData="listData"></blog-list>
  </div>
</template>

<script>
import BlogList from './list'
import {mapState} from 'vuex'

export default {
  name:'BlogMain',
  components: BlogList,
  data() {
    
  },
  created() {
    debugger
  }
}
</script>

<style scoped>
.blog-main {
  width:300px;
  margin:auto;
}
</style>


