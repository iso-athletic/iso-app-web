<template>
  <div id="scrimmage-view">
    <v-layout row wrap>
      <v-flex md5>
        <v-layout row wrap>
          <v-flex d-flex md12>
            <Timer />
          </v-flex>
          <v-flex d-flex md12 id="court">
            <Court />
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex md5>
        <Players />
      </v-flex>
      <v-flex xs3>
        <Events :occuredEvents="allEvents"/>
      </v-flex>
    </v-layout>

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
