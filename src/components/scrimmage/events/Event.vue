<template>
  <v-card class="noBackground fullWidth" style="border-bottom: 1px solid #D1D1D1;">
    <v-container fluid>
      <h3>{{actionEntry.player}}</h3>
      <div>{{actionEntry.action}}</div>
      <div>{{actionEntry.timeStamp}}</div>
    </v-container>
  </v-card>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'event',
  props: {
    actionEntry: Object,
    color: String,
  }
}

</script>
