<template>
  <v-card>
    <v-layout>
      <v-flex xs4>
        <v-img
          :src="item.image"
          contain
        ></v-img>
      </v-flex>
      <v-flex xs8>
        <v-card-title>
            <p class="headline">{{ item.name }}</p>
            <p class="description">{{ item.description }}</p>
            <p class="progress">Прогресс: {{ item.progress }}/{{ item.maximum_progress || 100 }} ({{ secondsLeft }} сек)</p>
        </v-card-title>
        <v-divider light></v-divider>
        <v-card-actions class="pa-3">
            123
        </v-card-actions>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
  export default {
    name: 'ShipCard',
    props: ['item'],
    computed: {
      secondsLeft() {
        return Math.max(0, Math.round((this.item.maximum_progress - this.item.progress) / 10));
      }
    }
  };
</script>

<style scoped>
  .root {
    overflow: auto;
  }

  .ship-card {
  }

  .description {
    font-size: 12px;
  }
</style>