<template>
    <div class="read-article" v-if="article">
        <div class="article-info">
            <h1>{{article.title}}</h1>
            <div class="user">
                <p>By：{{article.author}}</p>
                <p>日期：{{article.date}}</p>
            </div>
            <div class="show-content" v-marked>
{{article.content}}
            </div>
        </div>
    </div>
</template>
<script>
import MainNav from '../common/MainNav'
import axios from 'axios'
import Vue from 'vue'
import Marked from '../../utils/marked'
Vue.use(Marked);
export default {
    data() {
        return {
            article: null,
            loadDone: false
        }
    },
    components:{MainNav},
    mounted() {
        axios.get('../static/testblog.json', {
            params: {
                id: this.$route.query.id
            }
        }).then(res => {
debugger
             this.article = Object.assign({}, this.article, res.data)
             this.loadDone = true
            // this.$nextTick(() => {
            //     this.initScroll()
            //     this.loadingClose()
            // })
        })
    }
}
</script>

<style lang="">
  .read-article {
    width: 400px;
    margin: auto;
    margin-top: 150px;
  }
  .show-content {
    margin-top:15px;
  }
</style>