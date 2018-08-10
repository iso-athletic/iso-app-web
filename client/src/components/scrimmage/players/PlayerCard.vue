<template>
  <v-layout row>
        <v-btn block class="scrimmageButton mx-0"
                :ripple="false"
                @click="selectPlayer" v-bind:class={scrimmageButtonSelected:isSelected}>
                {{playerName}}   
                {{checkSelected}} 
        </v-btn>
  </v-layout>
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

