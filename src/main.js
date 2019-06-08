import Vue from 'vue';
import App from './App.vue';
import store from './store';
import API from './common/api';
import helpers from './common/helpers';
import './registerServiceWorker';
import './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.config.productionTip = false;

Vue.filter('formatMoney', helpers.formatMoney);

new Vue({
  store,
  render: h => h(App),
  async created() {
    /*
    this.$store.commit('ui/dialogs/showInfo', {
      title: 'Hello in IceBreaker',
      text: 'some text',
      buttons: [{title: 'OK'}]
    });
    */

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
    this.$store.commit('setGamestate', data);

    if (!initNeeded) {
      return;
    }

    while (true) {
      const dateBefore = Date.now();
      let data;

      try {
        if ((this.$store.state.lastTs + 10000) < new Date().getTime()) {
          this.$store.state.online = false;
        }
        data = await API.getGamestate(store.lastEventId);

        if (data.error) {
          throw new Error(data.error);
        }

        this.$store.commit('setGamestate', data);
      } catch (err) {
        console.error('Get gamestate loop error:', err);
      } finally {
        await helpers.wait(5000 - Math.min(5000, Date.now() - dateBefore));
      }
    }
  }
}).$mount('#app');
