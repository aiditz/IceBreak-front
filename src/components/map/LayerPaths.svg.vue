<template>
  <Hexagon for="item in this.$store.state.objects"></Hexagon>
</template>

<script>
  import Hexagon from '../elements/Hexagon.svg.vue';

  export default {
    name: 'IceBreak',
    components: {
      Hexagon
    },
    props: {
    },
  };
</script>

<style scoped>
</style>
