<template>
  <div class="blog-list">
    <BlogItem v-for="item,index in blogList" :key="index" :blogItem="item"></BlogItem>
  </div>
</template>

<script>
import BlogItem from './BlogItem'
import axios from 'axios'
import {mapState,mapMutations} from 'vuex'

export default {
  components: {BlogItem},
  computed: mapState(['articleList', 'labels','total']),
  data() {
    return {
      showIndex: 1,
      current: 1,
      pageSize: 15,
      showLoad: false,
      blogList:[
        {
          blogUid: 1,
          blogTitle:"测试文章1",
          labels:[{labelId:1,labelText:'javascript'},{labelId:2,labelText:'vue'}],
          date:"2018-09-05 16:06:00"
        },
        {
          blogUid: 2,
          blogTitle:"测试文章2",
          labels:[{labelId:3,labelText:'java'},{labelId:4,labelText:'spring'}],
          date:"2018-09-05 16:06:00"
        },
        {
          blogUid: 3,
          blogTitle:"测试文章3",
          labels:[{labelId:5,labelText:'linux'}],
          date:"2018-09-05 16:06:00"
        },
      ]
    }
  },
  async mounted() {debugger
      //存一下数据，重复切换免去不停请求初始页面数据
      //同时成立原因，有可能在标签页刷新页面，再进入最新文章就没有文章列表数据
      //所以同时成立
      /*
      if (this.articleList) {
          this.showLoad = true
          this.$nextTick(() => {
              //this.initScroll()
              this.loadingClose()
          })
          return false
      } else if (!this.articleList) {
          this.search(async data => {debugger
              this.articleListData(JSON.parse(JSON.stringify(data.data.list)))
              this.totalData(data.data.total)
              this.showLoad = true
              // if (!this.labels) {
              //     let labels = await this.axios.get('/getLabels')
              //     this.lablesData(labels)
              //     this.showLoad = true
              //     this.$nextTick(() => {
              //         //this.initScroll()
              //         this.loadingClose()
              //     })
              // } else {
              //     this.showLoad = true
              //     this.$nextTick(() => {
              //         //this.initScroll()
              //         this.loadingClose()
              //     })
              // }
          })
      } */
  },
  methods: {
        /*
        ...mapMutations(['articleListData', 'lablesData','totalData']),
        change(current) {
            this.current = current
            this.search()
        },
        sizeChange(pageSize) {
            this.pageSize = pageSize
            this.search()
        },
        async search(cb) {debugger
           // this.loading()
            let data = await axios.get('../static/bloglist.json', {
                params: {
                    current: this.current,
                    pageSize: this.pageSize,
                    draft: false
                }
            })
            this.$nextTick(() => {
                //this.initScroll()
                this.loadingClose()
            })
            cb && cb(data)
        } */
    }
}
</script>