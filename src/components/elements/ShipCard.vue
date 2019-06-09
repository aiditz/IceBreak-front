<template>
  <v-card :id="id">
    <v-layout>
      <v-flex xs5 class="card-left">
        <v-img
          :src="item.image"
          contain
        ></v-img>

        <a :href="'#' + id" class="info-toggler-link" v-if="item.parameters">
          <v-chip class="info-toggler" outline color="grey" @click="infoShown = !infoShown" :class="{opened: infoShown}">
            <v-icon v-if="!infoShown">keyboard_arrow_down</v-icon>
            <v-icon v-else>keyboard_arrow_up</v-icon>
            <span v-show="!infoShown">Характеристики</span>
          </v-chip>
        </a>

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
              <v-chip v-for="req in item.requirements" outline :color="req.completed ? 'green' : 'red'" :class="{opacity: req.completed}" class="requirements-item">
                <v-avatar>
                  <img :src="req.image" :alt="req.name">
                </v-avatar>
                <span class="requirements-item-name">{{ req.name }}</span>
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
  import helpers from '../../common/helpers';
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
        return this.item.requirements.filter(req => !req.completed).length;
      },
      estimateRequirementsText() {
        return helpers.getCase(this.estimateRequirements, 'исследование', 'исследования', 'исследований');
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
  padding: 16px 0 0 16px
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

.v-chip {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 280px;
}

.v-chip.v-chip.v-chip--outline .v-avatar {
  position: absolute;
  left: 0;
  margin: 0;
}

.requirements-item-name {
  padding: 0 25px;
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.v-chip .v-icon--right {
  position: absolute;
  top: 0;
  right: 0;
  margin: 4px 5px;
}


.info-toggler {
  display: block;
  text-align: center;
  margin: 0 !important;
  max-width: 100% !important;
  border: 0 !important;
  padding: 5px;
}
.info-toggler.opened {
  padding: 0;
}
.info-toggler.opened.v-chip .v-chip__content {
    height: auto;
    display: block;
    padding: 0;
    width: 100%;
}
.info-toggler.opened.v-chip .v-icon {
    margin: 0 auto;
    display: block;
    width: 30px;
}
.info-toggler.opened.v-chip.v-chip--outline.theme--light.grey.grey--text {
    height: auto;
    border-radius: 0;
    border-color: transparent !important;
    margin: 0;
    max-width: 100%;
    width: 100%;
}

</style>
