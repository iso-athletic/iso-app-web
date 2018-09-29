<template>
  <div class="mb-10 noBackground">
    <v-layout row wrap>
      <v-flex xs4 sm4 md4>
          <v-btn 
            :to="{ path: '/scrimmage', params: {} }" 
            @click="newSessionAndDrill" 
            color="primary"
            class="mx-2 my-2">
            + New Scrimmage
          </v-btn>
      </v-flex>
      <v-flex xs12 sm6 md4 offset-sm4>
        <v-menu
        ref="menu"
        :close-on-content-click="false"
        v-model="menu"
        :nudge-right="40"
        :return-value.sync="dates"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-combobox
          slot="activator"
          v-model="dates"
          multiple
          chips
          small-chips
          label="Select date or date range"
          prepend-icon="event"
        ></v-combobox>
        <v-date-picker v-model="dates" multiple no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu.save(dates); submit()">OK</v-btn>
        </v-date-picker>
      </v-menu>
      </v-flex>
      <v-flex lg12 md12 sm12 class="mx-2 my-2">
        <v-data-table
        :headers="headers"
        :items="this.playerStats" 
        hide-actions
        class="elevation-1 scrimmageBorder"
        >
          <template slot="items" slot-scope="props">
            <tr>
              <td class="text-xs-center">{{ props.item.player_name | removeNulls }}</td>
              <td class="text-xs-center">{{ props.item.fg | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.fga | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.fgp | roundDown | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.twop | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.twopa | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.twopp | roundDown | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.threep | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.threepa | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.threepp | roundDown | removeNulls }}</td>
              <td class="text-xs-center">{{ props.item.threepar | removeNulls }}</td>
              <td class="text-xs-center">{{ props.item.pts | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.tsp | roundDown | removeNulls }}</td>
              <td class="text-xs-center">{{ props.item.efgp | roundDown | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.ft | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.fta | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.ftp | roundDown | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.ftr | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.oreb | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.dreb | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.reb | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.ast | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.stl | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.blk | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.tov | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.pf | removeNulls}}</td>
            </tr>
          </template>

          <template slot="no-data">
            <v-layout>
              <v-flex md12>
                <div class="text-xs-center">
                  No scrimmages logged yet for current date selection
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
import StatsService from "./../../api/statsService";
import DrillsService from "./../../api/drillsService";
import moment from "moment";

const statsService = new StatsService();
const drillsService = new DrillsService();

var organizationId = localStorage.getItem("organization_id");

export default {
  name: "tearsheet",
  data() {
    return {
      dates: [moment().format('YYYY-MM-DD')],
      menu: false,
      headers: [
        {
          text: "Name",
          align: "center",
          value: "playerName",
          sortable: false
        },
        {
          text: "FG",
          align: "center",
          value: "fg"
        },
        {
          text: "FGA",
          align: "center",
          value: "fga"
        },
        {
          text: "FG %",
          align: "center",
          value: "fgp"
        },
        {
          text: "2P",
          align: "center",
          value: "twop"
        },
        {
          text: "2PA",
          align: "center",
          value: "twopa"
        },
        {
          text: "2 %",
          align: "center",
          value: "twopp"
        },
        {
          text: "3P",
          align: "center",
          value: "threep"
        },
        {
          text: "3PA",
          align: "center",
          value: "threepa"
        },
        {
          text: "3 %",
          align: "center",
          value: "threepp"
        },
        {
          text: "3 PAR",
          align: "center",
          value: "threepar"
        },
        {
          text: "PTS",
          align: "center",
          value: "pts"
        },
        {
          text: "TS %",
          align: "center",
          value: "tsp"
        },
        {
          text: "EFG %",
          align: "center",
          value: "efgp"
        },
        {
          text: "FT",
          align: "center",
          value: "ft"
        },
        {
          text: "FTA",
          align: "center",
          value: "fta"
        },
        {
          text: "FT %",
          align: "center",
          value: "ftp"
        },
        {
          text: "FTR",
          align: "center",
          value: "ftr"
        },
        {
          text: "OREB",
          align: "center",
          value: "oreb"
        },
        {
          text: "DREB",
          align: "center",
          value: "dreb"
        },
        {
          text: "REB",
          align: "center",
          value: "reb"
        },
        {
          text: "AST",
          align: "center",
          value: "ast"
        },
        {
          text: "STL",
          align: "center",
          value: "stl"
        },
        {
          text: "BLK",
          align: "center",
          value: "blk"
        },
        {
          text: "TOV",
          align: "center",
          value: "tov"
        },
        {
          text: "PF",
          align: "center",
          value: "pf"
        }
      ],
      playerStats: []
    };
  },
  filters: {
    removeNulls: function(s) {
      return s ? s : '-';
    },
    roundDown: function(s) {
      return s ? parseFloat(s).toFixed(2) : s;
    }
  },
  methods: {
    newSessionAndDrill() {
      this.$store.dispatch("updateIsScrimmageMode", true);
      var organization_id = localStorage.getItem("organization_id");
      drillsService.createSession(organization_id);
    },
    submit() {
      var fromDateInEpoch = moment(this.dates[0]).startOf('day').unix();
      this.getStatsBasedOnDates(fromDateInEpoch);
    },
    getStatsBasedOnDates(fromDateInEpoch){
      var toDateInEpoch = this.dates[1] ? moment(this.dates[1]).endOf('day').unix() : moment(fromDateInEpoch).add(1, 'd'); 
      statsService.getStatsForDrills(organizationId, fromDateInEpoch, toDateInEpoch).then((res) => {
        this.playerStats = res.data;
      });
    }
  },
  mounted() {
    var fromDateInEpoch = moment(this.dates[0]).unix();
    this.getStatsBasedOnDates(fromDateInEpoch);
  }
};
</script>