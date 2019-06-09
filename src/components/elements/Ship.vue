<template>
  <component
    class="root"
    :is="`Ship${data.id}`"
    :transform="`translate(${translate}) rotate(${rotate} 0 0)`"
  >
  </component>
</template>

<script>
  import helpers from '../../common/helpers';
  import hexGridMixin from '../mixins/hexGrid.mixin';
  import Ship1 from './svg/Ship1.svg.vue';
  import Ship2 from './svg/Ship2.svg.vue';

  export default {
    name: 'Ship',
    mixins: [hexGridMixin],
    components: {
      Ship1,
      Ship2,
    },
    props: ['data'],
    computed: {
      translate() {
        const col = this.data.movements[1].hex[1];
        const row = this.data.movements[1].hex[0];

        const {x, y} = helpers.hexMath.getItemCenterXY(col, row);

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
  .ships > g {
    transition: transform linear 5s;
  }
</style>
