<template>
  <v-card class="noBackground fullWidth bottomScrimmageBorder">
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

<style>
  
</style>