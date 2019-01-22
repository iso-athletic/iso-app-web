<template>
<v-app dark>
  <v-toolbar v-if="!$store.state.IsScrimmageMode">
    <v-toolbar-title v-if="authenticated">Iso Athletic +
      <img alt="Logo" ref="logo" id="logo" height="20px" :src="this.organizationLogo"/>
      </v-toolbar-title>
      <v-toolbar-title v-if="!authenticated">Iso Athletic</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-and-down">
        <v-btn :to="'/'" v-if="authenticated" flat>
          Dashboard
        </v-btn>
        <v-btn flat v-if="!authenticated" @click="login()">
          Log In
        </v-btn>
        <v-btn flat v-if="!authenticated" @click="login()">
          Sign Up
        </v-btn>
        <v-btn flat :to="{ path: '/settings', params: {} }"
                     v-if="authenticated">
                     Settings
        </v-btn>
        <v-btn flat v-if="authenticated" @click="logout()">
          Log Out
        </v-btn>
      </v-toolbar-items>
  </v-toolbar>
  <v-toolbar dense color="blue" v-if="$store.state.IsScrimmageMode">
    <v-btn icon class="hidden-xs-only" :to="'/'" @click="resetIsScrimmageMode(false)">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-toolbar-title>{{$store.state.PracticeName}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn :loading="loading" :disabled="loading" color="success" @click="endPractice">
      <span slot="loader" class="custom-loader">
            <v-icon light>cached</v-icon>
          </span>
      Finish {{$store.state.PracticeName}}
    </v-btn>
  </v-toolbar>
  <v-content>
    <v-container fluid class="overall-container">
      <router-view :auth="auth" :authenticated="authenticated">
      </router-view>
    </v-container>
  </v-content>
</v-app>
</template>

<script>
import AuthService from "./auth/AuthService";
import EventsService from "./api/eventsService";
import DrillsService from "./api/drillsService";
import OrganizationsService from "./api/organizationsService";
import StatsService from "./api/statsService";
import PlayersService from "./api/playersService";
import router from "./router";
import moment from "moment";

const auth = new AuthService();
const {
  login,
  logout,
  authenticated,
  authNotifier
} = auth;

const eventsService = new EventsService();
const drillsService = new DrillsService();
const organizationsService = new OrganizationsService();
const statsService = new StatsService();
const playersService = new PlayersService;

const organizationId = localStorage.getItem("organization_id");

export default {
  name: "app",
  data() {
    authNotifier.on("authChange", authState => {
      this.authenticated = authState.authenticated;
    });
    return {
      auth,
      authenticated,
      loader: null,
      loading: false,
      organizationLogo: null,
      defaultTime: null,
      initialState: {}
    };
  },
  methods: {
    login,
    logout,
    resetIsScrimmageMode(bool) {
      this.$store.dispatch("updateIsScrimmageMode", bool);
    },
    makeAsyncCreateEventCall(params, callback) {
      return new Promise(function(fulfill, reject) {
        params.events.forEach(event => {
          eventsService.createEvent(
            event.player.id,
            event.teamId,
            event.action,
            params.drillId,
            event.position,
            event.timeStamp
          );
        });

        fulfill("Ok");
        reject("Error");
      });
    },
    endPractice() {
      this.loader = "loading";
      this.loading = true;

      var events = this.$store.getters.getEventList;
      var drillId = localStorage.getItem("drill_id");
      this.makeAsyncCreateEventCall({
        "events": events,
        "drillId": drillId
      }).then(() => {
        drillsService.endDrill(drillId).then(() => {
          statsService.updateStatsTable(organizationId, moment().format('YYYY-MM-DD')).then(() => {
            this.loader = null;
            this.loading = false;
            this.$store.replaceState(this.initialState);
            this.resetIsScrimmageMode(false);
            this.$store.dispatch("resetTimer");
            router.replace("home");
          })
        });
      });
    },
    loadLogo() {
      var logoString = "";
      var localStorageLogo = localStorage.getItem("organization_logo");
      if (localStorageLogo) {
        this.organizationLogo = localStorageLogo;
      } else {
        organizationsService
          .getOrganizationInfo(localStorage.getItem("organization_id"))
          .then(response => {
            logoString = response.data.logo;
            this.organizationLogo = logoString;
            localStorage.setItem("organization_logo", logoString);
          });
      }
    },
    loadTime() {
      organizationsService
        .getOrganizationInfo(localStorage.getItem("organization_id"))
        .then(response => {
          this.$store.dispatch("updateTimer", response.data.default_time);
        })
    }
  },
  computed: {
    isScrimmageMode: function() {
      return this.$store.getters.isScrimmageMode;
    }
  },
  mounted() {
    this.loadLogo();
    this.loadTime();
    this.initialState = JSON.parse(JSON.stringify(this.$store.state));
  }
};
</script>

<style lang="scss">
@import "scss/global.scss";
</style>
