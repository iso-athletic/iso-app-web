<template>
  <div>
  <div class="mb-10 noBackground">

  <v-flex xs5 md3 lg3>
    <v-menu full-width :close-on-content-click="false" v-model="dateMenu" bottom class="mb-3 mr-3">
      <v-btn color="primary" outline slot="activator">
        {{ range[0] }} &mdash; {{ range[1] }}
        <v-icon right>calendar_today</v-icon>
        </v-btn>
      <v-card>
        <v-card-text>
          <v-daterange :options="dateRangeOptions" no-presets @input="onDateRangeChange" />
          <v-btn @click="dateMenu=false; submit()">Ok</v-btn>
        </v-card-text>
      </v-card>
    </v-menu>
  </v-flex>
  <v-btn class="mb-3 mr-3 normalButton" @click="getShots()">get shots</v-btn>

  </div>
    <CourtChart
    :shots="shotCoords"
     />
  </div>
</template>

<script>
import EventsService from "./../../../api/eventsService";
import moment from "moment";
import CourtChart from "./CourtChart"

const eventsService = new EventsService();

let organizationId = localStorage.getItem("organization_id");

export default {
  name: "shotchartbase",
  components: {
    CourtChart,
  },
  data() {
    return {
      fullShotData: [],
      shotCoords: [],
      dateMenu: false,
      range: [
        moment()
          .local()
          .startOf("day")
          .format("YYYY-MM-DD"),
        moment()
          .local()
          .endOf("day")
          .format("YYYY-MM-DD")
      ],
      dateRangeOptions: {
        startDate: moment()
          .local()
          .startOf("day")
          .format("YYYY-MM-DD"),
        endDate: moment()
          .local()
          .endOf("day")
          .format("YYYY-MM-DD"),
        format: "MM/DD/YYYY"
      },
    };
  },
  methods: {
    getShots() {
      let start = moment(this.range[0]).format("X");
      let end = moment(this.range[1]).format("X");

      eventsService.getAllShots(organizationId, start, end)
                    .then((response) => {
                        if (response.data.length > 0){
                          this.fullShotData = response.data;
                          response.data.forEach((shot) => {
                            this.shotCoords.push([shot.player_id, shot.location])
                          })
                        }
                        else {
                          this.fullShotData = ["No Shots Available"];
                        }
                        // this.$store.dispatch("getShots", [response.data, 1]);
                    });

    },
    onDateRangeChange(range) {
      this.range = range;
    },
    submit() {
      var fromDateInEpoch = moment(this.range[0]).unix();
    },
  },
  mounted() {
    var fromDateInEpoch = moment(this.range[0]).unix();
  }
};
</script>
