<template>
  <v-touch tag="g" v-on:pinchin="onPinchin" v-on:pinchout="onPinchout">
    <g class="hexGrid" id="hexGrid"
      :transform="'translate(' + gridTranslate + ')'"
    >
      <g class="hexClass" v-for="(row, rowIndex) in gs.colors"
        :transform="'translate(' + getRowTranslate(rowIndex) + ')'"
      >
        <Hexagon class="hexTile"
          v-for="(item, itemIndex) in row"
          :transform="'translate(' + getItemTranslate(itemIndex) + ' 0) scale(' + config.tileW / 35 + ')'"
          :color="item"
          @click.native="tileClicked(rowIndex, itemIndex)"
        ></Hexagon>
      </g>
    </g>
    <text style="fill: #FFF; transform: translate(10px,20px);">{{debug}}</text>
  </v-touch>
</template>

<script>
  import Hexagon from '../elements/Hexagon.svg.vue';

  export default {
    name: 'IceBreak',
    computed: {
      gs() {
        return this.$store.state.gs;
      },
      config() {
        return this.$store.state.config;
      },
      gridTranslate() {
        return -this.$store.state.config.tileW / 2 + ',' + -this.$store.state.config.tileH * 1/4;
      }
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
      getItemTranslate(item) {
        return item * this.$store.state.config.tileW;
      },
      getRowTranslate(row) {
        let y = row * this.$store.state.config.tileH * 29/40;
        let x = 0;

        if (row % 2 == 0) {
          x += this.$store.state.config.tileW / 2;
        }

        return `${x} ${y}`;
      },

      tileClicked(rowIndex, itemIndex) {
        console.log(rowIndex, itemIndex);
      },

      onPinchin(event) {
        this.debug = 'pinchIN';
      },
      onPinchout(event) {
        this.debug = 'pinchOUT';
      }
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
