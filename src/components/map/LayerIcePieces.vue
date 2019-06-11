<template>
  <div></div>
</template>

<script>
  import pixi from '../../pixi/pixi';
  import * as PIXI from 'pixi.js';
  import config from '../../common/config';
  import helpers from '../../common/helpers';

  let iceContainer;

  const MAX_FLUCTUATION_RANGE = 5;
  const MAX_FLUCTUATION_V = 10;
  const FLUCTUATION_TIME_FACTOR = 5;

  export default {
    name: 'LayerIcePieces',
    mixins: [],
    mounted() {
      pixi.addInitHandler(app => {
      });
    },
    beforeUpdate() {
    },
    computed: {
    },
    components: {
    },
    props: ['ices'],
    watch: {
      ices() {
        this.renderIce();
      }
    },
    methods: {
    },
  };
</script>

<style scoped>
</style>
