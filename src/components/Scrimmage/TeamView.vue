<template>
  <div>
    <h1>{{TeamName}}</h1>
    <p v-for="player in players">{{player.name}}</p> 
    <v-btn @click.native.stop="addPlayerDialog=true"><v-icon>person_add</v-icon></v-btn>
    <v-dialog v-model="addPlayerDialog" max-width="300">
      <v-card>
        <v-card-title>Add Player</v-card-title>
        <v-select
          :items="playersLeft"
          label="Add player"
          v-model="newPlayerName">
        </v-select>
        <v-btn>Submit</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'players',
  data() {
    return{
      players: [],
      addPlayerDialog: false,
      newPlayerName: null,
    }
  },
  props: {
    playersLeft: Array,
    TeamName: String,
  },
  methods: {
  }
}
  
</script>

<style>
</style>
