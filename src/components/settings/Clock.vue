<template>
  <div class="clock">
    <h3> Select the running time for each game </h3>
    <input type="number" value="20"> (In minutes)</input>
    <br />
    <button class="btn btn-secondary save">Save</button>
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
  color: #2c3e50;
  margin-top: 60px;
}

input {
  margin-bottom: 10px;
}
</style>
