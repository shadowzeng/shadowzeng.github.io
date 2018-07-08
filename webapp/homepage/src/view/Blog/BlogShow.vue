<template>
  <div class="blog-show">
      <div class="blog-header">
        <p @click="read(data.id)">{{data.title}}</p>
        <span>{{data.date}}</span>
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