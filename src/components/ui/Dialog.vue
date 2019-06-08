<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="300">
      <v-card>
        <v-card-title class="headline">
          {{ item.title }}
        </v-card-title>
        <v-card-text>
          {{ item.text }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-for="button in item.buttons"
                 color="green darken-1"
                 flat
                 @click="$store.dispatch('ui/dialogs/handleAction', button.action)">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    props: ['item'],
    data() {
      return {
        dialog: true
      }
    }
  }
</script>
