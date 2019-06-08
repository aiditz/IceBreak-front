import helpers from '../../common/helpers';

export default {
  namespaced: true,
  state: {
    list: []
  },
  modules: {
  },
  getters: {
  },
  mutations: {
    showInfo(state, {title, text}) {
      state.list.push({
        id: helpers.getNextId(),
        title,
        text,
        buttons: [{
          title: 'OK',
          color: null,
          action: null
        }]
      });
    },

    close(state) {
      state.list.shift();
    }
  },
  actions: {
    handleAction(context, actionName) {
      const dialog = context.state.list[0];

      if (!dialog) {
        console.warn('no dialog for action handle found');

        return;
      }

      context.commit('close');

      // API.sendAction(...);
    }
  }
};
