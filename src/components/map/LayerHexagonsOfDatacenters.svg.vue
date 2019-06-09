<template>
  <g>
    <Hexagon v-for="item in coords"
             color="blue"
             :transform="'translate(' + getItemTranslate(item[1], item[0]) + ') scale(' + config.tileW / 35 + ')'"
    ></Hexagon>
  </g>
</template>

<script>
  import config from '../../common/config';
  import Hexagon from '../elements/svg/Hexagon.svg.vue';
  import hexGridMixin from '../mixins/hexGrid.mixin';

  export default {
    name: 'LayerHexagonsOfDatacenters',
    mixins: [hexGridMixin],
    computed: {
      gs() {
        return this.$store.state.gs;
      },
      coords() {
        return this.gs.datacenters;
      },
      config() {
        return this.$store.state.config;
      },
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

</style>
