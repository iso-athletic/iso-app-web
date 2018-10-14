<template>
  <v-card class="noBackground scrimmageBorder">
    <div v-if="$store.state.IsCompetitiveDrill">
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs6 sm6 md6>
            <TeamView
              :TeamName="getTeam1Name"
              TeamNumber=1
            />
          </v-flex>
          <v-flex xs6 sm6 md6>
            <TeamView
              :TeamName="getTeam2Name"
              TeamNumber=2
            />
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <div v-if="!$store.state.IsCompetitiveDrill">
      <v-container grid-list-xl>
      <v-layout row wrap>
          <PlayerCard
          v-for="player in teamPlayers"
          v-bind:data="player"
          v-bind:key="player.id"
          :player="player"
        />
      </v-layout>
      </v-container>
    </div>
  </v-card>
</template>

<script>
import Vue from 'vue'
import TeamView from './TeamView'
import PlayerCard from './PlayerCard'
import {mapGetters} from 'vuex'
import PlayersService from "./../../../api/playersService";

const playersService = new PlayersService();
const organizationId = localStorage.getItem("organization_id");

export default {
  name: 'players',
  components: {
    TeamView,
    PlayerCard,
  },
  computed: {
    ...mapGetters([
      'getTeam1Name',
      'getTeam2Name',
      'getOrganizationPlayers'
    ])
  },
  data() {
    return {
      team1: this.$store.getters.getTeam1Name,
      team2: this.$store.getters.getTeam2Name,
      teamPlayers: []
    }
  },
  mounted(){
    var playersArray = [];

    playersService.getOrganizationPlayers(organizationId)
      .then((players) => {
        players.data.forEach(player => {
          playersArray.push({name: player.name, id: player.id});
        });
      });

    this.teamPlayers = playersArray; 
  }
}

</script>