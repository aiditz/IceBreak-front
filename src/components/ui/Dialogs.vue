<template>
  <div>
    <Dialog
      v-for="(item, index) in this.$store.state.ui.dialogs.list"
      :item="item"
      :key="index"
      dialog="true"
    >
    </Dialog>
  </div>
</template>

<script>
  import Dialog from './Dialog.vue';

  export default {
    components: {
      Dialog,
    },
    computed: {
    }
  }
</script>
