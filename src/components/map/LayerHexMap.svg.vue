<template>
  <g>
    <g class="hexGrid" id="hexGrid"
      :transform="'translate(' + gridTranslate + ')'"
    >
      <g class="hexClass" v-for="(row, rowIndex) in gs.colors"
        :transform="'translate(' + getRowTranslate(rowIndex) + ')'"
      >
        <Hexagon class="hexTile"
          v-for="(item, colIndex) in row"
          :transform="'translate(' + getColTranslate(colIndex) + ' 0) scale(' + config.tileW / 35 + ')'"
          :color="item"
          :rowIndex="rowIndex"
          :colIndex="colIndex"
          @click.native="tileClicked(rowIndex, colIndex)"
        ></Hexagon>
      </g>
    </g>
    <text style="fill: #FFF; transform: translate(200px, 150px);">{{debug}}</text>
  </g>
</template>

<script>
  import Hexagon from '../elements/Hexagon.svg.vue';
  import hexGridMixin from '../mixins/hexGrid.mixin';

  export default {
    name: 'LayerHexMap',
    mixins: [hexGridMixin],
    computed: {
      gs() {
        return this.$store.state.gs;
      },
      config() {
        return this.$store.state.config;
      },
      gridTranslate() {
        return -this.$store.state.config.tileW / 2 + ',' + -this.$store.state.config.tileH * 1/4;
      },
    },
    data: () => {
      return {
        debug: {}
      }
    },
    components: {
      Hexagon
    },
    props: {
    },
    methods: {
      tileClicked(rowIndex, colIndex) {
      },
    },
    mounted() {

    }
  };
</script>

<style scoped>

.hexTile {
  transition: .15s;
  opacity: .5;
}
.hexTile:hover {
  opacity: .9;
}

</style>
