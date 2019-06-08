import dialogs from './ui/dialogs';

export default {
  namespaced: true,
  modules: {
    dialogs
  },
  state: {
    page: null, // icebreakers, research, ... null = Map

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
      state.page = null;
    },

    showPage(state, name) {
      state.page = name;
    }
  },
  actions: {

  }
};
