<template>
  <Page title="Флот">
    <span v-for="item in $store.state.gs.research">
      <ResearchCard :item="item"></ResearchCard>
      <br>
    </span>
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

  .ship-card {
  }

  .description {
    font-size: 12px;
  }
</style>
