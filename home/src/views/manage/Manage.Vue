<template>
    <div class="blog-manage">
      <div class="manage-header"><span>文章管理</span></div>
      <div class="manage-side">
          <ul>
              <li v-for="item in opers" v-bind:key="item.id">
                  <router-link :to="item.value">{{item.name}}</router-link></li>
          </ul>
      </div>
      <div class="manage-main">
          <router-view></router-view>
      </div>
    </div>
</template>

<script>

export default {
    data(){
        return {
            opers: [
                {id:1,name:'新建',value:'/manage/newblog'},
                {id:2,name:'修改',value:'/manage/modblog'}
            ]
        }
    },
    methods: {
        save: function(){
            debugger
            console.log(this.mdContent);
        },
        test: function(){
            this.$data.message = 'zengk';
        }
    }
}
</script>

<style lang="">
  .manage-header {
      height: 30px;
      background: grey;
  }
  .manage-side {
      width: 100px;
      background: green;
      float: left;
  }
  .manage-btn {
      display: block;
  }
  .manage-main {
      margin-left: 100px;
      padding: 20px;
  }
</style>