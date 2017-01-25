<template>
  <div class="editor">
    <div class="time-picker">
    </div>
    <div class="text-editor">
      <div class="text-input">
        <input :value="activePsstText" @input="editPsst">
      </div>
      <div class="toolbar">
        <a @click.stop="addPsst" class="btn add" v-touch-ripple>Add</a>
        <a @click.stop="removePsst" class="btn remove" v-touch-ripple>Remove</a>
      </div>
    </div>
  </div>
</template>

<script>
 import moment from 'moment';
 
 export default {
   name: 'editor',
   data() {
     return {
       pickTime: moment(),
     };
   },
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
 .editor {
 }
 
 .text-editor {
   width: 100%;
   display: flex;
   flex-direction: row;
 }
 
 .text-input {
   flex: 100;
   padding: 0 10px 0 0;
 }

 .text-input input {
   width: 100%;
 }
 
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
