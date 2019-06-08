import dialogs from './ui/dialogs';

export default {
  namespaced: true,
  modules: {
    dialogs
  },
  state: {
    window: 'map', // icebreakers, research, ...

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
  },
  actions: {

  }
};
