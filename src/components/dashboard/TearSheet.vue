<template>
  <div class="mb-10 noBackground">
    <v-layout row wrap>
      <v-flex xs3 sm3 md3>
          <v-btn 
            :to="{ path: '/scrimmage', params: {} }" 
            @click="newSessionAndPractice" 
            color="primary"
            class="mx-3 my-3">
            <v-icon left>add</v-icon>
             New Scrimmage
          </v-btn>
      </v-flex>
      <v-flex xs3 sm3 md3>
        <v-btn 
            @click="newDrillDialog=true" 
            color="primary"
            class="mx-3 my-3">
            <v-icon left>add</v-icon>
             New Drill
          </v-btn>
      </v-flex>
      <v-flex xs12 sm12 md12>
      <v-layout row wrap>
        <v-flex xs5 md3 lg3>
          <v-menu full-width offset-y :close-on-content-click="false" v-model="dateMenu" bottom class="mx-2">
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
        <v-flex xs4 md4 lg4 offset-xs2 offset-md5 offset-lg5
        class="text-xs-right">
          <v-btn
            color="green"
            class="white--text"
          >
            Export to CSV (coming soon)
            <v-icon right dark>save_alt</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      </v-flex>
      <v-flex lg12 md12 sm12>
        <v-data-table
        :headers="headers"
        :items="this.playerStats" 
        hide-actions
        class="elevation-1 scrimmageBorder ml-3 my-3"
        >
          <template slot="items" slot-scope="props">
            <tr>
              <td class="text-xs-center">{{ props.item.player_name | removeNulls }}</td>
              <td class="text-xs-center">{{ props.item.pts | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.fg | removeNulls}}</td>
              <!-- <td class="text-xs-center">{{ props.item.fga | removeNulls}}</td> -->
              <td class="text-xs-center">{{ props.item.fgp | roundDown | removeNulls}}</td>
              <!-- <td class="text-xs-center">{{ props.item.twop | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.twopa | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.twopp | roundDown | removeNulls}}</td> -->
              <!-- <td class="text-xs-center">{{ props.item.threep | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.threepa | removeNulls}}</td> -->
              <td class="text-xs-center">{{ props.item.threepp | roundDown | removeNulls }}</td>
              <!-- <td class="text-xs-center">{{ props.item.threepar | removeNulls }}</td> -->
              <td class="text-xs-center">{{ props.item.ftp | roundDown | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.tsp | roundDown | removeNulls }}</td>
              <td class="text-xs-center">{{ props.item.efgp | roundDown | removeNulls}}</td>
              <!-- <td class="text-xs-center">{{ props.item.ft | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.fta | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.ftr | removeNulls}}</td> -->
              <td class="text-xs-center">{{ props.item.oreb | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.dreb | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.reb | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.ast | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.tov | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.stl | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.blk | removeNulls}}</td>
              <td class="text-xs-center">{{ props.item.pf | removeNulls}}</td>
            </tr>
          </template>

          <template slot="no-data">
            <v-layout>
              <v-flex md12>
                <div class="text-xs-left">
                  No scrimmages logged yet for current date selection
                </div>
              </v-flex>
            </v-layout>
          </template>
      
        </v-data-table>
      </v-flex>
    </v-layout>
    <v-dialog v-model="newDrillDialog" max-width="600">
    <v-card class="patternBackground editTeamCheckbox">
    <v-container class="pb-2">
        <v-layout row wrap>
          <v-flex xs12 md12 lg12 class="text-xs-center">
            <div class="med-text">
              
            </div>
          </v-flex>
          <v-divider></v-divider>
          <v-flex xs12 md12 lg12 class="text-xs-center">
             <v-text-field placeholder="Enter a name for your new drill" box v-model="newDrillName"></v-text-field>
          </v-flex>
          <v-flex xs12 md12 lg12 class="text-xs-center">
            <v-checkbox
              :label="`Competitive`"
              v-model="isCompetitiveDrill"
            ></v-checkbox>
          </v-flex>
        </v-layout>
    </v-container>
    <v-layout justify-end>
      <v-btn class="mb-3 mr-3 normalButton" 
            :to="{ path: '/scrimmage', params: {} }"  
            @click="newSessionAndDrill(); newDrillDialog=false">
            Go
      </v-btn>
    </v-layout>
    </v-card>
    </v-dialog>
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
      isCompetitiveDrill: true,
      newDrillName: "",
      newDrillDialog: false,
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
      headers: [
        {
          text: "Name",
          align: "center",
          value: "playerName",
          sortable: false
        },
        {
          text: "PTS",
          align: "center",
          value: "pts"
        },
        {
          text: "FG",
          align: "center",
          value: "fg"
        },
        // {
        //   text: "FGA",
        //   align: "center",
        //   value: "fga"
        // },
        {
          text: "FG %",
          align: "center",
          value: "fgp"
        },
        // {
        //   text: "2P",
        //   align: "center",
        //   value: "twop"
        // },
        // {
        //   text: "2PA",
        //   align: "center",
        //   value: "twopa"
        // },
        // {
        //   text: "2 %",
        //   align: "center",
        //   value: "twopp"
        // },
        // {
        //   text: "3P",
        //   align: "center",
        //   value: "threep"
        // },
        // {
        //   text: "3PA",
        //   align: "center",
        //   value: "threepa"
        // },
        {
          text: "3 %",
          align: "center",
          value: "threepp"
        },
        // {
        //   text: "3 PAR",
        //   align: "center",
        //   value: "threepar"
        // },
        {
          text: "FT %",
          align: "center",
          value: "ftp"
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
        // {
        //   text: "FT",
        //   align: "center",
        //   value: "ft"
        // },
        // {
        //   text: "FTA",
        //   align: "center",
        //   value: "fta"
        // },

        // {
        //   text: "FTR",
        //   align: "center",
        //   value: "ftr"
        // },
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
          text: "TOV",
          align: "center",
          value: "tov"
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
          text: "PF",
          align: "center",
          value: "pf"
        }
      ],
      playerStats: [],
      dateMenu: false
    };
  },
  filters: {
    removeNulls: function(s) {
      return s ? s : "-";
    },
    roundDown: function(s) {
      return s ? parseFloat(s).toFixed(2) : s;
    }
  },
  methods: {
    onDateRangeChange(range) {
      this.range = range;
    },
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
    submit() {
      var fromDateInEpoch = moment(this.range[0]).unix();
      this.getStatsBasedOnDates(fromDateInEpoch);
    },
    getStatsBasedOnDates(fromDateInEpoch) {
      var toDateInEpoch = moment(this.range[1])
        .endOf("day")
        .unix();
      statsService
        .getStatsForDrills(organizationId, fromDateInEpoch, toDateInEpoch)
        .then(res => {
          this.playerStats = res.data;
        });
    }
  },
  mounted() {
    var fromDateInEpoch = moment(this.range[0]).unix();
    this.getStatsBasedOnDates(fromDateInEpoch);
  }
};
</script>