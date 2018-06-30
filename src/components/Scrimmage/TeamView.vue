<template>
  <div>
    <h1>{{TeamName}}</h1>
    <PlayerCard 
      v-for="player in players" 
      :playerName="player"
      @remove-player="removePlayerFromTeam($event)" />
    <v-btn @click.native.stop="addPlayerDialog=true"><v-icon>person_add</v-icon></v-btn>
    <v-dialog v-model="addPlayerDialog" max-width="300">
      <v-card>
        <v-card-title>Add Player</v-card-title>
        <v-select
          :items="playersLeft"
          label="Add player"
          v-model="newPlayerName">
        </v-select>
        <v-btn
          @click="addPlayer">Submit</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import PlayerCard from './PlayerCard'

export default {
  name: 'players',
  components: {
    PlayerCard,
  },
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
    addPlayer() {
      console.log(this.players);
      if (this.newPlayerName == null) {
        console.log("no value is selected");
      }
      this.players.push(this.newPlayerName);
      this.newPlayerName = null;
      this.addPlayerDialog = false;
    },
    removePlayerFromTeam(playerName) {
      let i = this.players.indexOf(playerName);
      if (i != -1) this.players.splice(i, 1);
      console.log(this.players);
    }
  }
}
  
</script>

<style>
</style>
