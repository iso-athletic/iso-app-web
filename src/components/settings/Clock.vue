<template>
  <div class="clock">
    <h3> Default scrimmage time </h3>
    <input class="specific-input" v-model="time" type="number" value="20" /> (In minutes) 
    <br />
    <v-btn @click="changeTimer(time)" dark round>Save</v-btn>
  </div>
</template>

<script>
import OrganizationsService from "../../api/organizationsService";

const organizationsService = new OrganizationsService();

export default {
  name: 'clock', // name of the component
  data () {
    return {}
  },
  methods: {
    changeTimer: function(newTime) {
      newTime *= 6000;
      this.$store.dispatch("updateTimer", newTime);
      organizationsService.updateDefaultTime(localStorage.getItem("organization_id"), newTime);
    }
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
