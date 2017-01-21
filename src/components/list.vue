<template>
  <div class="list">
    <!-- render notes in a list -->
    <div>
      <a v-for="psst in pssts" href="#" :class="{ active: activePsst === psst, invalidated: !validate(psst.text) }" @click="setActivePsst(psst)">
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
       return this.$store.state.pssts.slice(1);
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
