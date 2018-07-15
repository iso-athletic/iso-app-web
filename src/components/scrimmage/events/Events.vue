<template>
  <div id="events">
  <v-card class="eventsCard translucentBackground scrimmageBorder mt-2 ml-2">
    <v-container  class="pa-0" fluid>
      <h2 class="py-2 text-xs-center bottomScrimmageBorder">Event log</h2>
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
  .eventsCard {
    height:100%; 
    overflow:scroll;
  }
</style>
