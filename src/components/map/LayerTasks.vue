<template>
  <div class="tasks">
    <div class="tasks-item" v-for="item in tasks" style="position: relative;">
      <v-progress-circular
        v-show="!item.disabled"
        :size="size"
        :value="100 - item.progress"
        :style="{top: item.pos.y + 'px', left: item.pos.x + 'px'}"
        :color="item.bg"
        style="border: 1px solid rgb(0, 91, 151); border-radius: 50%;"
        @click="$store.state.showTasks = true"
      >
        <v-avatar size="38px" color="rgb(0, 91, 151)">
          <v-img v-if="false && item.image" :src="item.image" />
          <v-icon v-else size="32px" :color="item.color">location_on</v-icon>
        </v-avatar>
      </v-progress-circular>
    </div>
  </div>
</template>

<script>
  import helpers from '../../common/helpers';

  export default {
    name: 'LayerTasks',
    components: {},
    data() {
      return {
        size: 48
      }
    },
    computed: {
      tasks() {
        if (!('quests' in this.$store.state.gs)) return [];

        return this.$store.getters.quests.map((item) => {
          const pos = helpers.hexMath.getItemCenterXY(item.coordinates[1], item.coordinates[0]);
          pos.x -= this.size / 2;
          pos.y -= this.size / 2;

          return {
            ...item,
            progress: item.ttl / item.start_ttl * 100,
            bg: helpers.getColorForPercentage(1 - item.progress / 100),
            color: item.progress % 20 >= 10 ? 'red' : 'yellow',
            pos,
          };
        });
      },
    }
  };
</script>

<style scoped>

.tasks {
  position: relative;
}
.tasks-item {
  position: relative;
  pointer-events: all;
}

</style>
