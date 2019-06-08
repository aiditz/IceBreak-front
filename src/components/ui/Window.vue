<template>
  <div class="root">
    <v-toolbar>
      <v-toolbar-side-icon @click="$store.commit('ui/showMap')">
        <v-icon dark>arrow_back</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
      </v-toolbar-items>
    </v-toolbar>
    <slot></slot>
  </div>
</template>

<script>

  export default {
    name: 'BuyIcebreaker',
    components: {
    },
    props: {
    },
    computed: {
    }
  };
</script>

<style scoped>
  .root {
    width: 100%;
    height: 100%;
    background: #ff0;
  }
</style>
