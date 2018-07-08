<template>
  <v-card id="eventCardContainer">
    <v-container fluid>
      <h3>{{actionEntry.player}}</h3>
      <div>{{actionEntry.action}}</div>
      <div>{{actionEntry.timeStamp}}</div>
      <div v-if="actionEntry.position.threePointer">Three-pointer</div>
      <div v-else>Two-pointer</div>
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
  #eventCardContainer {
    width: 100%;
    background: none;
    border-bottom: 1px solid #D1D1D1;
  }
</style>