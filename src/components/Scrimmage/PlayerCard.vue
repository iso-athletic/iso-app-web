<template>
  <div>
    <v-btn @click="selectPlayer">{{playerName}}</v-btn>
    <v-btn @click="$emit('remove-player', playerName)"><v-icon>delete</v-icon></v-btn>
    {{playerlog}}
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'playerCard',
    props: {
      playerName: String,
    },
    computed: {
      playerlog() {
        return this.$store.getters.getEntry;
      }
    },
    methods: {
      selectPlayer() {
        if (this.$store.getters.isComplete) {
          // do fun stuff here
        }
        this.$store.dispatch('updatePlayer', this.playerName);
      }
    }
    
  }
</script>