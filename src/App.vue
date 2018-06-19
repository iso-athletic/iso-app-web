<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">Iso Athletic</a>
        </div>
        <div class="navbar-nav">
          <router-link :to="'/'"
            v-if="authenticated"
            class="nav-item nav-link">
              Home
          </router-link>
          <a
            class="nav-item nav-link"
            v-if="!authenticated"
            @click="login()">
              Log In
          </a>
          <a
            class="nav-item nav-link"
            v-if="!authenticated"
            @click="login()">
              Sign Up
          </a>
          <router-link :to="{ path: '/settings', params: {} }"
            v-if="authenticated"
            class="nav-item nav-link">
            Settings
          </router-link>
          <a
            class="nav-item nav-link"
            v-if="authenticated"
            @click="logout()">
              Log Out
          </a>
        </div>
      </div>
    </nav>

    <div class="container">
      <router-view
        :auth="auth"
        :authenticated="authenticated">
      </router-view>
    </div>
  </div>
</template>

<script>
import AuthService from './auth/AuthService'

const auth = new AuthService()

const { login, logout, authenticated, authNotifier } = auth

import testAPI from './apis/get'

const test = new testAPI()

// const { getData } = test

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
    logout,
    // getData
  }
}
</script>

<style>

body {
  background-image: url("assets/stadium_background.jpg");
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.btn-margin {
  margin-top: 7px
}
</style>
