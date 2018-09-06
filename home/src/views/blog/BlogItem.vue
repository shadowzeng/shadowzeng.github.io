<template>
  <div class="blog-item">
    <div class="item-content">
      <a class="item-content-title" @click="readBlog(blogItem.blogUid)">{{blogItem.blogTitle}}</a>
      <Label v-for="label in blogItem.labels" v-bind:labelText="label.labelText" :key="label.labelId"></Label>
    </div>
  </div>
</template>

<script>
  import Label from '../common/Label'
  import axios from '../../utils/axios'
  import jsonp from 'jsonp'

  export default {
    components: {Label},
    props: ['blogItem'],
    methods: {
      readBlog: function(id){
        debugger
        // axios.get('http://cdn.bootcss.com/vue/1.0.25/vue.js').then(res=>{
        //   debugger
        // });
        jsonp('http://118.25.41.250:3000/blog/getAll',null,(err,data)=>{
          debugger
        });
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