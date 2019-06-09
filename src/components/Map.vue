<template>
  <div id="map-wrapper" class="root">
    <LayerUi class="layer-ui"></LayerUi>
    <LayerTasks class="layer-tasks"></LayerTasks>
    <svg id="map" :class="{loaded}">
      <g id="map-content" :transform="'scale(' + this.mapScale + ')'">
        <LayerBackground></LayerBackground>
        <LayerBuildHexGrid v-if="this.$store.state.layers.buildHexGrid"></LayerBuildHexGrid>
        <LayerHexagonsOfShips v-if="this.$store.state.layers.hexOfShips"></LayerHexagonsOfShips>
        <LayerShips></LayerShips>
      </g>
    </svg>
  </div>
</template>

<script>
  import LayerBackground from './map/LayerBackground.svg.vue';
  import LayerBuildHexGrid from './map/LayerBuildHexGrid.svg.vue';
  import LayerHexagonsOfShips from './map/LayerHexagonsOfShips.svg.vue';
  import LayerUi from './map/LayerUi.vue';
  import LayerShips from './map/LayerShips.vue';
  import LayerTasks from './map/LayerTasks.vue';
  import interact from 'interactjs';

  export default {
    name: 'Map',
    components: {
      LayerBackground,
      LayerBuildHexGrid,
      LayerHexagonsOfShips,
      LayerUi,
      LayerShips,
      LayerTasks
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
    z-index: 10000;
  }

  .layer-tasks {
    z-index: 1000;
    opacity: .8;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
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
