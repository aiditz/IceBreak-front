<template>
  <div class="root">
    <v-toolbar>
      <v-toolbar-title>
        {{ title }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down"></v-toolbar-items>

      <v-btn icon @click="$store.commit('ui/showMap')">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card class="page-body">
      <slot></slot>
    </v-card>
  </div>
</template>

<script>

  export default {
    name: 'BuyIcebreaker',
    components: {
    },
    props: ['title'],
    computed: {
    }
  };
</script>

<style scoped>
  .root {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    max-height: 100vh;
  }

  .root {
      min-height: 100vh;
      transform-origin: bottom right
  }
  .page-body {
      height: 100%;
      flex: 1;
  }

  /*.page-body {
    padding: 20px;
  }*/

  .v-sheet {
      max-height: 100%;
      overflow: auto;
  }

  .v-sheet .v-card ~ .v-card {
      margin-top: 20px;
  }
</style>
