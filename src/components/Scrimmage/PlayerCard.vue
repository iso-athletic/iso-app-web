<template>
  <div>
    <v-layout row>
      <v-flex xs12>
        <div class="text-xs-center">
          <v-btn @click="selectPlayer">{{playerName}}</v-btn>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <div class="text-xs-center">
          <v-btn @click="$emit('remove-player', playerName)"><v-icon>delete</v-icon></v-btn>
        </div>
      </v-flex>
    </v-layout>
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
      selectPlayer() {
        if (this.$store.getters.isComplete) {
          // do fun stuff here
        }
        this.$store.dispatch('updatePlayer', this.playerName);
      }
    }

  }
</script>
