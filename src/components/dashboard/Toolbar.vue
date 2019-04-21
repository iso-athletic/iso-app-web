<template>
<v-toolbar color="#fafafa" dense class="elevation-0" app v-if="!$store.state.IsScrimmageMode">
      <v-toolbar-title class="subheading grey--text" v-if="!authenticated">
        <v-icon color="grey" small>home</v-icon>
        Home
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-and-down">
        <v-flex>
        <v-btn medium 
            @click="newDrillDialog=true" 
            color="primary"
            class="mx-1 my-2 py-1">
            <v-icon left>add</v-icon>
             New Drill
          </v-btn>
      </v-flex>
      <v-flex>
        <v-btn medium 
            :to="{ path: '/scrimmage', params: {} }" 
            @click="newSessionAndPractice" 
            color="primary"
            class="mx-1 my-2 py-1">
            <v-icon left>add</v-icon>
             New Scrimmage
          </v-btn>
      </v-flex>
      </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import StatsService from "./../../api/statsService";
import DrillsService from "./../../api/drillsService";

const statsService = new StatsService();
const drillsService = new DrillsService();

export default {
  name: "Toolbar",
  methods: {
    newSessionAndPractice() {
      var organization_id = localStorage.getItem("organization_id");
      drillsService.createSession(organization_id, "scrimmage");
      this.$store.dispatch("updatePracticeName", 'Scrimmage');
      this.$store.dispatch("updateIsScrimmageMode", true);
    },
    newSessionAndDrill() {
      var organization_id = localStorage.getItem("organization_id");
      drillsService.createSession(organization_id, this.newDrillName);
      this.$store.dispatch("updateIsCompetitiveDrill", this.isCompetitiveDrill);
      this.$store.dispatch("updatePracticeName", this.newDrillName);
      this.$store.dispatch("updateIsScrimmageMode", true);
    },
  }
}
</script>