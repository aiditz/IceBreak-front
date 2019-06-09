<template>
  <g>
    <g class="hexGrid" id="hexGrid"
       :transform="'translate(' + gridTranslate + ')'"
    >
      <g class="hexClass" v-for="(row, rowIndex) in gs.colors"
         :transform="'translate(' + getItemTranslate(0, rowIndex) + ')'"
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
  import config from '../../common/config';
  import Hexagon from '../elements/svg/Hexagon.svg.vue';
  import hexGridMixin from '../mixins/hexGrid.mixin';

  export default {
    name: 'LayerHexGrid',
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
      tileClicked() {

      }
    },
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
