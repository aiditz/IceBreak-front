import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    layers: {
      background: true,
      hexagons: true,
      paths: false,
      objects: true,
    },
    hexagons: [
      {
        color: 'rgba(255, 0, 0, 0.2)'
      },
      {
        color: 'rgba(255, 0, 0, 0.2)'
      },
      {
        color: 'rgba(0, 255, 0, 0.2)'
      },
    ],

  },
  mutations: {
    set(state, {field, value}) {
      state[field] = value;
    },

    setGamestate(state, gs) {
      Object.assign(state, gs);
    }
  },
  actions: {

  },
});
