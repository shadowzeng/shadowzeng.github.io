<template>
  <div>
    <div v-marked>
### hello
[百度](www.baidu.com)
```javascript
var x = 1;
var y = "zeng";
```
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Marked from '../utils/marked'

Vue.use(Marked);
export default {
    name: 'Blog'
}
</script>

<style>
pre {
    overflow: auto;
    padding: 10px 10px;
    
    background-color: #f6f8fa;
    border-radius: 3px;
}
code {
    line-height: 1;
    font-size: 80%;
    font-family: Consolas,"Liberation Mono",Menlo,Courier,monospace;
}
</style>