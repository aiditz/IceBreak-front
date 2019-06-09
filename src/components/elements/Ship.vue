<template>
  <g class="root">
    <component
      class="ship"
      :is="`Ship${data.id}`"
      :transform="`translate(${translate}) rotate(${rotate} 0 0)`"
    >
    </component>

    <g v-if="this.$store.state.layers.hexOfShips">
      <circle
        class="control-button"
        v-for="targetHex in data.target_hexes"
        r="20"
        fill="rgba(0, 91, 151, .9)"
        @click="$store.dispatch('controlShip', {shipId: data.id, target: targetHex})"
        :cx="6 + (getColTranslate(targetHex[1], targetHex[0]) - getColTranslate(col, row)) * 1.5"
        :cy="8 + (getRowTranslate(targetHex[0]) - getRowTranslate(row)) * 1.5"
        :transform="`translate(${getItemTranslate(targetHex[1], targetHex[0])}) rotate(0)`">

        <!--image
          width="14"
          height="14"
          :transform="`translate(${getItemTranslate(targetHex[1], targetHex[0])}) rotate(0)`"
          xlink:href="/img/right-arrow.png">
        /-->
      </circle>
    </g>
  </g>
</template>

<script>
  import helpers from '../../common/helpers';
  import hexGridMixin from '../mixins/hexGrid.mixin';
  import Ship1 from './svg/Ship1.svg.vue';
  import Ship2 from './svg/Ship2.svg.vue';
  import Ship3 from './svg/Ship3.svg.vue';
  import Ship4 from './svg/Ship4.svg.vue';
  import Ship5 from './svg/Ship5.svg.vue';

  export default {
    name: 'Ship',
    mixins: [hexGridMixin],
    components: {
      Ship1,
      Ship2,
      Ship3,
      Ship4,
      Ship5,
    },
    props: ['data'],
    methods: {

    },
    computed: {
      col() {
        return this.data.movements[1].hex[1];
      },
      row() {
        return this.data.movements[1].hex[0];
      },
      translate() {
        const {x, y} = helpers.hexMath.getItemCenterXY(this.col, this.row);

        return `${x} ${y}`;
      },

      rotate() {
        return (this.data.movements[2].rotation);
      }
    },
  };
</script>

<style scoped>
  .root {
  }
  .ship {
    transition: transform linear 6s;
  }
  .control-button {

  }


</style>
