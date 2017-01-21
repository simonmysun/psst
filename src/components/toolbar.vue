<template>
  <div class="toolbar">
    <button @click="addPsst">Add</button>
    <button @click="removePsst">Remove</button>
  </div>
</template>

<script>
 
 export default {
   computed: {
     activeNote: () => this.store.$state.activePsst,
   },
   methods: {
     addPsst() {
       this.$store.commit('addPsst');
     },
     removePsst() {
       this.$store.commit('removePsst', {
         psst: this.$store.state.activePsst,
       });
     },
   },
 };
</script>

<style scoped>
 .toolbar {
 }
</style>
