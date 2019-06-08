<template>
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
      },

      tileClicked(rowIndex, itemIndex) {
        console.log(rowIndex, itemIndex);
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
