<template>
  <div class="tasks">
    <div class="tasks-item" v-for="item in tasks" style="position: relative;">
      <v-progress-circular
        v-show="!item.disabled"
        :size="48"
        :width="20"
        :value="100 - item.progress_"
        :style="{top: item.center.y + 'px', left: item.center.x + 'px'}"
        :color="item.bg"
        style="border: 1px solid rgb(0, 91, 151); border-radius: 50%;"
      >
        <v-avatar size="40px" color="rgb(0, 91, 151)">
          <v-img v-if="item.image" :src="item.image" />
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
    computed: {
      tasks() {
        if (!('tasks' in this.$store.state.gs)) return [];

        this.$store.state.gs.tasks.every((item) => {
          item.progress_ = item.progress / item.ttl * 100;
          item.bg = helpers.getColorForPercentage(1 - item.progress_ / 100);
          item.color = item.progress % 20 >= 10 ? 'red' : 'yellow';
          item.center = helpers.hexMath.getItemCenterXY(item.coordinates[1], item.coordinates[0]);
          return item;
        });
        return this.$store.state.gs.tasks;
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
  margin: -20px;
  pointer-events: all;
}

</style>
