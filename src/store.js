import Vue from 'vue';
import Vuex from 'vuex';
import helpers from './common/helpers';
import config from './common/config';
import API from './common/api';
import ui from './store/ui';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ui
  },
  state: {
    lastActionDate: null,
    lastEventId: null,
    requestTimeoutId: null,
    layers: {
      background: true,
      buildHexGrid: false,
      hexOfShips: false,
      icePieces: true,
      paths: false,
      objects: true,
    },
    customEvents: [],
    gs: {
      money: 0,
      status: 0 // -1: failed, 0: game, 1: win
    },
    loaded: false,
    config: {
      tileW: 35,
      tileH: 40,
      rows: 13,
      cols: 24
    },

    showTasks: false,
    failedTasks: 0,

    online: true,
    lastTs: new Date().getTime()
  },
  getters: {
    isResearchDone: state => researchId => {
      if (!state.gs.research) {
        return false;
      }

      return state.gs.research.find(r => r.id === researchId && r.progress === r.maximum_progress);
    },

    activeShips(state) {
      return (state.gs.ships || []).filter(ship => ship.active);
    },

    hexagonsOfShips(state, getters) {
      const ships = getters['activeShips'];

      if (!ships) {
        return [];
      }

      const hexes = [];

      for (const ship of ships) {
        hexes.push(...ship.target_hexes);
      }

      return hexes;
    }
  },
  mutations: {
    set(state, {field, value}) {
      state[field] = value;
    },

    toggleShipControls(state) {
      state.layers.hexOfShips = !state.layers.hexOfShips;
    },

    toggleBuildHexGrid(state) {
      state.layers.buildHexGrid = !state.layers.buildHexGrid;
    },

    setGamestate(state, gs) {
      if (!gs.ice || gs.ice.length === 0) {
        // kostyil'
        gs.ice = state.gs.ice;
      }

      state.failedTasks = gs.quests.filter((item) => item.failed).length;
      gs.quests = gs.quests.filter((item) => item.taken && !item.failed && !item.completed);
      state.gs = gs;

      // Server online checker
      state.online = true;
      state.lastTs = new Date().getTime();

      state.config.rows = 70; // state.gs.colors.length;
      state.config.cols = 101; // state.gs.colors[1].length;

      config.tileH = 1440 / state.config.rows;
      config.tileW = config.tileH / 1.1547;
      state.config = config;

      state.loaded = true;
    }
  },
  actions: {
    async init(context) {
      let data;
      let initNeeded = true;

      try {
        data = await API.startGame();
      } catch (err) {
        data = require('./common/backend-response.dist.json');
        initNeeded = false;
        console.warn('TEST GAMESTATE DATA USED');
      }

      API.setSession(data.id);
      context.commit('setGamestate', data);

      if (Array.isArray(data.ships)) {
        helpers.scrollToShip(data.ships[0]);
      }

      if (!initNeeded) {
        return;
      }

      await context.dispatch('refreshGs');
    },

    async refreshGs(context, responseData) {
      if (context.state.requestTimeoutId) {
        clearTimeout(context.state.requestTimeoutId);
        context.commit('set', {field: 'requestTimeoutId', value: null});
      }

      const dateBefore = Date.now();

      if (!responseData) {
        try {
          const data = await API.getGamestate(context.state.lastEventId);

          if (data.error) {
            console.error('Get gamestate loop error:', data.error);
          } else {
            context.commit('setGamestate', data);
          }
        } catch (err) {
          console.error('Up server pls', err);
        }
      } else {
        // already provided data
        context.commit('setGamestate', responseData);
      }

      if ((context.state.lastTs + 10000) < new Date().getTime()) {
        context.state.online = false;
      }

      const nextRequestIn = 5000 - Math.min(5000, Date.now() - dateBefore);
      context.commit('set', {
        field: 'requestTimeoutId',
        value: setTimeout(() => context.dispatch('refreshGs'), nextRequestIn)
      });
    },

    async setGamestate(context, gs) {
      context.commit('setGamestate', gs);

      if (gs.events) {
        // Save last event id
        context.commit('set', {field: 'lastEventId', value: gs.events[gs.events.length - 1].id});
      }
    },

    async sendAction(context, postData) {
      const data = await API.sendAction('Research', postData);
      await context.dispatch('refreshGs', data);
    },

    async research(context, researchId) {
      await context.dispatch('sendAction', {
        action: 'Research',
        researchId,
      });
    },

    async orderShip(context, icebreakerId) {
      await context.dispatch('sendAction', {
        action: 'Icebreaker',
        icebreakerId,
      });
    },

    async buildDatacenter(context, hex) {
      await context.dispatch('sendAction', {
        action: 'Datacenter',
      });
    },

    async controlShip(context, {shipId, direction}) {
      await context.dispatch('sendAction', {
        action: 'ControlShip',
        shipId,
        direction,
      });
    },
  }
});
