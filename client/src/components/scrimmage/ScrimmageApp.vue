<template>
  <div class="mb-10 noBackground">
    <v-layout row wrap>
      <v-flex md5>
        <v-layout row wrap>
          <v-flex d-flex md12 id="timer">
            <Timer />
          </v-flex>
          <v-flex d-flex md12 class="mt-2 mr-2" id="court">
            <Court />
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex md5>
        <v-layout fill-height row wrap>
          <v-flex d-flex md12>
            <Scoreboard/>
          </v-flex>
          <v-flex d-flex md12>
            <Players />
          </v-flex>
          <v-flex d-flex md12>
            <Actions />
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs2>
        <Events :occurredEvents="getEventList"/>
      </v-flex>
    </v-layout>
     <v-dialog v-if="forgotTimer" @close="forgotTimer = false" max-width="300">
      <v-card>
        <v-card-title>Please start the timer to add an event</v-card-title>
        <v-btn @click="$emit('close')">OK</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import moment from "moment";
import Timer from "./Timer";
import Court from "./Court";
import Players from "./players/Players";
import Scoreboard from "./score-view/Scoreboard";
import Actions from "./actions/Actions";
import Events from "./events/Events";
import { mapGetters } from "vuex";

export default {
  name: "scrimmage",
  components: {
    Timer,
    Court,
    Players,
    Scoreboard,
    Actions,
    Events,
    moment
  },
  data () {
    return {
      forgotTimer: false
    }
  },
  computed: {
    ...mapGetters([
       "getEventList"
    ]),
  },
  methods: {
    toggleForgotTimerDialog: function(isForgotten) {
      this.forgotTimer = isForgotten;
    }
  },
  mounted() {
    var offsetHeights =
      window.innerHeight - (document.getElementById("events").offsetTop + 15);
    var events = document.getElementById("events");
    events.style.height = offsetHeights + "px";
    this.$root.$on('forgot', this.toggleForgotTimerDialog);
  }
};
</script>

<style>
html {
  height: 100%;
  margin-top: 0px;
}
</style>
