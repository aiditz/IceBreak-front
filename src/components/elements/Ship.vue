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
        const config = this.$store.state.config;

        const centerX = config.tileW / 2;
        const centerY = config.tileH / 2;

        const col = this.data.movements[1].hex[1];
        const row = this.data.movements[1].hex[0];

        let x = col * config.tileW;
        let y = row * config.tileH * 29/40;

        if (row % 2 === 0) {
          x += this.$store.state.config.tileW / 2;
        }

        return `${x + centerX} ${y + centerY}`;
      },

      rotate() {
        return (this.data.movements[2].rotation);
      }
    },
  };
</script>

<style scoped>
  .root {
    opacity: 0.7;
  }
  .ships > g {
    transition: transform linear 5s;
  }
</style>
