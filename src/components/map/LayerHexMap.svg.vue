<template>
  <g>
    <g v-for="(row, rowIndex) in gs.colors" :transform="'translate(' + getRowTranslate(rowIndex) + ')'">
      <Hexagon v-for="(item, itemIndex) in row" :transform="'translate(' + getItemTranslate(itemIndex) + ' 0)'" :color="item"></Hexagon>
    </g>
  </g>
</template>

<script>
  import Hexagon from '../elements/Hexagon.svg.vue';

  export default {
    name: 'IceBreak',
    computed: {
      colors() {
        return this.$store.state.gs;
      }
    },
    data: () => {
      return {
        tileW: 35,
        tileH: 40
      };
    },
    components: {
      Hexagon
    },
    props: {
    },
    methods: {
      getItemTranslate(item) {
        return item * this.tileW;
      },
      getRowTranslate(row) {
        let y = row * this.tileH * 3/4;
        let x = 0;

        if (row % 2 == 0) {
          x += this.tileW / 2;
        }

        return `${x} ${y}`;
      }
    }
  };
</script>

<style scoped>
</style>
