<template>
  <div class="blog-show">
      <div class="blog-header">
        <p class="blog-title" @click="read(data.id)">{{data.title}}</p>
        <span class="blog-date">{{data.date}}</span>
      </div>
  </div>
</template>

<script>
export default {
  props:['data','index'],
  data(){
    return {

    }
  },
  methods:{
    read:function(id){
      this.$router.push({
        path: 'readBlog',
        query:{
          id:id
        }
      })
    }
  }
}
</script>

<style>
  .blog-title {
    display:inline;
    cursor:pointer;
  }
  .blog-date {
    float:right;
  }
</style>