<template>
  <a class="blog-label">
    {{labelText}}
  </a>
</template>

<script>
  export default {
    props: ['labelText'],
  }
</script>

<style>
  .blog-label {
    height: 10px;
    background-color: #76ef86;
    border-radius: 3px;
    box-shadow: inset 0 -1px 0 rgba(27,31,35,0.12);
    font-size: 10px;
    font-weight: 600;
    line-height: 15px;
    padding: 0.15em 4px;
    margin-right: 5px;
  }
</style>