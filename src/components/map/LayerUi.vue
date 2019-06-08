<template>
  <div class="root">
    <div class="topLeft">
      <p class="title">${{ $store.state.money | formatMoney }}</p>
      <p class="title">Наука: 0%</p>
    </div>

    <div class="bottomRight">
      <v-btn color="success" @click="$store.commit('ui/showPage', 'Satellites')">Спутники</v-btn>
      <v-btn color="success" @click="$store.commit('ui/showPage', 'Research')">Наука</v-btn>
      <v-btn color="success" @click="$store.commit('ui/showPage', 'Ships')">Флот</v-btn>
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
  .root {
    pointer-events: none;
    width: 100%;
    height: 100%;
    position: absolute;
    padding: 8px;
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }

  .root .v-btn {
    pointer-events: all;
  }

  .bottomRight {
    align-self: end;
    text-align: right;
  }
</style>
