<template>
  <HexGrid
    :data="data"
  ></HexGrid>
</template>

<script>
  import config from '../../common/config';
  import HexGrid from '../elements/HexGrid.svg.vue';
  import hexGridMixin from '../mixins/hexGrid.mixin';

  export default {
    name: 'LayerBuildHexGrid',
    mixins: [],
    computed: {
    },
    data() {
      return {
        data: new Array(config.rows).fill(0).map(() => {
          return new Array(config.cols).fill(0).map(() => 'blue');
        })
      };
    },
    components: {
      HexGrid
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
