<template>
  <div>
    <input max="59" min="0" type="number" v-model="minute">minute</input>
    <br />
    <input max="59" min="0" type="number" v-model="second">second</input>
    <v-btn @click="start">start</v-btn>
    <p>time left: {{prettyTime}}</p>
  </div>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'

export default {
  name: 'timer',
  data() {
    return {
      // default minute and second values
      minute: 20,
      second: 0,
      totalTime: 0,
    }
  },
  methods: {
    start() {
      this.totalTime = this.minute*60 + this.second;
      setInterval(() => {
        this.totalTime--;
        this.minute = Math.floor(this.totalTime / 60);
        this.second = this.totalTime - this.minute*60;
      }, 1000);
    }
  },
  computed: {
    prettyTime() {
      let prettyMinute = this.minute < 10 ? "0" + this.minute.toString() : this.minute.toString();
      let prettySecond = this.second < 10 ? "0" + this.second.toString() : this.second.toString();
      return prettyMinute + ":" + prettySecond;
    }
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