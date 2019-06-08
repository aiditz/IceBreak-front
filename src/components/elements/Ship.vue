<template>
  <component
    class="root"
    :is="`Ship${data.id}`"
    :transform="`translate(${translate}) rotate(${rotate} 0 0) scale(0.5)`"
  >
  </component>
</template>

<script>
  import helpers from '../../common/helpers';
  import hexGridMixin from '../mixins/hexGrid.mixin';
  import Ship1 from '../elements/Ship1.svg.vue';
  import Ship2 from '../elements/Ship2.svg.vue';

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
        const centerX = -110;
        const centerY = 103;

        const col = this.data.movements[0].hex[1];
        const row = this.data.movements[0].hex[0];

        let y = row * this.$store.state.config.tileH * 29/40;
        let x = col * this.$store.state.config.tileW;

        if (row % 2 === 0) {
          x += this.$store.state.config.tileW / 2;
        }

        return `${x + centerX} ${y + centerY}`;
      },

      rotate() {
        return (this.data.movements[0].rotation);
      }
    },
  };
</script>

<style scoped>
  .root {
    opacity: 0.7;
  }
</style>
