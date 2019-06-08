<template>
  <Page title="Исследования">
    <v-layout row justify-space-between class="research-cards">
      <v-flex xs6 v-for="item in $store.state.gs.research">
        <ResearchCard :item="item"></ResearchCard>
      </v-flex>
    </v-layout>
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
    }
  };
</script>

<style scoped>
  .root {
    overflow: auto;
  }

  .research-cards {
    padding: 8px;
  }
</style>
