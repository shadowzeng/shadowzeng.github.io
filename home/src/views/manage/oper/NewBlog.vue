<template>
    <div class="manage-newblog">
        <div class="newblog-title">
            <label>文章标题</label>
            <input class="title" v-model="blogInfo.title" />
        </div>
        <div class="newblog-label">
            <label>标签</label>
            <input />
        </div>
        <div class="newblog-content">
            <label>内容</label>
            <textarea class="content" v-model="blogInfo.content" />
        </div>
        <div class="newblog-handle">
          <input @click="save()" type="button" value="保存" />
        </div>
    </div>
</template>

<script>
import axios from 'axios'

const BLOG_SAVE_URL = 'http://localhost:3000/blog/saveBlog'

export default {
  data() {
    return {
      blogInfo:{
        title:'',
        date:'',
        labels:[],
        content:''
      }
    }
  },
  methods: {
    save() {
      this.blogInfo.date = new Date();
      axios.post(BLOG_SAVE_URL,this.blogInfo).then(res => {
        debugger
      });
    }
  }
}
</script>


<style>
  .newblog-content .content {
    width: 30%;
    height: 300px;
  }
</style>
