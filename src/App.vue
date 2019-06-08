<template>
  <v-app id="app">
    <Map v-show="$store.state.ui.window === null"></Map>
    <component :is="$store.state.ui.window"></component>
  </v-app>
</template>

<script>
import Map from './components/Map.vue';
import Dialogs from './components/ui/Dialogs.vue';
import BuyShip from './components/BuyShip.vue';

export default {
  name: 'app',
  components: {
    Dialogs,
    Map,
    BuyShip,
  },
};
</script>

<style>
  * {
    box-sizing: border-box;
  }
  body {
    padding: 0;
    margin: 0;
    background-color: #000;
  }
  #app {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .application--wrap {
    min-height: 100%;
    height: 100%;
    max-height: 100%;
  }
</style>
