<template>
  <div>
  <h1>Event log</h1>
  <Event v-for="eventItem in occuredEvents" 
    :actionEntry="eventItem" />
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
}
</script>