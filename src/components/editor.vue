<template>
  <div class="editor">
    <textarea :value="activePsstText" @input="editPsst">
    </textarea>
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
         value: e.target.value,
       });
     },
   },
 };
</script>

<style scoped>
 .editor {
 }
</style>
