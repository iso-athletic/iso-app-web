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
        <!-- <Events :events="allEvents"/> -->
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'
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
    Events
  },
  computed: {
    actionEventBuilt() {
      if (this.$store.getters.isComplete) {
        console.log('got this');
      }
      return done;
    }
  },
  data() {
    return {
      finishedAction: this.$store.getters.isComplete,
      allEvents: ['hi']
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
