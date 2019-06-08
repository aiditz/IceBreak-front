<template>
  <Window title="Флот">
    Купить корабль
  </Window>
</template>

<script>
  import Window from '../Page.vue';

  export default {
    name: 'BuyIcebreaker',
    components: {
      Window
    },
    props: {
    },
    computed: {
    }
  };
</script>

<style scoped>
  .root {
    width: 100%;
    height: 100%;
    background: #ff0;
  }
</style>
