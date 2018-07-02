<template>
  <div>
    <input max="59" min="0" type="number" v-model="minute">minute</input>
    <br />
    <input max="59" min="0" type="number" v-model="second">second</input>
    <v-btn @click="reset">reset</v-btn>
    <v-btn v-if="!isRunning" @click="start">start</v-btn>
    <v-btn v-if="isRunning" @click="stop">stop</v-btn>
    <p>time left: {{prettyTime}}</p>
  </div>
</template>

<script>
/************ TODO: ***********
 * make countdown change as timer value changes
 * allow user to change the timer directly instead of input vals
 * alert sound when timer done?
 */
import Vue from 'vue'

export default {
  name: 'timer',
  data() {
    return {
      // default minute and second values
      minute: 20,
      second: 0,
      decisecond: 0,
      totalTime: 0,
      timer: null,
      isRunning: false,
    }
  },
  methods: {
    start() {
      this.isRunning = true;
      // using deciseconds
      this.totalTime = this.minute*6000 + this.second*100 + this.decisecond;
      if (!this.timer) {
        this.timer = setInterval(() => {
          if (this.totalTime >= 0) {
            this.totalTime--;
            this.$store.dispatch('updateTime', this.prettyTime);
          } else {
            clearInterval(this.timer);
            alert("Timer done!");
            this.reset();
            // add some audio clip
          }
        }, 10);
      }
    },
    stop() {
      this.isRunning = false;
      clearInterval(this.timer);
      this.timer = null;
    },
    reset() {
      this.stop();
      this.totalTime = this.minute*6000 + this.second*100 + this.decisecond;
      this.$store.dispatch('updateTime', this.prettyTime);
    }
  },
  computed: {
    prettyTime() {
      let minute = Math.floor(this.totalTime / 6000);
      let second = Math.floor((this.totalTime - minute*6000)/100);
      let decisecond = this.totalTime - minute*6000 - second*100;

      let prettyMinute = minute < 10 ? "0" + minute.toString() : minute.toString();
      let prettySecond = second < 10 ? "0" + second.toString() : second.toString();
      let prettyDecisecond = decisecond< 10 ? "0" + decisecond.toString() : decisecond.toString();
      return prettyMinute + ":" + prettySecond + ":" + prettyDecisecond;
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