<template>
  <div class="root">
    <div class="wrap">
      <div class="topLeft">
        <div class="top-left-item">
          <v-tooltip bottom color="rgba(0,0,0,.6)">
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <v-progress-circular :size="45" :width="5" :value="50" color="green">
                  <v-icon>local_drink</v-icon>
                </v-progress-circular>
                <b class="top-left-item-text">50 %</b>
              </div>
            </template>
            <span>Состояние экологии - 50 из 100</span>
          </v-tooltip>
        </div>

        <div class="top-left-item">
          <v-tooltip bottom color="rgba(0,0,0,.6)">
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <v-progress-circular :size="45" :width="5" :value="21 / 30 * 100" color="blue">
                  <v-icon>local_drink</v-icon>
                </v-progress-circular>
                <b class="top-left-item-text">21 / 30</b>
              </div>
            </template>
            <span>21 исследование изучено</span>
          </v-tooltip>
        </div>

        <div class="top-left-item">
          <v-tooltip bottom color="rgba(0,0,0,.6)">
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <v-progress-circular :size="45" :width="5" :value="30" color="orange">
                  <v-icon>monetization_on</v-icon>
                </v-progress-circular>
                <b class="top-left-item-text"><anumber :number="$store.state.gs.money"></anumber></b>
              </div>
            </template>
            <span><anumber :number="$store.state.gs.money"></anumber> млрд.</span>
          </v-tooltip>
        </div>
      </div>

      <div class="topRight"></div>

      <div class="bottomLeft" :class="{collapsed: shipsCollapsed, expanded: !shipsCollapsed}">
        <div class="bottom-left-item chevron" style="margin-bottom: 0" @click="shipsCollapsed = !shipsCollapsed">
          <v-avatar size="48px" color="rgba(0, 91, 151, 1)">
            <v-icon color="white" v-if="shipsCollapsed">keyboard_arrow_up</v-icon>
            <v-icon color="white" v-else>keyboard_arrow_down</v-icon>
          </v-avatar>
        </div>

        <div class="bottom-left-item" v-for="item in ships" @click="click(item)">
          <v-avatar tile size="48px" color="primary">
            <img :src="item.icebreaker.image" />
          </v-avatar>
          <span class="ship-name">{{ item.icebreaker.name }}</span>
        </div>

        <b class="bottomLeft-heading">Флот</b>
      </div>

      <div class="bottomRight">
        <img class="icon" src="/img/IconSatellite.svg" @click="$store.commit('ui/showPage', 'Satellites')">
        <img class="icon" src="/img/IconScience.svg" @click="$store.commit('ui/showPage', 'Research')">
        <img class="icon" src="/img/IconIcebreaker.svg" @click="$store.commit('ui/showPage', 'Ships')">
      </div>
    </div>
  </div>
</template>

<script>
  import anumber from '../anumber';
  import helpers from '../../common/helpers';

  export default {
    name: 'LayerUi',
    components: {
      anumber
    },
    props: {
    },
    computed: {
      gs() {
        return this.$store.state.gs;
      },
      ships() {
        if (!this.gs.ships) {
          return [];
        }

        return this.gs.ships.map(ship => ({
          ...ship,
          icebreaker: this.gs.icebreakers.find(a => a.id === ship.id)
        }));
      }
    },
    methods: {
      click(ship) {
        helpers.scrollToShip(ship);
      }
    },
    data() {
      return {
        shipsCollapsed: true
      }
    }
  };
</script>

<style scoped>
  .v-tooltip__content {
      border-radius: 14px;
      font-size: 12px;
      padding: 5px 12px;
  }
  .top-left-item {
    pointer-events: all;
    margin: 8px 10px;
  }
  .top-left-item:last-child {
    margin-bottom: 0;
  }
  .top-left-item-text {
    display: block;
    margin-top: 5px;
    text-align: center;
  }
  .topLeft {
    position: absolute;
    display: flex;
    padding: 8px;
    background-color: rgba(0,0,0,.2);
    border-radius: 0 0 8px 8px;
    top: 0;
    left: 50%;
    padding: 8px 8px 2px !important;
    color: #FFF;
    transition: .3s;
    margin-left: -105px;
  }
  .wrap {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .icon {
    height: 56px;
    width: 56px;
    margin: 4px;
    cursor: pointer;
    pointer-events: all;
  }

  .root {
    z-index: 100;
    pointer-events: none;
    position: absolute;
    width: 0;
    height: 0;
    overflow: visible;
    left: 0;
    top: 0;
  }

  .root .v-btn {
    pointer-events: all;
  }

  .bottomRight {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    align-self: end;
    text-align: right;
  }
  .bottomLeft {
    position: absolute;
    bottom: 8px;
    left: 8px;
    padding: 8px;
    display: flex;
    pointer-events: all;
    flex-direction: column;
    align-items: flex-start;
  }
  .bottom-left-item {
    transition: .3s;
    margin: 8px;
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    z-index: 1;
    box-shadow: -2px 2px 15px 1px rgba(0,0,0,.4);
  }
  .bottomLeft.collapsed .bottom-left-item {
    margin-top: -30px;
  }
  .bottomLeft.collapsed .ship-name {
    max-width: 0;
    height: 0;
    opacity: 0;
    display: block;
    transition: .3s opacity;
  }
  .bottomLeft.expanded .bottom-left-item {
    margin-bottom: 0 !important;
  }
  .bottomLeft.expanded .ship-name {
    max-width: 100px;
    height: 48px;
    opacity: 1;
  }
  .bottom-left-item .v-avatar {
    border-radius: 8px;
    overflow: hidden;
  }
  .expanded .bottom-left-item:not(.chevron) {
      padding: 0 12px 0 0;
      background-color: #1A1942;
      color: #FFF;
      font-size: 13px;
  }
  .expanded .bottom-left-item:not(.chevron) .v-avatar {
      margin-right: 10px;
  }
  .bottom-left-item:nth-child(1) { z-index: 9; margin-left: 0; }
  .bottom-left-item:nth-child(2) { z-index: 8; margin-left: 4px; }
  .bottom-left-item:nth-child(3) { z-index: 7; margin-left: 8px; }
  .bottom-left-item:nth-child(4) { z-index: 6; margin-left: 12px; }
  .bottom-left-item:nth-child(5) { z-index: 5; margin-left: 16px; }
  .bottom-left-item:nth-child(6) { z-index: 4; margin-left: 20px; }
  .bottom-left-item:nth-child(7) { z-index: 3; margin-left: 24px; }
  .bottom-left-item:nth-child(8) { z-index: 2; margin-left: 28px; }
  .bottom-left-item:nth-child(9) { z-index: 1; margin-left: 32px; }
  .bottomLeft.expanded .bottom-left-item { margin-left: 0; }

  .bottomLeft-heading {
    margin-top: 8px;
    font-weight: 400;
  }

  .bottomLeft {
      background-color: rgba(0,0,0,.2);
      border-radius: 0 8px 0 0;
      left: 0 !important;
      bottom: 0 !important;
      padding: 40px 16px 16px !important;
      color: #FFF;
      transition: .3s;
  }
  .bottomLeft.expanded {
      padding-top: 8px !important;
  }
  .bottomLeft-heading {
      display: block;
      text-align: center;
      width: 100%;
  }
</style>
