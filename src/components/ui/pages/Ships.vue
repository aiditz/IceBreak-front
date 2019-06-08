<template>
  <Page title="Флот">
    <span v-for="item in $store.state.gs.icebreakers">
      <ShipCard :item="item"></ShipCard>
      <br>
    </span>
  </Page>
</template>

<script>
  import Page from '../Page.vue';
  import ShipCard from '../../elements/ShipCard.vue';

  export default {
    name: 'BuyIcebreaker',
    components: {
      Page,
      ShipCard
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
