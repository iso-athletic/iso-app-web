<template>
  <v-app dark>
    <v-toolbar class="translucentBackground">
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
    background: url('Media/background.jpg');
    background-size: 100% 100%;
  }



  .scrimmageButton {
    width: 100%;
    box-sizing: border-box;
    background: linear-gradient(rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.1) 99%);
    outline: 1px solid #D1D1D1;
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
</style>
