<template>
  <div id="app">
    <Map></Map>
  </div>
</template>

<script>
import Map from './components/Map.vue';

export default {
  name: 'app',
  components: {
    Map,
  },
};
</script>

<style>
  body {
    padding: 0;
    margin: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: absolute;
  }
</style>
