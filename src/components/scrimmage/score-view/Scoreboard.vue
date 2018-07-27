<template>
  <div id="scoreboard">
    <v-card class="noBackground scrimmageBorder mx-2 my-2">
    <v-container fluid>
      <v-layout row>
        <v-flex xs3>
            <h2 class="text-md-center">Purple</h2>
        </v-flex>
        <v-flex xs3>
          <div class="large-text text-md-center">{{teamOneScore}}</div>
        </v-flex> 
        <v-flex xs3>
          <div class="large-text text-md-center">{{teamTwoScore}}</div>
        </v-flex>
        <v-flex xs3>
          <h2 class="text-md-center">White</h2>
        </v-flex> 
      </v-layout>
    </v-container>
  </v-card>
  </div>
</template>

<script>
import Vue from "vue";
import Score from "./Score.vue";

export default {
  name: "scoreboard",
  data() {
    return {
      teamOneScore: 0,
      teamTwoScore: 0
    };
  },
  components: {
    Score
  },
  methods: {
    increment: function(amount, team){
      if (team == "Purple") {
        this.teamOneScore += amount;
      }
      else {
        this.teamTwoScore += amount;
      }
    },
    reset: function(team) {
      if (team == 1) {
        this.teamOneScore = 0;
      } else {
        this.teamTwoScore = 0;
      }
    }
  }
};
</script>

