<template>
  <div>
    <h1>{{TeamName}}</h1>
    <p v-for="player in players">{{player.name}}</p> 
    <v-btn
      fab
      small
      color="cyan accent-2"  
      @click.native.stop="addPlayerDialog=true"
      ><v-icon>add</v-icon>
    </v-btn>
    <v-dialog 
      v-model="addPlayerDialog"
      max-width="300">
      <v-card>
        Add Player to {{TeamName}}
        <v-card-actions>
          <v-spacer>
            <v-text-field
              v-model="newPlayerName"
              label="Name"
              single-line
              required
              autofocus>
            </v-text-field>
            <v-btn 
              color="green darken-1" 
              flat="flat"
              @click.native="addPlayer">Add</v-btn>
            <v-btn 
              color="red darken-1" 
              flat="flat"
              @click.native="dontAddPlayer">Cancel</v-btn>
          </v-spacer>
        </v-card-actions>
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
  props: ['TeamName'],
  methods: {
    addPlayer() {
      // 5 player max on team
      if (this.players.length >= 5) {
        alert("Too many players on team");
        this.dontAddPlayer();
      }

      // would rather just make form not able to submit, but not a form
      if (this.newPlayerName == null) {
        alert("Player must have a name");
        this.dontAddPlayer();
      }

      this.players.push({name: this.newPlayerName});
      this.addPlayerDialog=false;
      this.newPlayerName = null;
    },
    dontAddPlayer() {
      this.addPlayerDialog=false;
      this.newPlayerName = null;
    }
  }
}
  
</script>

<style>
</style>
