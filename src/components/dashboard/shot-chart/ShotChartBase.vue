<template>
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

    <ul>
      <li v-for="s in stuff"
          v-bind:data="s"
          v-bind:key="s">
          {{s}}
      </li>
    </ul>
  </div>
</template>

<script>
import EventsService from "./../../../api/eventsService";
import moment from "moment";

const eventsService = new EventsService();

let organizationId = localStorage.getItem("organization_id");

export default {
  name: "shotchartbase",
  data() {
    return {
      stuff: [],
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
                        this.stuff = response.data;
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
