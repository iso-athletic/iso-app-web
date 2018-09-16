<template>
  <v-app dark>
    <v-toolbar dense v-if="!$store.state.IsScrimmageMode">
      <v-toolbar-title v-if="authenticated">Iso Athletic + 
        <img alt="Logo" id="logo" height="20px" :src="this.loadLogo()"/>
      </v-toolbar-title>
      <v-toolbar-title v-if="!authenticated">Iso Athletic</v-toolbar-title>
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
        <v-container class="py-1" fill-height>
        <v-menu :nudge-width="100">
        <v-toolbar-title slot="activator">
          <span>
            <v-avatar size="36px" v-if="authenticated" color="indigo">
              <v-icon dark>account_circle</v-icon>
            </v-avatar>
          </span>
        </v-toolbar-title>
        
          <v-list>
          <v-list-tile :to="{ path: '/settings', params: {} }">
            <v-list-tile-title
              >Settings
              </v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title
              @click="logout()">Log Out</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
        </v-container>
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
import OrganizationsService from "./api/organizationsService";
import router from "./router";

const auth = new AuthService();
const { login, logout, authenticated, authNotifier } = auth;

const eventsService = new EventsService();
const drillsService = new DrillsService();
const organizationsService = new OrganizationsService();

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
      loading: false
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

      var events = this.$store.getters.getEventList;
      var drillId = localStorage.getItem("drill_id");
      this.makeAsyncCreateEventCall({ events: events, drillId: drillId }).then(
        () => {
          drillsService.endDrill(drillId).then(() => {
            this.resetIsScrimmageMode(false);
            router.replace("home");
          });
        }
      );
    },
    loadLogo() {
      var logoString = "";
      organizationsService
        .getOrganizationInfo(localStorage.getItem("organization_id"))
        .then(response => {
          logoString = response.data.logo;
          var logo = document.getElementById("logo");
          logo.src = logoString;
        });
    }
  },
  computed: {
    isScrimmageMode: function() {
      return this.$store.getters.isScrimmageMode;
    }
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
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