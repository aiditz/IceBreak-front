import dialogs from './ui/dialogs';

export default {
  namespaced: true,
  modules: {
    dialogs
  },
  state: {
    window: 'Map', // icebreakers, research, ...

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
    showWindow(state, name) {
      state.window = name;
    }
  },
  actions: {

  }
};
