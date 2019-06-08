<template>
  <v-touch tag="g" v-on:tap="onTap" v-on:pinchin="pinchin" v-on:pinchout="pinchout">
    <g>
      <text>{{ finger }}</text>
    </g>

    <g class="hexGird"
      :transform="'translate(' + greadTranslate + ')'"
    >
      <g class="hexClass" v-for="(row, rowIndex) in gs.colors"
        :transform="'translate(' + getRowTranslate(rowIndex) + ')'"
      >
        <Hexagon class="hexTile"
          v-for="(item, itemIndex) in row"
          :transform="'translate(' + getItemTranslate(itemIndex) + ' 0)'"
          :color="item"
          @click.native="tileClicked(rowIndex, itemIndex)"
        ></Hexagon>
      </g>
    </g>
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
      greadTranslate() {
        return '-50, -5';
      }
    },
    data: () => {
      return {
        tileW: 35,
        tileH: 40,
        finger: {
          x: NaN,
          y: NaN,
          dX: NaN,
          dY: NaN,
          count: NaN
        }
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
      },

      tileClicked(rowIndex, itemIndex) {
        console.log(rowIndex, itemIndex);
      },

      onTap(event) {
        console.log(event.pointers.length)
        alert(event.pointers.length)
      },
      pinchin(event) {
        alert('pinchin')
      },
      pinchout(event) {
        alert('pinchout')
      }
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
