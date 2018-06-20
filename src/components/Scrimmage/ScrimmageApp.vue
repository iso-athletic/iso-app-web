<template>
  <div>
    <Timer />
    <Court />
  </div>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'
import Timer from './Timer.vue'
import Court from './Court.vue'


export default {
  name: 'scrimmage',
  components: {
    Timer,
    Court,
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