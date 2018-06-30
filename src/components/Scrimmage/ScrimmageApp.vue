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

export default {
  name: 'scrimmage',
  components: {
    Timer,
    Court,
    Players,
    Scoreboard,
    Actions,
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
