<template>
  <v-card :id="id">
    <v-layout>
      <v-flex xs5 class="card-left">
        <a :href="'#' + id" class="info-toggler-link" v-if="item.parameters">
          <v-btn fab small dark color="grey" class="info-toggler" @click="infoShown = !infoShown">
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
      <v-flex xs7 class="card-right">
        <v-card-title>
          <div class="headline">{{ item.name }}</div>
        </v-card-title>

        <v-card-text class="pt-0">
          {{ item.description }}

          <v-layout class="requirements">
            <v-flex class="requirements-header">
              <h4 class="requirements-heading">Требования:</h4>
            </v-flex>
            <v-flex class="requirements-items">
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
        <v-card-actions class="pb-3 pl-3 pr-3 pt-0">
          <v-btn :color="isAvailable ? 'success' : 'default'"
            @click="$store.dispatch('orderShip', item.id)"
            :disabled="!isAvailable || isBuilding || isBuilt"
          >
            <span v-if="!isAvailable">Требуется <b>{{ estimateRequirements }}</b> {{ estimateRequirementsText }}</span>
            <span v-else-if="item.progress == 0">Построить - {{ item.cost | formatMoney }} млрд.</span>
            <span v-else-if="isBuilding">
              Строится - 
              <b>{{ estimateTime }}</b> сек.
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
      },
      estimateRequirementsText() {
        let mod = this.estimateRequirements % 10;
        if (this.estimateRequirements >= 5 && this.estimateRequirements <= 20) {
          return 'исследований';
        }
        if (mod == 0 || mod >=5) {
          return 'исследований';
        }
        if (mod == 1) {
          return 'исследование';
        }
        if (mod >= 2 && mod <= 4) {
          return 'исследования';
        }
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

.card-left {
  padding: 0 0 0 16px
}

.ship-card {
  overflow: hidden;
  position: relative;
}

.description {
  font-size: 12px;
}

.v-btn b {
  font-weight: 900;
  font-size: 14px;
}

.info-toggler-link {
  text-decoration: none;
}
.info-toggler {
  z-index: 1;
  margin: 0 -10px -30px;
}

.requirements {
  margin: 8px 0 0;
}
.requirements-header {
  flex: 1;
  padding: 0 6px 0 0
}
.requirements-heading {
  margin: 8px 0
}
.requirements-items {
  flex: 10
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

.v-card__actions .v-btn {
  font-size: 13px;
}
.v-btn b {
  font-weight: 900;
  font-size: 15px;
}

</style>
