<template>
  <div class="root">
    <v-toolbar>
      <v-toolbar-title>
        {{ title }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down"></v-toolbar-items>

      <v-btn icon @click="$store.commit('ui/showMap')">
        <v-icon color="white">clear</v-icon>
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
    z-index: 200;
  }

  .root {
      min-height: 100vh;
      transform-origin: bottom right
  }

  .theme--light.v-toolbar {
    background: rgba(0, 91, 151, 1);
    color: #FFF;
  }

  .v-toolbar__content {
    background: rgb(81,255,255);
    background: linear-gradient(235deg, rgba(81,255,255,0) 0%, rgba(0,91,151,1) 100%);
    color: #FFF;
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
