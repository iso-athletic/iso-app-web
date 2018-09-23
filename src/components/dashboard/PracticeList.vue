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
            <td class="text-xs-center">{{ props.item.dayOfWeek }}</td>
            <td class="text-xs-center">{{ props.item.date | epochToHuman }}</td>
            <td class="text-xs-center">{{ props.item.time }}</td>
            <td class="text-xs-center">{{ props.item.length }}</td>
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
import OrganizationsService from "./../../api/organizationsService";
import moment from "moment";

const drillsService = new DrillsService();
const organizationsService = new OrganizationsService();
export default {
  name: "practicelist",
  data() {
    return {
      headers: [
        {
          text: "Day of Week",
          align: "center",
          value: "dayOfWeek",
          sortable: false
        },
        { text: "Date", align: "center", value: "date" },
        { text: "Time", align: "center", value: "time", sortable: false },
        {
          text: "Length of Drill",
          align: "center",
          value: "lengthOfDrill",
          sortable: false
        }
      ],
      organizationsSessions: []
    };
  },
  filters: {
    epochToHuman: function(t) {
      return moment.unix(t).format("MMMM Do YYYY");
    }
  },
  methods: {
    newSessionAndDrill() {
      this.$store.dispatch("updateIsScrimmageMode", true);
      var organization_id = localStorage.getItem("organization_id");
      drillsService.createSession(organization_id);
    },
    calculateLengthOfDrill(startTime, endTime) {
      var startTimeAsMoment = moment(startTime);
      var endTimeAsMoment = moment(endTime);
      var duration = moment.duration(endTimeAsMoment.diff(startTimeAsMoment));
      // var hoursDuration = duration.hours();
      var minutesDuration = duration.minutes();
      // hoursDuration.toString() + 'hrs' + ' '
      return minutesDuration.toString() + " mins";
    }
  },
  mounted() {
    var organization_id = localStorage.getItem("organization_id");
    organizationsService
      .getSessionsForOrganization(organization_id)
      .then(response => {
        response.data.forEach(session => {
          var formattedMoment = moment(session.created_at)
            .format("dddd, MMMM Do YYYY, h:mm:ss a")
            .split(",");
          var formattedDayOfWeek = formattedMoment[0];
          var formattedDate = moment(session.created_at).unix();
          var formattedTime = formattedMoment[2];
          var lengthOfDrill = this.calculateLengthOfDrill(
            session.start_time,
            session.end_time
          );
          this.organizationsSessions.push({
            dayOfWeek: formattedDayOfWeek,
            date: formattedDate,
            time: formattedTime,
            length: lengthOfDrill
          });
        });
      });
  }
};
</script>