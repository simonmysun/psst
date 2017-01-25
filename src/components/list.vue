<template>
  <div class="list">
    <!-- render notes in a list -->
    <div>
      <a v-for="psst in pssts" href="#" :class="{ active: activePsst === psst, invalidated: !validate(psst.text) }" @click.stop="setActivePsst(psst)">
        <p>
          {{ psst.text }}
        </p>
      </a>
    </div>
  </div>
</template>

<script>
 import { validate } from './../functions'; // eslint-disable-line no-unused-vars

 export default {
   name: 'list',
   computed: {
     pssts() {
       const result = this.$store.state.pssts.sort((a, b) => {
         if (!validate(a.text)) {
           return 1;
         }
         if (!validate(b.text)) {
           return -1;
         }
         const x = JSON.parse(a.text);
         const y = JSON.parse(b.text);
         return (x[1] + (x[2][0] * 60 * 1000)) - (y[1] + (y[2][0] * 60 * 1000));
       });
       console.log(result);
       return result;
     },
     activePsst() {
       return this.$store.state.activePsst;
     },
   },
   methods: {
     setActivePsst(psst) {
       this.$store.commit('setActivePsst', { psst });
     },
     validate,
   },
 };
</script>

<style scoped>
 .list {
 }
 .active {
   font-weight: bold;
 }
 .invalidated {
   text-decoration: line-through;
 }
</style>
