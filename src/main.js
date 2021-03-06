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
    this.$store.dispatch('init');
  }
}).$mount('#app');
