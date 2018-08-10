<template>
  <div id="score">
    {{teamScore}}
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'score',
  props: {
    teamScore: Number
  }
}
</script>