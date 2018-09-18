<template>
  <v-flex xs4>
    <v-btn class="scrimmageButton ma-0 pa-0" 
      v-bind:class="{scrimmageButtonSelected:isSelected}"  
      @click="selectAction" 
      :ripple="false">
        {{actionName}}
    </v-btn>
  {{checkSelected}}
  </v-flex>
</template>

<script>
import Vue from "vue";
export default {
  name: "action",
  props: {
    actionName: String
  },
  methods: {
    selectAction() {
      if (this.$store.getters.getIfForgotTimer) this.$store.dispatch("updateDisplayForgotTimer", true);
      else this.$store.dispatch("updateAction", this.actionName);
    }
  },
  data() {
    return {
      isSelected: false
    };
  },
  computed: {
    checkSelected() {
      if (this.actionName == this.$store.getters.getCurrentEvent.action)
        this.isSelected = true;
      else this.isSelected = false;
    }
  }
};
</script>

<style>
</style>
