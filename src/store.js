import Vue from 'vue';
import Vuex from 'vuex';
import helpers from './common/helpers';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lastEventId: null,
    layers: {
      background: true,
      hexagons: true,
      paths: false,
      objects: true,
    },
    customEvents: [],
    gs: {}
  },
  mutations: {
    set(state, {field, value}) {
      state[field] = value;
    },

    setGamestate(state, gs) {
      state.gs = gs;
    }
  },
  actions: {
    async setGamestate(context, gs) {
      context.commit('setGamestate', gs);

      if (gs.events) {
        // Save last event id
        context.commit('set', {field: 'lastEventId', value: gs.events[gs.events.length - 1].id});
      }
    }
  }
});
