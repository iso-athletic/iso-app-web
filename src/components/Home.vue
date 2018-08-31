<template>
  <div>
    <h4 v-if="authenticated">
        <v-btn :to="{ path: '/scrimmage', params: {} }" @click="newSessionAndDrill" color="primary">New Scrimmage</v-btn>
    </h4>
    <h4 v-if="!authenticated">
      You are not logged in! Please <a @click="auth.login()">Log In</a> or Sign Up to continue.
    </h4>
  </div>
</template>

<script>
import DrillsService from './../api/drillsService';

const drillsService = new DrillsService;
export default {
  name: "home",
  props: ["auth", "authenticated"],
  methods: {
    newSessionAndDrill() {
      this.$store.dispatch("updateIsScrimmageMode", true);
      var organization_id = localStorage.getItem("organization_id");
      drillsService.createSession(organization_id);
    }
  }
};
</script>

<style>
html {
  height: 100%;
  margin: 0;
}
body {
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
}

a {
  cursor: pointer;
}
</style>
