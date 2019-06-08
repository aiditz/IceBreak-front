import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sessionId: null,
    layers: {
      background: true,
      hexagons: true,
      paths: false,
      objects: true,
    },
    gs: {}
  },
  mutations: {
    set(state, {field, value}) {
      state[field] = value;
    },

    setGamestate(state, gs) {
      Object.assign(state.gs, gs);
    }
  },
  actions: {

  },
});
