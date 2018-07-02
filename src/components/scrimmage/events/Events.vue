<template>
  <div>
  <h1>Event log</h1>
  <Event v-for="(eventItem, i) in occuredEvents" 
    :actionEntry="eventItem" 
    :color="cardColor(i)"/>
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