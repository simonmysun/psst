<template>
  <div class="userinfo">
    <p class="username">Hi, {{ user.isAnonymous ? 'Anonymous' : user.displayName }}</p>
    <p class="account"><a href="./static/account.html" @click.stop class="btn" v-touch-ripple>My account</a></p>
    <div style="clear:both;"></div>
  </div>
</template>

<script>
 export default {
   computed: {
     user() {
       return this.$store.state.user;
     },
   },
 };
</script>

<style scoped>
 .userinfo {
   background: #455a64;
   flex: 1;
   box-shadow: 0 3px 3px rgba(0, 0, 0, 0.3), 0 3px 3px rgba(0, 0, 0, 0.3) inset;
   color: #eee;
 }

 .userinfo p {
   line-height: 1.5;
   margin-top: 0;
   margin-bottom: 0;
   padding: 5px 20px 5px;
   text-shadow: 0 1px 1px #333;
 }

 .username {
   float: left;
 }

 .account {
   float: right;
   margin-left: -35px;
 }
</style>
