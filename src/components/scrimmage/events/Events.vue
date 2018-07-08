<template>
  <div id="events">
  <v-card id="eventsContainerCard" class="mt-2 ml-2" style="height:100%; overflow:scroll">
    <v-container id="eventsFluidContainer" fluid>
      <h2 id="eventLogHeading" class="text-xs-center">Event log</h2>
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

#eventsContainerCard {
background: rgba(255, 255, 255, 0.1);
  border: 1px solid #D1D1D1;  
}

#eventsFluidContainer {
  padding: 0;
}

#eventLogHeading {
  padding-top: 5%;
  padding-bottom: 5%;
  font-size: 1.6rem;
  border-bottom: 1px solid #D1D1D1;
}
</style>