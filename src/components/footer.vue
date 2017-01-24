<template>
  <div class="footer" v-touch-ripple>
    <p>By <a href="https://simonmysun.github.io/">Simonmysun</a>. <a href="https://github.com/simonmysun/psst">Source code</a></p>
  </div>
</template>

<script>
 export default {
   name: 'footer',
 };
</script>

<style scoped>
 .footer {
   background-color: #263238;
   border-radius: 0 0 2px 2px;
   flex: 1;
   box-shadow: 0 3px 3px rgba(0, 0, 0, 0.3), 0 3px 3px rgba(0, 0, 0, 0.3) inset;
   color: #fff;
   text-shadow: 0 1px 1px #444;
   text-align: center;
 }
 .footer p {
   margin: 0;
   padding: 10px;
 }
</style>
