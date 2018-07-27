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
            <Scoreboard ref="scores"/>
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
        <Events :occurredEvents="allEvents"/>
      </v-flex>
    </v-layout>
     <v-dialog v-model="forgotTimer" max-width="300">
      <v-card>
        <v-card-title>Please start the timer to add an event</v-card-title>
    </v-card>
    </v-dialog>

    <!-- we need this here so computed gets run, prob a better way, but returns nothing -->
    {{actionEventBuilt}}
  </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import Timer from './Timer'
import Court from './Court'
import Players from './players/Players'
import Scoreboard from './score-view/Scoreboard'
import Actions from './actions/Actions'
import Events from './events/Events'

var eventId;

export default {
  name: 'scrimmage',
  components: {
    Timer,
    Court,
    Players,
    Scoreboard,
    Actions,
    Events,
    moment
  },
  computed: {
    actionEventBuilt() {
      if (this.$store.getters.isComplete) {
        let newEvent = this.$store.getters.getEntry;
        let timeStamp = this.$store.getters.getTime;
        eventId++;
        newEvent.id = eventId;
        newEvent.timeStamp = timeStamp;
        this.allEvents.push(newEvent);
        if (newEvent.action == 'Made Shot' || newEvent.action == 'Made FT') {
            this.updateScore(newEvent);
        };
        this.$store.dispatch('resetAction');
      }
      else if ((this.$store.getters.getEntry.player != null ||
              this.$store.getters.getEntry.action != null ||
              this.$store.getters.getEntry.position != null) &&
              this.$store.getters.getTime == null) {
                this.forgotTimer = true;
                setTimeout(() => (this.forgotTimer = false), 1700);
      }
    }
  },
  data() {
    return {
      finishedAction: this.$store.getters.isComplete,
      allEvents: [],
      forgotTimer: false
    }
  },
  methods: {
    updateScore: function(event) {
      var amount;
      var scoreboard = this.$refs.scores;
      if (event.action == "Made FT"){
          amount = 1;
      } else {
          amount = event.position.threePointer ? 3 : 2;
      }
      scoreboard.increment(amount, event.team);
    },
  },
  mounted() {
    var offsetHeights = window.innerHeight - (document.getElementById('events').offsetTop + 15);
    var events = document.getElementById('events');
    events.style.height = offsetHeights + "px";
    eventId = 0;
  }
}
</script>

<style>

html {
  height: 100%;
  margin-top: 0px;
}

</style>
