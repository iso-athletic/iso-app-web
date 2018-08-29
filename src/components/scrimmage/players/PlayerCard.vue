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
      if (this.$store.getters.getIfForgotTimer) this.$root.$emit('forgot', true);
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
      if (this.$store.getters.getCurrentEvent.player != null && this.player.name == this.$store.getters.getCurrentEvent.player)
        this.isSelected = true;
      else this.isSelected = false;
    },
  }
};
</script>