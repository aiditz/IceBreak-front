<template>
  <g>
    <image
      v-if="data !== 0"
      :xlink:href="`/img/ice/${iceType}.svg`"
      width="50"
      height="50"
      transform="scale(0.35) translate(0 0)"
      :style="{opacity: data / 100}" />
  </g>
</template>

<script>
  import helpers from '../../common/helpers';
  import hexGridMixin from '../mixins/hexGrid.mixin';
  import Ship1 from './svg/Ship1.svg.vue';
  import Ship2 from './svg/Ship2.svg.vue';

  export default {
    name: 'IcePiece',
    props: ['data'],
    components: {
    },
    beforeCreate() {
      this.iceType = String(Math.floor(Math.random() * 10) + 1);
    },
    computed: {
    },
  };
</script>

<style scoped>
  .ice-piece {

  }
</style>
