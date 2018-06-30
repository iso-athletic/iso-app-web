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
