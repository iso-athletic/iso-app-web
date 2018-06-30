<template>
  <div>
    <v-btn>{{playerName}}</v-btn>
    <v-btn @click="$emit('remove-player', playerName)"><v-icon>delete</v-icon></v-btn>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'playerCard',
    props: {
      playerName: String,
    },
    methods: {
      removePlayer() {
      }
    }
    
  }
</script>