<template>
  <v-card class="noBackground scrimmageBorder">
    <v-container fluid>
      <v-layout row align-center>
        <v-flex xs4 offset-xs2>
          <div class="large-text">{{getPrettyTime}}</div>
        </v-flex>
        <v-flex xs2 offset-xs1>
          <v-btn flat icon @click="resetTimer"><v-icon>fas fa-redo</v-icon></v-btn>
        </v-flex>
        <v-flex xs2>
          <v-btn flat icon color="green" v-if="!getIsTimerRunning" @click="startTimer" :ripple="false"><v-icon>fas fa-play</v-icon></v-btn>
          <v-btn flat icon color="red" v-if="getIsTimerRunning" @click="stopTimer" :ripple="false"><v-icon>fas fa-pause</v-icon></v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
/************ TODO: ***********
 * make countdown change as timer value changes
 * allow user to change the timer directly instead of input vals
 * alert sound when timer done?
 */
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'timer',
  methods: {
    ...mapActions([
      'startTimer',
      'stopTimer',
      'resetTimer'
    ])
  },
  computed: {
    ...mapGetters([
      'getPrettyTime',
      'getIsTimerRunning'
    ])
  }
}
</script>

<style>
</style>
