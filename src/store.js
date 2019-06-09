import Vue from 'vue';
import Vuex from 'vuex';
import config from './common/config';
import ui from './store/ui';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ui
  },
  state: {
    lastEventId: null,
    layers: {
      background: true,
      hexGrid: false,
      hexOfShips: true,
      paths: false,
      objects: true,
    },
    customEvents: [],
    gs: {
      money: 0
    },
    loaded: false,
    config: {
      tileW: 35,
      tileH: 40,
      rows: 13,
      cols: 24
    },

    online: true,
    lastTs: new Date().getTime()
  },
  getters: {
    hexagonsOfShips(state) {
      if (!state.gs.ships) {
        return [];
      }

      return [
        state.gs.ships.map(ship => ship.movements[0].hex),
        state.gs.ships.map(ship => ship.movements[1].hex),
        state.gs.ships.map(ship => ship.movements[2].hex),
      ];
    }
  },
  mutations: {
    set(state, {field, value}) {
      state[field] = value;
    },

    setGamestate(state, gs) {
      state.gs = gs;

      // Server online checker
      state.online = true;
      state.lastTs = new Date().getTime();

      state.config.rows = state.gs.colors.length;
      state.config.cols = state.gs.colors[1].length;

      config.tileH = 1440 / state.config.rows;
      config.tileW = config.tileH / 1.1547;
      state.config = config;

      state.loaded = true;
    }
  },
  actions: {
    async setGamestate(context, gs) {
      context.commit('setGamestate', gs);

      if (gs.events) {
        // Save last event id
        context.commit('set', {field: 'lastEventId', value: gs.events[gs.events.length - 1].id});
      }
    },


  }
});
