<template>
  <div class="root">
    <v-toolbar>
      <v-toolbar-side-icon @click="$store.commit('ui/showMap')">
        <v-icon dark>arrow_back</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title>
        {{ title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
      </v-toolbar-items>
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
  }

  .page-body {
    padding: 20px;
  }

  .v-sheet {
      max-height: 100%;
      overflow: auto;
  }

  .v-sheet .v-card ~ .v-card {
      margin-top: 20px;
  }
</style>
