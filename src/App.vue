<template>
  <v-app id="app">
    <Map v-show="$store.state.ui.page === null"></Map>
    <component :is="$store.state.ui.page"></component>
  </v-app>
</template>

<script>
import Map from './components/Map.vue';
import Dialogs from './components/ui/Dialogs.vue';
import Ships from './components/ui/pages/Ships.vue';
import Research from './components/ui/pages/Research.vue';
import Satellites from './components/ui/pages/Satellites.vue';

export default {
  name: 'app',
  components: {
    Dialogs,
    Map,
    Ships,
    Research,
    Satellites,
  },
};
</script>

<style>
  * {
    box-sizing: border-box;
  }
  html, body {
    overscroll-behavior: none;
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
