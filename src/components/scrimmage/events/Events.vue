<template>
  <div class="full-height">
  <v-card class="my-2 ml-2" style="height:100%; overflow:scroll">
    <v-container fluid>
      <h2 class="text-xs-center">Event log</h2>
      <!-- <v-layout row> -->
        <Event v-for="(eventItem, i) in occuredEvents.slice().reverse()"
        :actionEntry="eventItem"
        :color="cardColor(i)"/>
      <!-- </v-layout> -->
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
.event-card {
  height: 100%;
}
</style>
