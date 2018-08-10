<template>
  <v-card class="noBackground scrimmageBorder">
    <v-layout column style="flex-grow: 1;">
      <v-container grid-list-md class="pa-2">
      <v-layout row wrap>
          <Action v-for="action in allActionNames"
          v-bind:data="action"
          v-bind:key="action.actionName"
          :actionName="action"/>
      </v-layout>
      </v-container>
      </v-layout>
  </v-card>
</template>

<script>
import Vue from 'vue'
import Action from './Action'

export default {
  name: 'actions',
  components: {
    Action
  },
  data() {
    return {
      allActionNames: [
        'Made Shot',
        'Made FT',
        'D-Rebound',
        'O-Rebound',
        'Assist',
        'Turnover',
        'Steal',
        'Block',
        'Foul',
        'Missed Shot',
        'Missed FT'
      ],
    } 
  },
}
</script>
