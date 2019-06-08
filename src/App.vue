<template>
  <div id="app">
    <Map v-show="$store.state.ui.window === null"></Map>
    <component :is="$store.state.ui.window"></component>
  </div>
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
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: absolute;
  }
</style>
