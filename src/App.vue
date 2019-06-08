<template>
  <v-app id="app">
    <v-expand-transition>
      <div v-show="serverOffline" class="server-status">
        <v-chip color="warning">
          <v-icon color="red" left>report</v-icon>

          Нет подключения к серверу
        </v-chip>
      </div>
    </v-expand-transition>

    <Map class="map" :class="{hidden: $store.state.ui.page !== null}"></Map>
    <v-scale-transition>
      <component v-show="$store.state.ui.page !== null" :is="$store.state.ui.page"></component>
    </v-scale-transition>
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
  computed: {
    serverOffline() {
      return !this.$store.state.online;
    }
  }
};
</script>

<style>
  * {
    box-sizing: border-box;
  }
  html, body {
    /*
    // uncomment in production
    overscroll-behavior: none;
    */
  }
  body {
    padding: 0;
    margin: 0;
    background-color: #000;
  }
  #app {
    width: 100%;
    height: 100%;
  }
  .application--wrap {
    min-height: 100%;
    height: 100%;
    max-height: 100%;
  }
  .server-status {
    z-index: 10;
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .map {
    transition: .5s;
    opacity: 1;
    z-index: 1;
  }
  .hidden {
    opacity: 0;
    z-index: -5;
  }
</style>
