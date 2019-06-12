<template>
  <v-app id="app">
    <v-scale-transition>
      <div class="gameover" v-show="$store.state.gs.status !== 0" :class="{lose: $store.state.gs.status === -1, win: $store.state.gs.status === 1}">
        <h1>Игра окончена!</h1>

        <h2 v-if="$store.state.gs.status === 1">Вы покорили север!</h2>
        <h2 v-if="$store.state.gs.status === -1">Вам не удалось противостоять стихии</h2>
      </div>
    </v-scale-transition>

    <v-expand-transition>
      <div v-show="serverOffline" class="server-status">
        <v-chip color="warning">
          <v-icon color="red" left>cloud_off</v-icon>

          Нет подключения к серверу
        </v-chip>
      </div>
    </v-expand-transition>

    <div class="tasks-popup-open" @click="$store.state.showTasks = !$store.state.showTasks">
      <v-badge overlap color="warning">
        <template v-slot:badge v-if="tasks.length">{{tasks.length}}</template>
        <v-avatar tile size="48px" color="#1A1942" style="border-radius: 8px;">
          <v-icon v-if="!$store.state.showTasks" size="32px" color="white">speaker_notes</v-icon>
          <v-icon v-else color="white">clear</v-icon>
        </v-avatar>
      </v-badge>
    </div>

    <div class="tasks-popup" :class="{opened: $store.state.showTasks}">
      <div class="tasks-popup-header">
        <h4>Задания</h4>
        <p>Сделайте проводку по ледовому маршруту к соответствующим точкам на карте, чтобы выполнить задание</p>
      </div>
      <v-card class="task-popup" v-if="!tasks.length">
        <div class="text-xs-center pa-3">
          <p><big>На данный момент нет задач</big></p>
          <p>Как только они появятся, <br/> Вы сможете найти их здесь</p>
          <p class="pb-0">Также мы добавим все <br/> актуальные задачи на карту</p>
        </div>
      </v-card>
      <v-card class="task-popup" v-for="item in tasks">
        <!-- <img :src="item.image" style="max-width: 100%"/> -->
        <v-card-title>{{ item.name }}</v-card-title>
        <v-card-text class="pt-0">
          {{ item.description }}

          <div class="clear pb-2"></div>

          <table>
            <tr>
              <th class="task-key">Вознаграждение:</th>
              <td class="task-val">{{ item.salary }} млрд. руб.</td>
            </tr>
            <tr>
              <th class="task-key">Время:</th>
              <td class="task-val">{{ item.start_ttl / 10 }} сек. ({{Math.round(item.ttl/10)}} сек.)</td>
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
  import pixi from './pixi/pixi';
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
      return {}
    },
    async mounted() {
      await this.$store.dispatch('init');

      const el = document.getElementById('map-wrapper');
      pixi.init(el);
    },
    computed: {
      serverOffline() {
        return !this.$store.state.online;
      },
      tasks() {
        return this.$store.state.gs.quests || [];
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
    width: 100vw;
    height: 100vh;
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
    top: 11px;
    right: 16px;
    z-index: 101;
  }
  .task-popup table {
    margin-left: 20px;
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
    text-align: left;
  }
  .clear {
    display: block;
    clear: both;
  }
  .tasks-popup-header {
      text-align: center;
      max-width: 300px;
      margin: 0 auto;
      color: #FFF;
      font-size: 14px;
      line-height: 20px;
      padding: 12px 0;
  }

  .tasks-popup-header h4 {
      font-size: 24px;
      line-height: 32px;
      margin-bottom: 10px;
      font-weight: 400;
  }

  .tasks-popup.opened {
      background-color: rgba(0,0,0,.7);
  }

  .gameover {
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000;
    z-index: 10000;
    color: #FFF;
    text-align: center;
  }
  .gameover.win {
    background-color: rgba(46, 204, 113, .6);
    box-shadow: inset 0 0 30px 10px rgb(46, 204, 113);
  }
  .gameover.lose {
    background-color: rgba(231, 76, 60, .6);
    box-shadow: inset 0 0 30px 10px rgb(231, 76, 60);
  }
  .gameover h1 {
    display: block;
    text-align: center;
    margin: 0 auto;
    font-size: 68px;
    font-weight: 300;
    line-height: 90px;
  }
  .gameover h2 {
    display: block;
    text-align: center;
    margin: 0 auto;
    font-size: 24px;
    font-weight: 400;
    line-height: 32px;
  }
</style>
