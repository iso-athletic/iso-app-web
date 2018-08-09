<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-list dense>
        <v-list-tile :to="'/'">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{ path: '/settings', params: {} }">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="authenticated" @click="logout()">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Iso Athletic</v-toolbar-title>
    </v-toolbar>
    <v-content>
    <v-container fluid>
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

const auth = new AuthService();

const { login, logout, authenticated, authNotifier } = auth;

export default {
  name: "app",
  data() {
    authNotifier.on("authChange", authState => {
      this.authenticated = authState.authenticated;
    });
    return {
      drawer: false,
      auth,
      authenticated
    };
  },
  methods: {
    login,
    logout
  }
};
</script>

<style>

  * {
    -webkit-print-color-adjust: exact;
  }

  #app {
    background: url('assets/background.jpg');
    background-size: 100% 100%;
  }

.scrimmageButton {
  width: 100%;
  box-sizing: border-box;
  background: linear-gradient(
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0.1) 99%
  );
  background: -webkit-linear-gradient(
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0.1) 99%
  );
  outline: 1px solid #d1d1d1;
  transition: background 0.5s;
  -moz-transition: background 0.5s;
  -webkit-transition: background 0.5s;
  -o-transition: background 0.5s;
}

.noBackground {
  background: none !important;
}

.scrimmageBorder {
  border: 1px solid #d1d1d1;
}

.fullWidth {
  width: 100%;
}

.translucentBackground {
  background: rgba(255, 255, 255, 0.1) !important;
}

.bottomScrimmageBorder {
  border-bottom: 1px solid #d1d1d1;
}

.iceBlueBackgroundButton {
  background: #4695EC !important;
}

.scrimmageButtonSelected {
  background: #4695EC !important;
  transition: background 0s;
  -moz-transition: background 0s;
  -webkit-transition: background 0s;
  -o-transition: background 0s;
}
  
/* undoing the animation effect that v-btn uses which looked bad */
.scrimmageButton--active:before, .scrimmageButton:focus:before, .scrimmageButton:hover:before {
  background-color: rgba(0,0,0,0) !important;
}
  

.scrimmageButtonSelected {
  background: rgba(52, 145, 173, 0.8) !important;
  transition: background 0s;
  -moz-transition: background 0s;
  -webkit-transition: background 0s;
  -o-transition: background 0s;
}

/* undoing the animation effect that v-btn uses which looked bad */
.scrimmageButton--active:before,
.scrimmageButton:focus:before,
.scrimmageButton:hover:before {
  background-color: rgba(0, 0, 0, 0) !important;
}
</style>
