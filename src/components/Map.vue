<template>
  <div>
    <svg id="map" :viewBox="'0 0 ' + w + ' ' + h" :width="w" :height="h" :class="{loaded: !!loaded}">
      <LayerBackground></LayerBackground>
      <LayerHexMap></LayerHexMap>
    </svg>
    <LayerUi></LayerUi>
  </div>
</template>

<script>
  import LayerBackground from './map/LayerBackground.svg.vue';
  import LayerHexMap from './map/LayerHexMap.svg.vue';
  import LayerUi from './map/LayerUi.vue';

  export default {
    name: 'IceBreak',
    components: {
      LayerBackground,
      LayerHexMap,
      LayerUi,
    },
    props: {
    },
    computed: {
      gs() {
        return this.$store.state.gs;
      },
      loaded() {
        return this.$store.state.loaded;
      },
      w() {
        let w = Array.isArray(this.gs.colors) ? this.gs.colors[0].length - 1 : this.$store.state.config.cols;
        return w * this.$store.state.config.tileW;
      },
      h() {
        let h = Array.isArray(this.gs.colors) ? this.gs.colors.length - 2 : this.$store.state.config.rows;
        return h * this.$store.state.config.tileH * 403/500;
      }
    },
    data() {
      return {}
    }
  };
</script>

<style scoped>

#map {
  position: absolute;
  left: 0;
  height: 100%;
  width: auto;
  opacity: 0;
  transition: .3s;
}
#map.loaded {
  opacity: 1;
}

</style>
