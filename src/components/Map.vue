<template>
  <div class="root" :class="{loaded}">
    <LayerUi></LayerUi>
    <svg id="map">
      <LayerBackground></LayerBackground>
      <LayerHexMap></LayerHexMap>
    </svg>
  </div>
</template>

<script>
  import LayerBackground from './map/LayerBackground.svg.vue';
  import LayerHexMap from './map/LayerHexMap.svg.vue';
  import LayerUi from './map/LayerUi.vue';
  import svgPanZoom from 'svg-pan-zoom';

  export default {
    name: 'IceBreak',
    components: {
      LayerBackground,
      LayerHexMap,
      LayerUi,
    },
    props: {
    },
    mounted() {
    },
    computed: {
      gs() {
        return this.$store.state.gs;
      },
      loaded() {
        return this.$store.state.loaded;
      }
    },
    data() {
      return {}
    }
  };
</script>

<style scoped>

  .root {
    position: absolute;
    opacity: 1;
    transition: .3s;
    left: 0;
    height: 100%;
    width: 100%;
  }

  #map {
    overflow: scroll;
    width: 1920px;
    height: 1080px;
  }

  #map > * {
    width: 100%;
    height: 100%;
    overflow: hidden;
    transform: scale(0.5);
  }

  .root.loaded {
    opacity: 1;
  }

</style>
