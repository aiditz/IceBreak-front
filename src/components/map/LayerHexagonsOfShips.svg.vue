<template>
  <g>
    <Hexagon v-for="item in this.$store.getters['hexagonsOfShips']"
             color="black"
             :transform="'translate(' + getItemTranslate(item[1], item[0]) + ') scale(' + config.tileW / 35 + ')'"
    ></Hexagon>
  </g>
</template>

<script>
  import config from '../../common/config';
  import Hexagon from '../elements/svg/Hexagon.svg.vue';
  import hexGridMixin from '../mixins/hexGrid.mixin';

  export default {
    name: 'LayerHexagonsOfShips',
    mixins: [hexGridMixin],
    computed: {
      gs() {
        return this.$store.state.gs;
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
