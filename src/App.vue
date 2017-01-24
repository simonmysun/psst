<template>
  <div id="app">
    <div class="container">
      <app-header></app-header>
      <userinfo></userinfo>
      <div class="app-body">
        <div class="fast-edit">
          <editor></editor>
          <toolbar></toolbar>
        </div>
        <timeline></timeline>
        <list></list>
      </div>
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script>
 import appHeader from './components/header';
 import userinfo from './components/userinfo';
 import editor from './components/editor';
 import toolbar from './components/toolbar';
 import timeline from './components/timeline';
 import list from './components/list';
 import appFooter from './components/footer';

 export default {
   name: 'app',
   components: {
     appHeader,
     userinfo,
     editor,
     timeline,
     toolbar,
     list,
     appFooter,
   },
 };
</script>

<style>
 html, body, #app {
   position: relative;
   height: 100%;
   width: 100%;
   margin: 0;
   padding: 0;
   overflow: hidden;
 }
 
 #app {
   background: #2196f3;
   z-index: 0;
 }

 #app:after, #app:before {
   content: "";
   position: absolute;
   pointer-events: none;
 }
 
 #app:before {
   background: #2196f3;
   top: 0;
   right: 0;
   bottom: 0;
   left: 0;
   z-index: -2;
 }

 #app:after {
   background: #ffeb3b;
   top: 50%;
   left: 50%;
   height: 5000px;
   width: 5000px;
   transform-origin: 50% 0;
   transform: translateX(-2500px) translateY(-10vh) rotate(162deg);
   box-shadow: 0 0 5px #1741aa;
   z-index: -1;
 }

 .container {
   background: #fff;
   width: 480px;
   position: absolute;
   max-width: 95vw;
   height: 95vh;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   border-radius: 2px;
   box-shadow: 0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12), 0 8px 10px -5px rgba(0,0,0,0.3);
   display: flex;
   flex-direction: column;
 }

 .app-body {
   box-shadow: 0 3px 3px rgba(0, 0, 0, 0.3), 0 3px 3px rgba(0, 0, 0, 0.3) inset;
   flex: 100;
   overflow: auto;
   padding: 15px 20px;
 }
 
 a {
   color: #4285f4;
   text-decoration: none;
   -webkit-tap-highlight-color: transparent;
 }

 a:active, a:hover {
   text-decoration: underline;
 }

 .btn {
   display: inline-block;
   vertical-align: middle;
   user-select: none;
   border-radius: 1px;
   box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);
   text-align: center;
   transition: .2s ease-out;
   padding: 0 0.5rem;
   background-color: #26a69a;
   color: #fff;
 }

 .btn:hover {
   box-shadow: 0 3px 3px 0 rgba(0,0,0,0.14), 0 1px 7px 0 rgba(0,0,0,0.12), 0 3px 1px -1px rgba(0,0,0,0.2);
   background-color: #2bbbad;
 }
 .btn:focus {
   background-color: #1d7d74;
 }
 .btn:hover,
 .btn:focus,
 .btn.focus {
   text-decoration: none;
 }

 .fast-edit {
   width: 100%;
   display: flex;
   flex-direction: row;
 }
</style>
