<template>
  <div id="actionContainer">
    <v-btn id="actionButton" @click="selectAction">{{actionName}}</v-btn>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'action',
    props: {
      actionName: String,
    },
    methods: {
      selectAction() {
        if (this.$store.getters.isComplete) {
          // do fun stuff here
        }
        this.$store.dispatch('updateAction', this.actionName);
      }
    }
    
  }
</script>

<style>

/* to align the buttons */
#actionContainer {
  margin-top: 30px;
  margin-left: 3.33%;
  width: 30%;
}
#actionButton {
  width: 80%;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.15);
  outline: 1px solid #D1D1D1;
  margin: auto;
  box-shadow: 3px 3px 5px #666666;
}
</style>
