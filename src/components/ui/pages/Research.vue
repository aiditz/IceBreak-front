<template>
  <Page title="Исследования">
    <span class="level_bar">Вы досигли <b>{{ myResearchLevel }}</b> уровня</span>

    <div class="research-cards">
      <v-layout row justify-space-between v-for="row in researches" class="research-row">
        <v-flex xs6 v-for="item in row">
          <ResearchCard :item="item"></ResearchCard>
        </v-flex>
      </v-layout>
    </div>
  </Page>
</template>

<script>
  import Page from '../Page.vue';
  import ResearchCard from '../../elements/ResearchCard.vue';

  export default {
    name: 'Researches',
    components: {
      Page,
      ResearchCard
    },
    computed: {
      researches() {
        return this.$store.state.gs.research.reduce(function(result, value, index, array) {
          if (index % 2 === 0)
            result.push(array.slice(index, index + 2));
          return result;
        }, []);
      },
      myResearchLevel() {
        return this.$store.state.gs.research_level || 1;
      }
    }
  };
</script>

<style scoped>
  .root {
    overflow: auto;
  }

  .research-row {
    padding: 8px 0;
  }

  .research-cards {
    padding: 8px;
  }
  span.level_bar {
    background-color: #2ecc71;
    padding: 7px 16px;
    display: block;
    text-align: center;
    color: #FFF;
    font-size: 13px;
  }
  span.level_bar b {
      font-size: 15px;
  }
</style>
