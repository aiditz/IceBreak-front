<template>
  <v-app id="app">
    <v-expand-transition>
      <div v-show="serverOffline" class="server-status">
        <v-chip color="warning">
          <v-icon color="red" left>cloud_off</v-icon>

          Нет подключения к серверу
        </v-chip>
      </div>
    </v-expand-transition>

    <div class="tasks-popup-open" @click="tasksPopup = !tasksPopup" v-if="tasks.length">
      <v-badge overlap color="warning">
        <template v-slot:badge>{{tasks.length}}</template>
        <v-avatar tile size="48px" color="rgba(0, 91, 151, 1)" style="border-radius: 8px;">
          <v-icon v-if="!tasksPopup" size="32px" color="white">assignment</v-icon>
          <v-icon v-else color="white">clear</v-icon>
        </v-avatar>
      </v-badge>
    </div>

    <div class="tasks-popup" :class="{opened: tasksPopup}">
      <v-card class="task-popup" v-for="item in tasks">
        <v-card-title>{{ item.name }}</v-card-title>
        <v-card-text class="pt-0">
          {{ item.description }}

          <div class="clear pb-2"></div>
          
          <table>
            <tr>
              <th class="task-key">Вознаграждение:</th>
              <td class="task-val">{{ item.salary }}</td>
            </tr>
            <tr>
              <th class="task-key">Время:</th>
              <td class="task-val">{{ item.ttl / 10 }} сек.</td>
            </tr>
          </table>

          <div class="clear"></div>
        </v-card-text>
      </v-card>
    </div>

    <Map class="map" :class="{hidden: $store.state.ui.page !== null}"></Map>
    <!-- <v-scale-transition> v-show="$store.state.ui.page !== null" -->
      <component class="pages" :is="$store.state.ui.page"></component>
    <!-- </v-scale-transition> -->
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
  data() {
    return {
      tasksPopup: false
    }
  },
  computed: {
    serverOffline() {
      return !this.$store.state.online;
    },
    tasks() {
      return this.$store.state.gs.tasks || [];
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
    pointer-events: none;
  }

  .map {
    transition: .5s;
    opacity: 1;
    z-index: 1;
    box-shadow: inset 0 0 20px 0px #1A1942;
  }
  .pages {
    z-index: 2;
  }

  .tasks-popup {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      z-index: -1;
      opacity: 0;
      overflow: scroll;
      max-height: 100%;
      padding: 16px 0;
      pointer-events: none;
      transition: .3s;
  }

  .tasks-popup.opened {
    pointer-events: all;
    z-index: 100;
    opacity: 1;
    background-color: rgba(0,0,0,.5);
  }

  .task-popup {
      display: block;
      width: 300px;
      margin: 0 auto;
      background-color: #FFF;
      margin: 8px auto;
      box-shadow: 0 2px 15px 5px rgba(255,255,255,.1);
      border-radius: 5px;
  }
  .task-popup .v-card__title {
    font-size: 16px;
  }
  .tasks-popup-open {
    position: fixed;
    top: 16px;
    left: 16px;
    z-index: 101;
  }
  .task-popup table {
    float: left;
  }
  .task-key {
    padding: 0 5px;
    font-size: 12px;
    text-align: right;
  }
  .task-val {
    padding: 0 0 0 6px;
    font-size: 14px;
    text-align: right;
  }
  .clear {
    display: block;
    clear: both;
  }
</style>
