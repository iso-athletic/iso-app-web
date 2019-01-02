<template>
  <div class="mb-10 noBackground" id="scrimmageAppContainer">
    <v-layout row wrap>
      <v-flex md5>
        <v-layout column>
          <v-flex d-flex md12 id="timer" class="mb-2 mr-2">
            <Timer />
          </v-flex>
          <v-flex d-flex md12 class="my-2 mr-2 playersContainer">
            <Players />
          </v-flex>
          <v-flex d-flex md12 class="mt-2 mr-2">
            <Actions />
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex md5 >
        <div>
          <v-flex class="mx-2 mb-2">
            <Scoreboard/>
          </v-flex>
          <v-flex class="mx-2 mt-3" id="court">
            <Court />
          </v-flex>
        </div>
      </v-flex>
      <v-flex xs2 class="containEvents">
        <v-layout row wrap full-height>
          <v-flex class="ml-2">
            <Events :occurredEvents="getEventList"/>
        </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
     <v-dialog v-model="forgotTimer" @close="closeDisplayForgotTimer" max-width="300">
        <v-card>
          <v-card-title>Please start the timer to add an event</v-card-title>
          <v-btn @click="closeDisplayForgotTimer">OK</v-btn>
        </v-card>
    </v-dialog> 
    {{updateForgotTimer}}
    <EditTeam/>
  </div>
</template>

<script>
import moment from "moment";
import Timer from "./Timer";
import Court from "./Court";
import Players from "./players/Players";
import Scoreboard from "./score-view/Scoreboard";
import Actions from "./actions/Actions";
import Events from "./events/Events";
import EditTeam from './players/EditTeam';
import { mapGetters } from "vuex";
import PlayersService from "./../../api/playersService";
import TeamsService from "./../../api/teamsService";
import Axios from "axios";

const playersService = new PlayersService();
const teamsService = new TeamsService();
var organizationId = localStorage.getItem("organization_id");

export default {
  name: "scrimmage",
  components: {
    Timer,
    Court,
    Players,
    Scoreboard,
    Actions,
    Events,
    moment,
    EditTeam
  },
  data () {
    return {
      forgotTimer: false,
      eventsHeight: 0
    }
  },
  computed: {
    ...mapGetters([
       "getEventList",
       "getIfForgotTimer"
    ]),
    updateForgotTimer() {
      this.forgotTimer = this.$store.getters.getDisplayForgotTimer;
    }
  },
  methods: {
    closeDisplayForgotTimer() {
      this.$store.dispatch("updateDisplayForgotTimer", false);
    }
  },
  created() {
    this.$store.dispatch("updateOrganizationPlayers", []);
    var playersArray = [];

    Axios.all([playersService.getOrganizationPlayers(organizationId)])
      .then(Axios.spread(function (players) {
        players.data.forEach(player => {
          playersArray.push({name: player.name, id: player.id, number: player.jersey_number});
        });
      }));

    this.$store.dispatch("updateOrganizationPlayers", playersArray);
  },
  mounted() {
    setTimeout(() => {
      if ((this.$store.getters.getTeamPlayers(1).length == 0)
        && this.$store.state.IsCompetitiveDrill == true) {
        this.$store.dispatch("editTeams");
      }
    }, 1250);

    if (!this.$store.state.IsCompetitiveDrill){
        var allPlayersIds = [];
        var playersAvailable = this.$store.getters.getOrganizationPlayers;

        playersAvailable.forEach(player => {
          allPlayersIds.push(player.id);
        });

        var drillId = localStorage.getItem("drill_id");

        teamsService.createTeam(allPlayersIds, 'Drill Team', drillId)
          .then((res) => {
            this.$store.dispatch("updateTeamId", [res.data.id, 2]);
          })
        return;
    }
  },
  updated() {
    if (document.getElementById('events')){
      /* to prevent overflow of events container we need a pixel height */
      let eventsHeight = document.getElementById('events').offsetHeight;
      document.getElementById('events').style.height = eventsHeight + "px";
    }
  },
  watch: {
    forgotTimer (val) {
      if (!val) {
        this.$store.dispatch("updateDisplayForgotTimer", false);
      }
    },
  },
};
</script>