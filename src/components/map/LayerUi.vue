<template>
  <div class="root">
    <div class="wrap">
      <div class="topLeft">
        <p class="title">${{ $store.state.money | formatMoney }}</p>
        <p class="title">Наука: 0%</p>
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

  export default {
    name: 'LayerUi',
    components: {
    },
    props: {
    },
  };
</script>

<style scoped>
  .wrap {
    width: 100%;
    height: 100%;
    padding: 8px;
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 1fr 1fr;
    align-items: start;
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
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    align-self: end;
    text-align: right;
  }
</style>
