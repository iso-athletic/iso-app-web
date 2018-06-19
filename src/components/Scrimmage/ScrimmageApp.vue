<template>
  <div>
    <Timer />
  </div>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'
import Timer from './Timer.vue'


export default {
  name: 'scrimmage',
  components: {
    Timer,
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