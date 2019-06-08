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

    const data = await API.startGame();

    API.setSession(data.id);
    this.$store.commit('setGamestate', data);

    setInterval(async () => {
      if ((this.$store.state.lastTs + 10000) < new Date().getTime()) {
        this.$store.state.online = false;
      }

      const data = await API.getGamestate(store.lastEventId);

      this.$store.commit('setGamestate', data);
    }, 5000);
  }
}).$mount('#app');
