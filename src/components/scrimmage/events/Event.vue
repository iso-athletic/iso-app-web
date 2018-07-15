<template>
  <v-card class="noBackground fullWidth bottomScrimmageBorder">
    <v-container fluid>
      <h3>{{actionEntry.player}}</h3>
      <div>{{actionEntry.action}}</div>
      <div>{{actionEntry.timeStamp}}</div>
      <div v-if="madeShot">{{shotValue}}-pointer</div>
    </v-container>
  </v-card>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'event',
  data() {
    return {
      shotValue: 0
    }
  },
  props: {
    actionEntry: Object,
    color: String,
  },
  computed: {
    madeShot: function() {
      if (this.actionEntry.action != "Made Shot") {
        return false;
      }
      if (this.actionEntry.position.threePointer) this.shotValue = 3;
      else this.shotValue = 2;
      return true;
    }
  }
}

</script>

<style>
  
</style>