<template>
  <div id="scrimmage-view">
    <v-layout row wrap>
      <v-flex xs5>
        <Timer />
      </v-flex>
      <v-flex xs5>
        <Scoreboard />
      </v-flex>
      <v-flex x2>
      </v-flex>
      <v-flex xs5>
        <Court />
      </v-flex>
      <v-flex xs2>
        <Actions />
      </v-flex>
      <v-flex xs3>
        <Players />
      </v-flex>
      <v-flex xs3>
        <Events :occuredEvents="allEvents"/>
      </v-flex>
    </v-layout>
    <v-btn @click="generateCSV()">End</v-btn>
    <!-- we need this here so computed gets run, prob a better way, but returns nothing -->
    {{actionEventBuilt}}

  </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import Timer from './Timer'
import Court from './Court'
import Players from './Players'
import Scoreboard from './score-view/Scoreboard'
import Actions from './actions/Actions'
import Events from './events/Events'

export default {
  name: 'scrimmage',
  components: {
    Timer,
    Court,
    Players,
    Scoreboard,
    Actions,
    Events,
    moment
  },
  computed: {
    actionEventBuilt() {
      if (this.$store.getters.isComplete) {
        let newEvent = this.$store.getters.getEntry;

        let timeStamp = this.$store.getters.getTime;

        newEvent.timeStamp = timeStamp;
        this.allEvents.push(newEvent);
        this.$store.dispatch('resetAction');
      }
    }
  },
  data() {
    return {
      finishedAction: this.$store.getters.isComplete,
      allEvents: []
    }
  }
}
</script>

<style>

  html {
      height: 100%;
      margin-top: 0px;
  }

  body {
      color: white;
      background-color: black;
  }

</style>
