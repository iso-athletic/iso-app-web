<template>
  <div class="mb-10 noBackground">
    <v-layout row>
        <v-layout column style="flex-grow: 0;">
          <v-layout d-flex id="timer" class="mb-2 mr-2" style="flex-shrink: 0; flex-grow: 0;">
            <Timer />
          </v-layout>
          <v-flex d-flex md4 class="my-2 mr-2" style="flex-grow: 1;">
            <Players />
          </v-flex>
          <v-layout d-flex class="mt-2 mr-2" style="flex-shrink: 0; flex-grow: 1;" >
            <Actions/>
          </v-layout>
        </v-layout>
        <v-layout row wrap md5 style="flex-shrink: 0; flex-grow:0;">
          <v-flex d-flex md12 class="mx-2 mb-2">
            <Scoreboard/>
          </v-flex>
          <v-flex d-flex md12 class="mt-2 mx-2" id="court">
            <Court />
          </v-flex>
        </v-layout>
        <v-layout class="events" style="flex-shrink: 0; flex-grow: 1; width:13rem; height:82vh">
          <v-flex class="ml-2">
            <Events :occurredEvents="getEventList"/>
        </v-flex>
        </v-layout>
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
};
</script>

<style>
.full-height {
  height: 92vh;
}
</style>
