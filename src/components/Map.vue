<template>
  <div id="map-wrapper" class="root">
    <LayerUi class="layer-ui"></LayerUi>
    <svg id="map" :class="{loaded}">
      <g id="map-content" :transform="'scale(' + this.mapScale + ')'">
        <LayerBackground></LayerBackground>
        <LayerHexGrid v-if="this.$store.state.layers.hexGrid"></LayerHexGrid>
        <LayerHexagonsOfShips v-if="this.$store.state.layers.hexOfShips"></LayerHexagonsOfShips>
        <LayerShips></LayerShips>
      </g>
    </svg>
  </div>
</template>

<script>
  import LayerBackground from './map/LayerBackground.svg.vue';
  import LayerHexGrid from './map/LayerHexGrid.svg.vue';
  import LayerHexagonsOfShips from './map/LayerHexagonsOfShips.svg.vue';
  import LayerUi from './map/LayerUi.vue';
  import LayerShips from './map/LayerShips.vue';
  import interact from 'interactjs';

  export default {
    name: 'Map',
    components: {
      LayerBackground,
      LayerHexGrid,
      LayerHexagonsOfShips,
      LayerUi,
      LayerShips,
    },
    data() {
      return {
        mapScale: 1
      }
    },
    props: {
    },
    mounted() {
      /*
      interact('#map-content').gesturable({
        onmove: event => {
          this.mapScale *= event.scale;
        }
      });
      */
    },
    computed: {
      gs() {
        return this.$store.state.gs;
      },
      loaded() {
        return this.$store.state.loaded;
      }
    },
  };
</script>

<style scoped>
  .root {
    position: absolute;
    left: 0;
    height: 100%;
    width: 100%;
    overflow: scroll;
  }

  .root > * {
    position: absolute;
    left: 0;
    top: 0;
  }

  .layer-ui {
    position: fixed;
    box-shadow: inset 0 0 20px 0px #1A1942;
  }

  #map {
    opacity: 0;
    transition: .3s;
    width: 1780px;
    height: 1039px;
  }

  #map > * {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  #map.loaded {
    opacity: 1;
  }

</style>
