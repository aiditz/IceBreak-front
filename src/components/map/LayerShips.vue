<template>
  <g class="ships">
    <Ship
      v-for="item in ships"
      :data="item"
    >
    </Ship>
  </g>
</template>

<script>
  import hexGridMixin from '../mixins/hexGrid.mixin';
  import Ship from '../elements/Ship.vue';

  export default {
    name: 'LayerShips',
    components: {
      Ship,
    },
    computed: {
      ships() {
        return this.$store.getters['activeShips'];
      },
    },
  };
</script>

<style scoped>
</style>
