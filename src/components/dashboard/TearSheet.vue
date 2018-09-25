<template>
  <div class="mb-10 noBackground">
    <v-layout row wrap>
      <v-flex xs4 sm4 md4>
         <h4>
          <v-btn :to="{ path: '/scrimmage', params: {} }" @click="newSessionAndDrill" color="primary">+ New Scrimmage</v-btn>
        </h4>
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
          label="Select date(s)"
          prepend-icon="event"
        ></v-combobox>
        <v-date-picker v-model="dates" multiple no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu.save(dates)">OK</v-btn>
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
              <td class="text-xs-center">{{ props.item.playerName }}</td>
              <td class="text-xs-center">{{ props.item.fg }}</td>
              <td class="text-xs-center">{{ props.item.fga }}</td>
              <td class="text-xs-center">{{ props.item.fgp }}</td>
            </tr>
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
import StatsService from "./../../api/statsService";
const statsService = new StatsService();

var organizationId = localStorage.getItem("organization_id");

export default {
  name: "tearsheet",
  data() {
    return {
      dates: [],
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
        }
      ],
      playerStats: []
    };
  },
  filters: {},
  methods: {
    newSessionAndDrill() {
      this.$store.dispatch("updateIsScrimmageMode", true);
      var organization_id = localStorage.getItem("organization_id");
      drillsService.createSession(organization_id);
    }
  },
  mounted() {}
};
</script>