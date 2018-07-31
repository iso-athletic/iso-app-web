<template>
  <div>
    <v-layout class="my-2" row>
      <v-flex class="pl-4" sm11>
         <v-btn class="scrimmageButton mx-0"
                  :ripple="false"
                  @click="selectPlayer" v-bind:class={scrimmageButtonSelected:isSelected}>
                  {{playerName}}   
                  {{checkSelected}} 
          </v-btn>
      </v-flex>
      <v-flex>
           <v-btn id="deleteButton" flat icon color="error"
                  :ripple="false"
                  class="mx-0"
                  @click="removePlayer()">
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
      this.$store.dispatch("updatePlayer", this.playerName);
      if (this.$store.getters.getIfForgotTimer) this.$root.$emit('forgot', true);
    },
    removePlayer() {
      this.$store.dispatch("removePlayerFromTeam", this.playerName);
    }
  },
  data() {
    return {
      isSelected: false
    };
  },
  computed: {
    checkSelected() {
      if (this.playerName == this.$store.getters.getCurrentEvent.player)
        this.isSelected = true;
      else this.isSelected = false;
    }
  }
};
</script>

