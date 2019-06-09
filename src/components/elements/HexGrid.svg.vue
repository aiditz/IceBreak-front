<template>
  <g class="root">
    <g class="hexClass" v-for="(row, rowIndex) in this.data">
      <Hexagon class="hexTile"
               v-for="(item, colIndex) in row"
               :transform="'translate(' + getItemTranslate(colIndex, rowIndex) + ') scale(' + config.tileW / 35 + ')'"
               :color="item"
               :rowIndex="rowIndex"
               :colIndex="colIndex"
      ></Hexagon>
    </g>
  </g>
</template>

<script>
  import config from '../../common/config';
  import Hexagon from '../elements/svg/Hexagon.svg.vue';
  import hexGridMixin from '../mixins/hexGrid.mixin';

  export default {
    name: 'HexGrid',
    mixins: [hexGridMixin],
    computed: {
      config() {
        return this.$store.state.config;
      },
    },
    components: {
      Hexagon
    },
    props: ['data'],
    methods: {
    },
  };
</script>

<style scoped>
  .root {
    opacity: 0.35;
  }
</style>
