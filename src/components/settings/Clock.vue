<template>
  <div class="clock">
    <h3> Default scrimmage time </h3>
    <input class="specific-input" type="number" value="20" /> (In minutes) 
    <br />
    <v-btn dark round>Save</v-btn>
  </div>
</template>

<script>
export default {
  name: 'clock', // name of the component
  data () {
    return {}
  },
  methods: {

  },
  props: ['time'],
  }
</script>

<style>
.clock {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #FFFFFF;
  margin-top: 60px;
}

input {
  margin-bottom: 10px;
}

.specific-input {
  outline: 1px solid white
}
</style>
