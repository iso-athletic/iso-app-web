<template>
  <div class="players">
    <h3>Your Players</h3>
    <div class="player">
      <Player v-for="player in players" :key="player.id" :name="player.name" :jersey_num="player.jersey_number"></Player>
    </div>
    <v-divider></v-divider>
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </p>
    <input class="add-inputs" v-on:keyup="errors=[]" v-model="playerToAddName" placeholder="Player name">
    <input class="add-inputs" v-on:keyup="errors=[]" v-model="playerToAddJerseyNumber" placeholder="Jersey number">
    <v-btn @click="checkForm">Add</v-btn>
  </div>
</template>

<script>
import PlayersService from '../.././api/playersService';
import Player from './Player';

const playersService = new PlayersService();
const organizationId = localStorage.getItem("organization_id");

export default{
  name: 'playersselect',
  data () {
    return {
      errors: [],
      players: [],
      playerToAddName: "",
      playerToAddJerseyNumber: ""
    }
  },
  methods: {
    checkForm: function() {
      if (this.playerToAddName && this.playerToAddJerseyNumber 
          && parseInt(this.playerToAddJerseyNumber)) {
        this.addPlayer();
        return;
      }

      this.errors = [];

      if (!parseInt(this.playerToAddJerseyNumber)){
        this.errors.push('Jersey number has to be a number.');
      }
      if (!this.playerToAddName) {
        this.errors.push('Name required.');
      }
      if (!this.playerToAddJerseyNumber) {
        this.errors.push('Jersey number required.');
      }
    },
    addPlayer: function() {
      playersService.addPlayer(this.playerToAddName, this.playerToAddJerseyNumber, organizationId).then((res)=>{
        this.players.push(
          {
            id: res.data.id,
            name: res.data.name,
            jersey_number: res.data.jersey_number
          });
        this.playerToAddName = "";
        this.playerToAddJerseyNumber = "";
      })
    }
  },
  components: {
    Player,
  },
  mounted() {
    playersService.getOrganizationPlayers(localStorage.getItem('organization_id')).then((res)=>{
      this.players = res.data;
    });
  }
}
</script>

<style>
.players {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

.add-inputs {
  outline: 1px solid white;
}

.player {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
