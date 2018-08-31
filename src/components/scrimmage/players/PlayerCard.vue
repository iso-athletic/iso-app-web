<template>
  <div>
    <v-layout class="my-2" row>
      <v-flex class="pl-4" sm11>
         <v-btn class="scrimmageButton mx-0"
                  :ripple="false"
                  @click="selectPlayer" v-bind:class={scrimmageButtonSelected:isSelected}>
                  {{player.name}}   
                  {{checkSelected}} 
          </v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "playerCard",
  props: {
    player: Object
  },
  methods: {
    selectPlayer() {
      this.$store.dispatch("updatePlayer", this.player);
      this.$store.dispatch("updateActiveTeam", this.determinePlayersTeam(this.player))
      if (this.$store.getters.getIfForgotTimer) this.$root.$emit('forgot', true);
    },
    determinePlayersTeam(activePlayer){
      var teamOne = false;
      this.$store.getters.getTeamPlayers(1).forEach(player => {
        if (player.id == activePlayer.id){
          teamOne = true;
        }
      });
      var teamId = teamOne ? this.$store.getters.getTeamId(1) : this.$store.getters.getTeamId(2);
      return teamId;
    },
    removePlayer() {
      this.$store.dispatch("removePlayerFromTeam", this.player);
    }
  },
  data() {
    return {
      isSelected: false
    };
  },
  computed: {
    checkSelected() {
      if (this.$store.getters.getCurrentEvent.player != null && this.player.name == this.$store.getters.getCurrentEvent.player.name)
        this.isSelected = true;
      else this.isSelected = false;
    },
  }
};
</script>