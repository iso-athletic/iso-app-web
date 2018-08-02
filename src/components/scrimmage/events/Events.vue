<template>
  <div id="events" class="events">
  <v-card class="translucentBackground scrimmageBorder events-card">
    <v-container class="pa-0" fluid>
      <h2 class="text-xs-center bottomScrimmageBorder py-2">Event log</h2>
        <Event v-for="(eventItem, i) in occurredEvents.slice().reverse()"
        v-bind:data="eventItem"
        v-bind:key="i"
        :actionEntry="eventItem"
        :color="cardColor(i)"
        />
    </v-container>
  </v-card>
</div>
</template>

<script>
import Vue from "vue";
import Event from "./Event";

export default {
  name: "events",
  components: {
    Event
  },
  props: {
    occurredEvents: Array
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
};
</script>

<style>
::-webkit-scrollbar {
  display: none;
}
.events {
  height: 100%;
}
.events-card {
  height: 100% !important;
  overflow: auto;
}
</style>
