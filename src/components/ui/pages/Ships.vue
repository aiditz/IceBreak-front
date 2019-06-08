<template>
  <Page title="Флот">
    <ShipCard v-for="item in $store.state.gs.icebreakers" :item="item"></ShipCard>
  </Page>
</template>

<script>
  import Page from '../Page.vue';
  import ShipCard from '../../elements/ShipCard.vue';

  export default {
    name: 'Ships',
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

  .description {
    font-size: 12px;
  }
</style>
