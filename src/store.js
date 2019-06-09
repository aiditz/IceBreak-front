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
      hexOfShips: true,
      icePieces: true,
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
    activeShips(state) {
      return (state.gs.ships || []).filter(ship => ship.active);
    },

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

      state.config.rows = 70; // state.gs.colors.length;
      state.config.cols = 101; // state.gs.colors[1].length;

      config.tileH = 1440 / state.config.rows;
      config.tileW = config.tileH / 1.1547;
      state.config = config;

      state.loaded = true;

      state.gs.tasks = [
          {
            'id' : 1, 
            'name' : 'Ледовая 1 в Диксон', 
            'image': 'http://www.morvesti.ru.images.1c-bitrix-cdn.ru/upload/iblock/7c1/7787.jpg?1529918255125646', 
            'description': '', 
            'coordinates': [47, 15],
            'progress': 300,
            'ttl' : 600
          }, {
            'id' : 1, 
            'name' : 'Ледовая 2 в Диксон', 
            'image': '', 
            'description': '', 
            'coordinates': [30,30],
            'progress': 100,
            'ttl': 200
          }, {
            'id' : 1, 
            'name' : 'Ледовая 3 в Диксон', 
            'image': 'https://cdn.iz.ru/sites/default/files/styles/900x506/public/article-2017-05/0fbbfa8ea4eb373e113ff0a9f4cf006a.jpg?itok=Qh1w1UO4', 
            'description': 'Test desc', 
            'coordinates': [50,50], 
            'progress': 600,
            'ttl' : 600
          }
        ]
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
            console.error('Get gamestate loop error:', err);
          } else {
            context.commit('setGamestate', data);
          }
        } catch (err) {
          console.error('Up server pls', err);
        }
      } else {
        // already provided data
        context.commit('setGamestate', data);
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

    async sendAction(context, researchId) {
      const data = await API.sendAction('Research', {id: researchId});
      await context.dispatch('refreshGs', data);
    },

    async research(context, researchId) {
      await context.dispatch('sendAction', {
        action: 'Research',
        data: {
          researchId: researchId
        }
      });
    },
  }
});
