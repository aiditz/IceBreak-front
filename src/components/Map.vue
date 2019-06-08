<template>
  <svg id="map" viewBox="0 0 640 360">
      <BackgroundLayer></BackgroundLayer>
  </svg>
</template>

<script>
  import BackgroundLayer from './map/background.svg.vue';

  export default {
    name: 'IceBreak',
    components: {
      BackgroundLayer
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
