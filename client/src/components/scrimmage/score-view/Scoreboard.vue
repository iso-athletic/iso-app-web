<template>
  <div id="scoreboard" style="align-content: center; text-align: center; flex-shrink: 0;">
    <v-card class="noBackground scrimmageBorder">
    <v-container fluid class="pa-2">
      <v-layout row align-center style="flex-shrink: 0;">
        <v-flex>
            <h2 class="text-md-center">Purple</h2>
        </v-flex>
        <v-flex>
          <div class="large-text text-md-center">{{teamOneScore}}</div>
        </v-flex> 
        <v-flex>
          <div class="large-text text-md-center">{{teamTwoScore}}</div>
        </v-flex>
        <v-flex>
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
import {mapGetters} from 'vuex'

export default {
  name: "scoreboard",
  components: {
    Score
  },
  computed: {
    teamOneScore(){return this.$store.getters.getTeam1Score},
    teamTwoScore(){return this.$store.getters.getTeam2Score}
  },
};
</script>

