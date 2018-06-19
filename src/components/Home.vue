<template>
  <div>
    <h4 v-if="authenticated">
        You are logged in!
    </h4>
    <h4 v-if="!authenticated">
      You are not logged in! Please <a @click="auth.login()">Log In</a> or Sign Up to continue.
    </h4>
  </div>
</template>

<script>
  export default {
    name: 'home',
    props: ['auth', 'authenticated']
  }
</script>

<style>
  html {
    height: 100%;
    margin: 0;
  }
  body {
    background-image: url("../assets/stadium_background.jpg");
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
