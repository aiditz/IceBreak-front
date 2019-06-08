<template>
  <Page title="Исследования">
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
</style>
