<template>
  <v-app dark>
    <v-toolbar>
      <v-toolbar-title>Iso Athletic</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn :to="'/'"
                      v-if="authenticated"
                      flat>
                      Home
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
    <v-container fluid>
      <router-view
            :auth="auth"
            :authenticated="authenticated">
      </router-view>
    </v-container>
  </v-app>
</template>

<script>
import AuthService from './auth/AuthService'

const auth = new AuthService()

const { login, logout, authenticated, authNotifier } = auth

export default {
  name: 'app',
  data () {
    authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated
    })
    return {
      auth,
      authenticated
    }
  },
  methods: {
    login,
    logout
  }
}
</script>

<style>
  #app {
    background: url('assets/background.jpg');
    background-size: 100% 100%;
  }

  .scrimmageButton {
    width: 100%;
    box-sizing: border-box;
    background: linear-gradient(rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.1) 99%);
    background: -webkit-linear-gradient(rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.1) 99%);
    outline: 1px solid #D1D1D1;
    transition: background 0.5s;
    -moz-transition: background 0.5s;
    -webkit-transition: background 0.5s;
    -o-transition: background 0.5s;
  }

  .noBackground {
    background: none !important;
  }

   .scrimmageBorder {
    border: 1px solid #D1D1D1;
  }

  .fullWidth {
    width: 100%;
  }

  .translucentBackground {
  background: rgba(255, 255, 255, 0.1) !important;
  }

  .bottomScrimmageBorder {
    border-bottom: 1px solid #D1D1D1;
  }

  .iceBlueBackgroundButton {
    background: rgb(52, 145, 173, 0.9) !important;
  }

  .scrimmageButtonSelected {
    background: rgba(52, 145, 173, 0.8) !important;
    transition: background 0s;
    -moz-transition: background 0s;
    -webkit-transition: background 0s;
    -o-transition: background 0s;
  }
  
  /* undoing the animation effect that v-btn uses which looked bad */
  .scrimmageButton--active:before, .scrimmageButton:focus:before, .scrimmageButton:hover:before {
    background-color: rgba(0,0,0,0) !important;
}


</style>
