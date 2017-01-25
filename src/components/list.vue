<template>
  <div class="list">
    <!-- render notes in a list -->
    <div>
      <a v-for="(psst, index) in pssts" href="#" :class="{ active: activePsst === psst, invalidated: psst.data === null }" @click.stop="setActivePsst(psst)">
        <h3 v-if="psst.data === null">Invalid</h3>
        <h3 v-else>{{ computedTime[index] }}</h3>
        <p>
          {{ psst.text }}
        </p>
      </a>
    </div>
  </div>
</template>

<script>
 import moment from 'moment';
 import { validate } from './../functions';

 export default {
   name: 'list',
   data() {
     return {
       computedTime: {},
     };
   },
   computed: {
     pssts() {
       return this.$store.state.pssts.map((x) => {
         x.data = validate(x.text);
         return x;
       }).sort((a, b) => {
         const x = a.data;
         const y = b.data;
         if (x === null) {
           return 1;
         }
         if (y === null) {
           return -1;
         }
         return (x[1] + (x[2][0] * 60 * 1000)) - (y[1] + (y[2][0] * 60 * 1000));
       });
     },
     activePsst() {
       return this.$store.state.activePsst;
     },
   },
   mounted() {
     this.$root.$nextTick(this.computeTime);
   },
   methods: {
     setActivePsst(psst) {
       this.$store.commit('setActivePsst', { psst });
     },
     computeTime() {
       this.computedTime = this.pssts.map(item => (
         item.data === null ? null : moment(item.data[1] + (item.data[2][0] * 60 * 1000)).fromNow()
       ));
       setTimeout(() => {
         this.$root.$nextTick(this.computeTime);
       }, 100);
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
