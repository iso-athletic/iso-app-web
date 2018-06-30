<template>
  <div>
    <v-btn @click="selectAction">{{actionName}}</v-btn>
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