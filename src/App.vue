<template>
  <v-app dark>
    <v-toolbar v-if="!$store.state.IsScrimmageMode">
      <v-toolbar-title>Iso Athletic</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-and-down">
        <v-btn :to="'/'"
                      v-if="authenticated"
                      flat>
                      Dashboard
        </v-btn>
        <v-btn flat
               v-if="!authenticated"
               @click="login()">
               Log In
        </v-btn>
        <v-btn flat
               v-if="!authenticated"
               @click="login()">
               Sign Up
        </v-btn>
        <v-btn flat :to="{ path: '/settings', params: {} }"
                     v-if="authenticated">
                     Settings
        </v-btn>
        <v-btn flat
               v-if="authenticated"
               @click="logout()">
               Log Out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-toolbar dense color="blue" v-if="$store.state.IsScrimmageMode">
       <v-btn icon class="hidden-xs-only"
              :to="'/'"
              @click="resetIsScrimmageMode(false)">
              <v-icon>arrow_back</v-icon>
            </v-btn>
      <v-toolbar-title>Scrimmage Mode</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-btn
          :loading="loading"
          :disabled="loading"
          color="success"
          @click="endPractice" 
        >
          <span slot="loader" class="custom-loader">
            <v-icon light>cached</v-icon>
          </span>
          Finish Practice
        </v-btn>
    </v-toolbar>
    <v-content>
    <v-container fluid class="overall-container">
      <router-view
            :auth="auth"
            :authenticated="authenticated">
      </router-view>
    </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AuthService from "./auth/AuthService";
import EventsService from "./api/eventsService";
import DrillsService from "./api/drillsService";
import router from './router';

const auth = new AuthService();
const { login, logout, authenticated, authNotifier } = auth;

const eventsService = new EventsService();
const drillsService = new DrillsService();

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
    };
  },
  methods: {
    login,
    logout,
    resetIsScrimmageMode(bool) {
      this.$store.dispatch("updateIsScrimmageMode", bool);
    },
    endPractice() {
      this.loader = 'loading';

      var events = this.$store.getters.getEventList;
      var drillId = localStorage.getItem("drill_id");
      events.forEach(event => {
        eventsService.createEvent(event.player.id, null, event.action, drillId, event.position, event.timeStamp);
      });

      drillsService.endDrill(drillId);

      this.resetIsScrimmageMode(false);
      router.replace('home');
    }
  },
  computed: {
    isScrimmageMode: function() {
      return this.$store.getters.isScrimmageMode;
    }
  },
  watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      }
  }
};
</script>

<style lang="scss">
@import "scss/global.scss";

.custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>