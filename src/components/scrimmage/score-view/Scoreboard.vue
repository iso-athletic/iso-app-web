<template>
  <div id="scoreboard">
    <v-card color="blue-grey darken-2" class="white--text">
      <v-layout>
        <v-flex xs4>
          Purple
        </v-flex>
        <v-flex xs4>
          {{teamOneScore}}
        </v-flex>
        <v-flex xs4>
          {{teamTwoScore}}
        </v-flex>
        <v-flex xs4>
          White
        </v-flex>
      </v-layout>
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

