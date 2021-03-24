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
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
/* 自定义进度条的颜色 */
 #nprogress .bar {
      background: green !important; 
    }
</style>
