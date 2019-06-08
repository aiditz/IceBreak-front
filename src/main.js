import Vue from 'vue';
import './plugins/vuetify'
import App from './App.vue';
import store from './store';
import './registerServiceWorker';
import API from './common/api';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false;

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
      const data = await API.getGamestate(store.lastEventId);

      this.$store.commit('setGamestate', data);
    }, 5000);
  }
}).$mount('#app');
