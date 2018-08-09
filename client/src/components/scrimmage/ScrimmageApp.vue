<template>
  <div class="mb-10 noBackground">
    <v-layout row wrap>
      <v-flex md5 fill-height>
        <v-layout row wrap>
          <v-flex d-flex md12 id="timer" class="mb-2 mr-2">
            <Timer />
          </v-flex>
          <v-flex d-flex md12 class="my-2 mr-2">
            <Players />
          </v-flex>
          <v-flex d-flex md12 class="mt-2 mr-2">
            <Actions />
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex md5 fill-height>
        <v-layout row wrap>
          <v-flex d-flex md12 class="mx-2 mb-2">
            <Scoreboard/>
          </v-flex>
          <v-flex d-flex md12 class="mt-2 mx-2" id="court">
            <Court />
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs2>
        <v-layout class="events" row wrap>
          <v-flex class="ml-2">
            <Events :occurredEvents="getEventList"/>
        </v-flex>
        </v-layout>
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
    // I hate computing this but idk how else to get a fixed events bar 
    var offsetHeights =  window.innerHeight + 15 - (document.getElementById("events").offsetTop);
    var events = document.getElementById("events");
    events.style.height = offsetHeights + "px";
    this.$root.$on('forgot', this.toggleForgotTimerDialog);
  }
};
</script>

<style>
.full-height {
  height: 92vh;
}
</style>
