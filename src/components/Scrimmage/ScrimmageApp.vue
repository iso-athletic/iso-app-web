<template>
  <div>
    <Timer />
    <Court />
    <Players />
  </div>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'
import Timer from './Timer.vue'
import Court from './Court.vue'
import Players from './Players.vue'


export default {
  name: 'scrimmage',
  components: {
    Timer,
    Court,
    Players,
  }
}
</script>

<style>

  html {
      height: 100%;
      margin: 0;
  }
  
  body {
      color: white;
      background-color: black;
  }

</style>