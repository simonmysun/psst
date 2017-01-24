<template>
  <div class="editor">
    <input :value="activePsstText" @input="editPsst">
  </div>
</template>

<script>
 export default {
   name: 'editor',
   computed: {
     activePsstText() {
       return this.$store.state.activePsst.text;
     },
   },
   methods: {
     editPsst(e) {
       this.$store.commit('editPsst', {
         messagesRef: this.$root.$firebaseRefs.pssts,
         value: e.target.value,
       });
     },
   },
 };
</script>

<style scoped>
 .editor {
   flex: 100;
   padding: 0 10px 0 0;
 }

 .editor input {
   width: 100%;
 }
</style>
