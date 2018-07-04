<template>
  <v-card class="my-2">
    <v-container fluid>
      <h2 class="text-xs-center">Event log</h2>
      <v-layout col>
        <Event v-for="(eventItem, i) in occuredEvents"
        :actionEntry="eventItem"
        :color="cardColor(i)"/>
      </v-layout>
    </v-container>
  </v-card>
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
