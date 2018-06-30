<template>
  <div>
    <h1>Actions</h1>
    <Action v-for="action in allActionNames"
      :actionName="action"/>
  </div>
</template>

<script>
import Vue from 'vue'
import Action from './action'

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
        'Foul'
      ]
    }
  }
}
</script>
