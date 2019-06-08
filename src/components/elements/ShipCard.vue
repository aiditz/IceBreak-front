<template>
  <v-card :id="id">
    <v-layout>
      <v-flex xs5 style="padding: 0 0 0 16px">
        <a :href="'#' + id" style="text-decoration: none;" v-if="item.parameters">
          <v-btn fab small dark color="grey" style="z-index: 1; margin: 0 -10px -30px;" @click="infoShown = !infoShown">
            <v-icon size="32px" v-if="!infoShown">info</v-icon>
            <v-icon size="20px" v-else>keyboard_arrow_up</v-icon>
          </v-btn>
        </a>

        <v-img
          :src="item.image"
          contain
        ></v-img>

        <v-expand-transition>
          <div v-show="infoShown"> 
            <table class="info-table">
              <tr v-for="param in item.parameters">
                <th>{{ param[0] }}</th>
                <td>{{ param[1] }}</td>
              </tr>
            </table>
          </div>
        </v-expand-transition>
      </v-flex>
      <v-flex xs7>
        <v-card-title>
          <div class="headline">{{ item.name }}</div>
        </v-card-title>

        <v-card-text style="padding-top: 0">
          {{ item.description }}

          <v-layout style="margin: 8px 0 0">
            <v-flex style="flex: 1; padding: 0 6px 0 0"><h4 style="margin: 8px 0">Требования:</h4></v-flex>
            <v-flex style="flex: 10">
              <v-chip v-for="req in item.requirements" outline :color="req.completed ? 'green' : 'red'" :class="{opacity: req.completed}">
                <v-avatar>
                  <img :src="req.image" :alt="req.name">
                </v-avatar>
                {{ req.name }}
                <v-icon v-if="req.completed" color="green" right>check_circle</v-icon>
                <v-icon v-else color="red" right>report</v-icon>
              </v-chip>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions class="pa-3" style="padding-top: 0 !important">
          <v-btn :color="isAvailable ? 'success' : 'default'"
            @click="$store.dispatch('orderShip', item.id)"
            :disabled="!isAvailable || isBuilding || isBuilt"
          >
            <span v-if="!isAvailable">Требуется исследований - {{ estimateRequirements }}</span>
            <span v-else-if="item.progress == 0">Построить - {{ item.cost | formatMoney }} млрд.</span>
            <span v-else-if="isBuilding">
              Строится - 
              {{ estimateTime }} сек.
            </span>
            <span v-else-if="isBuilt">Построен</span>
          </v-btn>
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
      isAvailable() {
        return this.item.requirements.every(req => req.completed);
      },

      isBuilding() {
        return this.item.progress > 0 && this.item.progress < this.item.maximum_progress;
      },

      isBuilt() {
        return this.item.progress > 0 && this.item.progress >= this.item.maximum_progress;
      },

      estimateTime() {
        return Math.ceil((this.item.maximum_progress - this.item.progress) / 100);
      },
      estimateRequirements() {
        let left = 0;
        this.item.requirements.every(req => { if (!req.completed) left++ });
        return left;
      }
    },
    data() {
      return {
        id: null,
        infoShown: false
      }
    },
    mounted () {
      this.id = this._uid;
    }
  };
</script>

<style scoped>
  .root {
    overflow: auto;
  }

  .ship-card {
    overflow: hidden;
    position: relative;
  }

  .description {
    font-size: 12px;
  }

  .opacity {
    opacity: .6;
    transition: .3s;
  }
  .opacity:hover {
    opacity: 1;
  }

  .info-table {
    width: 100%;
    background-color: #FFF;
    padding: 4px 0 12px;
  }
  .info-table th {
    text-align: left;
    padding: 1px 0;
    font-size: 12px;
  }
  .info-table td {
    text-align: right;
    padding: 1px 0;
  }
</style>
