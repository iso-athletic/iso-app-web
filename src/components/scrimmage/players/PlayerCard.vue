<template>
  <div>
    <v-layout class="my-2" row>
      <v-flex class="pl-4" sm11>
         <v-btn class="scrimmageButton mx-0"
                  :ripple="false"
                  @click="selectPlayer">
                  {{playerName}}
                  
          </v-btn>
      </v-flex>
      <v-flex>
           <v-btn id="deleteButton" flat icon color="error"
                  :ripple="false"
                  class="mx-0"
                  @click="$emit('remove-player', playerName)">
                  <v-icon id="deleteIcon">delete</v-icon>
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
    playerName: String
  },
  methods: {
    selectPlayer() {
      if (this.$store.getters.isComplete) {
        // do fun stuff here
      }
      this.$store.dispatch("updatePlayer", this.playerName);
      this.$store.dispatch("updateTeam", this.$parent.TeamName);
    }
  }
};
</script>

