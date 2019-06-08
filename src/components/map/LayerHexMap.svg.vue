<template>
  <g>
    <g v-for="(row, row_index) in gs.colors" :key="row_index" :transform="'translate(' + getRowTranslate(row_index) + ')'">
      <Hexagon v-for="(item, item_index) in row" :transform="'translate(' + getItemTranslate(item_index) + ' 0)'" :color="item"></Hexagon>
    </g>
  </g>
</template>

<script>
  import Hexagon from '../elements/Hexagon.svg.vue';

  export default {
    name: 'IceBreak',
    computed: {
      gs() {
        return this.$store.state.gs;
      }
    },
    data: () => {
      return {
        tile_w: 35,
        tile_h: 40,
      };
    },
    components: {
      Hexagon
    },
    props: {
    },
    methods: {
      getItemTranslate(item) {
        return item * this.tile_w;
      },
      getRowTranslate(row) {
        let y = row * this.tile_h * 3/4;
        let x = 0;

        if (row % 2 == 0) {
          x += this.tile_w / 2;
        }

        console.log(row, y)

        return `${x} ${y}`;
      }
    }
  };
</script>

<style scoped>
</style>
