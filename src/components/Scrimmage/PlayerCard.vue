<template>
  <div>
    <v-layout row>
      <v-flex id="playerContainer" xs12>
           <v-btn id="deleteButton" flat icon color="error"
                  :ripple="false"
                  class="mx-0"
                  @click="$emit('remove-player', playerName)">
                  <v-icon id="deleteIcon">delete</v-icon>
          </v-btn>
          <v-btn  id="playerButton"
                  :ripple="false"
                  class="mx-0"
                  @click="selectPlayer">
                  {{playerName}}
                  
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

#playerContainer {
  margin-top: 5%;
}

#playerButton {
  float: right;
  width: 70%;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.15);
  outline: 1px solid #D1D1D1;
  box-shadow: 3px 3px 5px #666666;
  padding-left: 0;
  padding-right: 0;
}

#deleteButton {
  margin-left: 100px;
  float: right;
}
</style>
