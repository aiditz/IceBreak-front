<template>
  <div class="root">
    <div class="topLeft">
      <v-btn color="success">Icon</v-btn>
      <v-btn color="success">Icon</v-btn>
      <v-btn color="success">Icon</v-btn>
    </div>

    <div class="bottomRight">
      <v-btn color="success">1</v-btn>
      <v-btn color="success">2</v-btn>
      <v-btn color="success">3</v-btn>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'LayerUi',
    components: {
    },
    props: {
    },
  };
</script>

<style scoped>
  .root {
    width: 100%;
    height: 100%;
    position: absolute;
    padding: 8px;
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }

  .bottomRight {
    align-self: end;
  }
</style>
