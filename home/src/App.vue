<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
body {
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
}

a {
    cursor: pointer;
}
</style>
