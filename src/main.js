import Vue from 'vue';
import App from './App.vue';
import store from './store';
import './registerServiceWorker';
import API from './common/api';

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
  async created() {
    const data = await API.startGame();

    API.setSession(data.id);
    this.$store.commit('setGamestate', data);

    setInterval(async () => {
      const data = await API.getGamestate(store.lastEventId);

      this.$store.commit('setGamestate', data);
    }, 5000);
  }
}).$mount('#app');
