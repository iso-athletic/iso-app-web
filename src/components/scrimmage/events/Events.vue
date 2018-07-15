<template>
  <div id="events">
  <v-card class="translucentBackground scrimmageBorder mt-2 ml-2" style="height:100%; overflow:scroll">
    <v-container class="pa-0" fluid>
      <h2 class="py-2 text-xs-center" style="border-bottom: 1px solid #D1D1D1;">Event log</h2>
        <Event v-for="(eventItem, i) in occuredEvents.slice().reverse()"
        :actionEntry="eventItem"
        :color="cardColor(i)"/>
    </v-container>
  </v-card>
</div>
</template>

<script>
import Vue from 'vue'
import Event from './event'

export default {
  name: 'events',
  components: {
    Event
  },
  props: {
    occuredEvents: Array,
  },
  methods: {
    cardColor: function(index) {
      if (index % 2 == 0) {
        return "grey darken-1";
      } else {
        return "grey darken-2";
      }
    }
  }
}
</script>

<style>


</style>