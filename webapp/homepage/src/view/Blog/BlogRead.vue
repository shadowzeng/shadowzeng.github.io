<template>
    <div class="read-article" v-if="article">
        <div class="article-info">
            <h1>{{article.title}}</h1>
            <div class="user">
                <span data-v-09a5d688="">By:兜兜</span> 日期: {{article.date}}
            </div>
            <div class="show-content" v-html="article.content">
                {{article.content}}
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            article: null,
            loadDone: false
        }
    },
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
