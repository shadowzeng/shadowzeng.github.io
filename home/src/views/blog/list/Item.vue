<template>
  <div class="blog-item">
    <div class="item-content">
      <a class="item-content-title" @click="readBlog(blogItem.blogUid)">{{blogItem.blogTitle}}</a>
      <Label v-for="label in blogItem.labels" v-bind:labelText="label.labelText" :key="label.labelId"></Label>
    </div>
  </div>
</template>

<script>
  import Label from '@/views/common/Label'
  //import axios from '../../utils/axios'

  export default {
    name:'BlogItem',
    components: {Label},
    props: ['blogItem'],
    methods: {
      readBlog: function(id){
        this.$router.push({
          path: '/blog/read',
          query: {
            id
          }
        })
      }
    }
  }
</script>

<style>
  .blog-item {
    margin-top: 10px;
  }
  .item-content:before {
    content: "";
    width: 10px;
    height: 10px;
    background: black;
    display:inline-block;
    border-radius: 50%;
  }
  .item-content-title {
    padding-left: 1em;
    font-family: SimSun;
    text-decoration: none;
    color: #6b6882;
    transition: all 0.4s;
  }
</style>