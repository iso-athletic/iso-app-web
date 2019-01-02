<template>
  <v-card class="noBackground scrimmageBorder">
    <v-container fluid>
      <v-container grid-list-xl>
      <v-layout row wrap>
          <Action v-for="action in allActionNames"
          v-bind:data="action"
          v-bind:key="action.actionName"
          :actionName="action"/>
      </v-layout>
      </v-container>
    </v-container>
  </v-card>
</template>

<script>
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
