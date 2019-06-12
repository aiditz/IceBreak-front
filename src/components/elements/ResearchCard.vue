<template>
  <v-card class="research-card" :class="{opacity: isResearched}">
    <v-layout>
      <v-flex xs5 class="card-left">
        <v-img
          :src="item.image"
          cover
        ></v-img>
      </v-flex>
      <v-flex xs7 class="card-right">
        <v-card-title class="py-2 px-3 pb-1">
          <div class="headline">{{ item.name }}</div>
        </v-card-title>

        <v-card-text class="pt-0">
          <div class="description">{{ item.description }}</div>
        </v-card-text>

        <v-card-actions class="pt-0 px-3 pb-3">
          <v-btn :color="isAvailable ? 'success' : 'default'"
            @click="$store.dispatch('research', item.id)"
            :disabled="!isAvailable || isResearching || isResearched"
            small
          >
            <span v-if="!isAvailable">Требуется <b>{{ item.required_level }}</b> уровень</span>
            <span v-else-if="item.progress == 0">Исследовать</span>
            <span v-else-if="isResearching">
              Исследуется -
              <b>{{ estimateTime }}</b> сек.
            </span>
            <span v-else-if="isResearched">Исследовано</span>
          </v-btn>
        </v-card-actions>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
  export default {
    name: 'ResearchCard',
    props: ['item'],
    computed: {
      myResearchLevel() {
        return this.$store.state.gs.research_level || 1;
      },

      isAvailable() {
        return this.myResearchLevel >= this.item.required_level;
      },

      isResearching() {
        return this.item.progress > 0 && this.item.progress < this.item.maximum_progress;
      },

      isResearched() {
        return this.item.progress > 0 && this.item.progress >= this.item.maximum_progress;
      },

      estimateTime() {
        return Math.ceil((this.item.maximum_progress - this.item.progress) / 10);
      }
    }
  };
</script>

<style scoped>
  .root {
    overflow: auto;
  }

  .research-card {
    margin: 0 8px;
    height: 100%;
  }

  .research-card .layout {
    height: 100%;
  }

  .headline {
    font-size: 16px !important;
    line-height: 20px !important;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .description {
    font-size: 13px;
    line-height: 16px;
  }

  .card-left {
    padding: 0
  }

  .v-image {
    height: 100%;
  }

  .opacity {
    opacity: .6;
    transition: .3s;
  }
  .opacity:hover {
    opacity: 1;
  }

  .v-card__actions .v-btn {
    font-size: 12px;
  }
  .v-btn b {
    font-weight: 900;
    font-size: 14px;
  }
</style>
