<template>
  <div class="blog-list">
    <BlogShow :data="el" :index="index" :key="index" v-for="el,index in articleList" v-if="showLoad"></BlogShow>
    <div class="blog-page" v-if="showLoad&&articleList.length>0">
      <Page :total="total" placement="top" :page-size="pageSize" :current="current" show-total @on-change="change" @on-page-size-change="sizeChange"></Page>
    </div>
  </div>
</template>

<script>
import BlogShow from './BlogShow.vue'
import axios from 'axios'
import {mapState,mapMutations} from 'vuex'

export default {
  components: {
    BlogShow
  },
  computed: mapState(['articleList', 'labels','total']),
  data() {
    return {
      showIndex: 1,
      current: 1,
      pageSize: 15,
      showLoad: false
      // ,
      // articleList:[
      //   {
      //     title:"xxx",
      //     date:'xxxxx',
      //     content:"yyy"
      //   }
      // ]
    }
  },
  async mounted() {debugger
      //存一下数据，重复切换免去不停请求初始页面数据
      //同时成立原因，有可能在标签页刷新页面，再进入最新文章就没有文章列表数据
      //所以同时成立
      if (this.articleList && this.labels) {
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
      }
  },
  methods: {
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
        }
    }
}
</script>