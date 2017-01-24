<template>
  <div class="toolbar">
    <a @click.stop="addPsst" class="btn add" v-touch-ripple>Add</a>
    <a @click.stop="removePsst" class="btn remove" v-touch-ripple>Remove</a>
  </div>
</template>

<script>
 export default {
   computed: {
     activeNote() {
       return this.$store.state.activePsst;
     },
   },
   methods: {
     addPsst() {
       this.$store.commit('addPsst', {
         messagesRef: this.$root.$firebaseRefs.pssts,
       });
     },
     removePsst() {
       this.$store.commit('removePsst', {
         messagesRef: this.$root.$firebaseRefs.pssts,
         psst: this.$store.state.activePsst,
       });
     },
   },
 };
</script>

<style scoped>
 .toolbar {
 }
 
 .add {
   background-color: #0288d1;
 }

 .add:hover {
   background-color: #03a9f4;
 }
 
 .add:focus {
   background-color: #01579b;
 }

 .remove {
   background-color: #c62828;
 }

 .remove:hover {
   background-color: #f44336;
 }
 
 .remove:focus {
   background-color: #b71c1c;
 }
</style>
