<template>
  <div id="events" class="events">
  <v-card class="translucentBackground scrimmageBorder events-card">
    <v-container class="pa-0" fluid>
        <v-layout class="bottomScrimmageBorder py-2 pl-3 pr-4" align-center>
          <v-flex class="mt-1">
            <h2>Event log</h2>
          </v-flex>
          <!-- <v-flex xs2>
            <v-btn class="ma-0" color="blue" flat icon :to="{path: '/events', params: {}}">
              <v-icon medium>exit_to_app</v-icon>
            </v-btn>
          </v-flex> -->
        </v-layout>

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