import dialogs from './ui/dialogs';

export default {
  namespaced: true,
  modules: {
    dialogs
  },
  state: {
    window: null, // icebreakers, research, ... null = Map

    layers: {
      background: true,
      hexagons: true,
      paths: false,
      objects: true,
    },
  },
  getters: {
  },
  mutations: {
    showMap(state) {
      state.window = null;
    },

    showWindow(state, name) {
      state.window = name;
    }
  },
  actions: {

  }
};
