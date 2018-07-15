<template>
  <v-flex xs4>
    <v-btn class="scrimmageButton ma-0 pa-0"  @click="selectAction">{{actionName}}</v-btn>
  </v-flex>
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


</style>
