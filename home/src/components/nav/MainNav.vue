<template>
  <nav class="main-nav">
    <ul>
      <li v-for="item in navItems" :key="item.path">
        <router-link :to="item.path">{{item.name}}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    navItems: {
      required: true,
      type: Array
    }
  }
}
</script>

<style scoped>
nav {
  text-align: center;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
}
li:after {
  content: '|';
  font-size: 12px;
  color: #ccc;
  width: 20px;
  display: inline-block;
}
li:last-of-type:after {
  content: '';
  width: 0;
}
a {
  font-size: 13px;
  text-decoration: none;
  color: #6b6882;
  transition: all 0.4s;
}
</style>