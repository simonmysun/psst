<template>
  <div id="app">
    <toolbar></toolbar>
    <editor></editor>
    <list></list>
  </div>
</template>

<script>
 import toolbar from './components/toolbar';
 import editor from './components/editor';
 import list from './components/list';

 export default {
   name: 'app',
   components: {
     toolbar,
     editor,
     list,
   },
 };
</script>

<style>
</style>
