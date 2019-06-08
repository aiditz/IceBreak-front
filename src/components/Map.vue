<template>
  <svg id="map" viewBox="0 0 640 360">
    <LayerBackground></LayerBackground>
    <LayerHexMap></LayerHexMap>
  </svg>
</template>

<script>
  import LayerBackground from './map/LayerBackground.svg.vue';
  import LayerHexMap from './map/LayerHexMap.svg.vue';

  export default {
    name: 'IceBreak',
    components: {
      LayerBackground,
      LayerHexMap,
    },
    props: {
    },
  };
</script>

<style scoped>
  #map {
    width: calc(24 * 20px);
    height: calc(13 * 2/3 * 1.414213562373095 * 20px);
    position: absolute;
  }
</style>
