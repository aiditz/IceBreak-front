<template>
  <div>
    <svg id="map" viewBox="150 0 1470 770" :class="{loaded: !!loaded}">
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
  width: 100%;
  opacity: 0;
  transition: .3s;
}
#map.loaded {
  opacity: 1;
}

</style>
