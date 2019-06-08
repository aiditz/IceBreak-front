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
  import SatelliteCard from '../../elements/SatelliteCard.vue';

  export default {
    name: 'Satellites',
    components: {
      Page,
      SatelliteCard
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
