import Vue from 'vue';
import Vuex from 'vuex';
import VuexFire from 'vuexfire';
import { state, mutations } from './mutations';
import plugins from './plugins';

Vue.use(Vuex);
Vue.use(VuexFire);

export default new Vuex.Store({
  state,
  mutations: Object.assign(VuexFire.mutations, mutations),
  plugins: [
    plugins,
  ],
});
