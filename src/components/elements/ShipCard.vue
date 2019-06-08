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
          <div class="headline">{{ item.name }}</div>
        </v-card-title>
        <v-card-text>
          {{ item.description }}

          <div v-if="!isAvailable">
            <span>Требования:</span>
            <ul>
              <li v-for="req in item.requirements" :key="req.id">
                {{ item.name }}
              </li>
            </ul>
          </div>
          <div class="progress">Прогресс: {{ item.progress }}/{{ item.maximum_progress || 100 }} ({{ secondsLeft }} сек)</div>
        </v-card-text>
        <v-divider light></v-divider>
        <v-card-actions class="pa-3">
            <v-btn color="success" @click="$store.dispatch('orderShip', item.id)">Построить</v-btn>
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
      },

      isAvailable() {
        return this.item.requirements.every(req => req.completed);
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
