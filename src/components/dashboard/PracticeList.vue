<template>
  <div class="mb-10 noBackground">
    <v-layout row wrap>
      <v-flex lg12 md12 sm12>
         <h4>
          <v-btn :to="{ path: '/scrimmage', params: {} }" @click="newSessionAndDrill" color="primary">+ New Scrimmage</v-btn>
        </h4>
      </v-flex>
      <v-flex lg12 md12 sm12 class="mx-2 my-2">
        <v-data-table
        :headers="headers"
        :items="this.organizationsSessions" 
        hide-actions
        class="elevation-1 scrimmageBorder"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.player }}</td>
            <td class="text-xs-center">{{ props.item.action }}</td>
            <td class="text-xs-center">{{ "x: "+ Math.round(props.item.position.x) + "&emsp;" + 
              "y: "+Math.round(props.item.position.y)}}</td>
            <td class="text-xs-center">{{ props.item.timeStamp }}</td>
          </template>

          <template slot="no-data">
            <v-layout>
              <v-flex md12>
                <div class="text-xs-center">
                  No scrimmages logged yet
                </div>
              </v-flex>
            </v-layout>
          </template>
      
        </v-data-table>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import DrillsService from "./../../api/drillsService";

const drillsService = new DrillsService();
export default {
  name: "practicelist",
  data() {
    return {
      headers: [
        { text: "Date", align: "center", value: "date" },
        {
          text: "Number of Drills",
          align: "center",
          value: "numberOfDrills",
          sortable: false
        },
      ],
      organizationsSessions: []
    };
  },
  methods: {
    newSessionAndDrill() {
      this.$store.dispatch("updateIsScrimmageMode", true);
      var organization_id = localStorage.getItem("organization_id");
      drillsService.createSession(organization_id);
    }
  }
};
</script>