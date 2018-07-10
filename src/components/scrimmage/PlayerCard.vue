<template>
  <div>
    <v-layout row>
      <v-flex xs12>
          <v-btn :ripple="false"
                  class="mx-0"
                  @click="selectPlayer">
                  {{playerName}}
          </v-btn>
          <v-btn flat icon color="error"
                  :ripple="false"
                  class="mx-0"
                  @click="$emit('remove-player', playerName)">
                  <v-icon>delete</v-icon>
          </v-btn>
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

<style>
</style>
