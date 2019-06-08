<template>
  <div>
    <Dialog
      v-if="dialogsCount > 0"
      :item="this.$store.state.ui.dialogs.list[0]"
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
      dialogsCount() {
        return this.$store.state.ui.dialogs.list.length;
      }
    }
  }
</script>
