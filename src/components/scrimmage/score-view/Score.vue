<template>
  <div id="score">
    {{team_score}}
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'score',
  data() {
    return {
      team_score: 0
    }
  }
}
</script>