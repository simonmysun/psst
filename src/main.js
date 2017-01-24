import Vue from 'vue';
import firebase from 'firebase';
import offlineRuntime from 'offline-plugin/runtime';
import VueTouchRipple from 'vue-touch-ripple';

import App from './App';
import store from './store';

offlineRuntime.install();

Vue.use(VueTouchRipple);

const db = firebase.initializeApp({
  apiKey: 'AIzaSyCUWuZo9XwNAdyPGHKOZHk6poKGetojZs0',
  authDomain: 'psst-eac03.firebaseapp.com',
  databaseURL: 'https://psst-eac03.firebaseio.com',
  storageBucket: 'psst-eac03.appspot.com',
  messagingSenderId: '716670775542',
}).database();

const vm = new Vue({
  store,
  el: '#app',
  template: '<App/>',
  components: { App },
  beforeCreate() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        vm.$store.commit('setUser', user);
        vm.$store.commit('setPsstsRef', {
          main: vm,
          key: 'pssts',
          ref: db.ref(`pssts/${user.uid}`),
        });
        vm.$nextTick(loop); // eslint-disable-line no-use-before-define
        ((dom) => {
          dom.classList.add('remove');
          setTimeout(() => {
            dom.classList.add('removed');
          }, 700);
        })(document.getElementById('mask'));
      } else {
        firebase.auth().signInAnonymously().catch(console.error);
      }
    });
  },
});

const loop = () => {
  vm.$store.commit('updatePsst', {
    store: vm.$store,
    messagesRef: vm.$firebaseRefs.pssts,
  });
  setTimeout(() => {
    vm.$nextTick(loop);
  }, 1000);
};
