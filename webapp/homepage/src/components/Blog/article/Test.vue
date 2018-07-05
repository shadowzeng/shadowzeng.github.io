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
import Marked from '../../utils/marked'

Vue.use(Marked);
export default {
    name: 'Test'
}
</script>