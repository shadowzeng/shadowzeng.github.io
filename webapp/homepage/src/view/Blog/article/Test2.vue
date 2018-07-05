<template>
    <div>
        <div v-marked>
### 标题
测试文档2
```java
public static void mian(){
    system.out.println("hello world");
}
```
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import Marked from '../../utils/marked'

Vue.use(Marked);
export default {
    name: 'Test2'
}
</script>