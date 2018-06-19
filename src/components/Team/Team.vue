<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs6>
        <v-card>
          <v-card-title>
            SCOREBOARD
          </v-card-title>
          <v-spacer></v-spacer>
          <h1>{{date}}</h1>
          <v-data-table
            :headers="scoreboardHeaders"
            :items="players"
            hide-actions>
            <template slot="items" slot-scope="props">
              <td>{{ props.item.player}}</td>
              <td class="text-xs-center">{{ props.item.points}}</td>
              <td class="text-xs-center">{{ props.item.assists}}</td>
              <td class="text-xs-center">{{ props.item.rebounds}}</td>
              <td class="text-xs-center">{{ props.item.steals}}</td>
              <td class="text-xs-center">{{ props.item.blocks}}</td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-date-picker v-model="picker" :landscape="landscape" :reactive="reactive"></v-date-picker>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs6>
        <v-card>
          <v-card-title>
            PLAYER DEVELOPMENT
          </v-card-title>
          <v-data-table
            :headers="pdHeaders"
            :items="pdPlayers"
            hide-actions>
            <template slot="items" slot-scope="props">
              <td>{{ props.item.player}}</td>
              <td class="text-xs-center">{{ props.item.threePT}}</td>
              <td class="text-xs-center">{{ props.item.stls}}</td>
              <td class="text-xs-center">{{ props.item.blk}}</td>
              <td class="text-xs-center">{{ props.item.fgp}}</td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'


export default {
  name: 'team',
  data() {
    // all hardcoded data
      return {
          university: "University of Miami",
          gender: "Men",
          sport: "Basketball",
          players: [
            { player: 'Newton', points: 20, assists: 6, rebounds: 3, steals: 3, blocks: 4},
            { player: 'Lykes', points: 18, assists: 15, rebounds: 8, steals: 4, blocks: 2},
            { player: 'Walker IV', points: 13, assists: 4, rebounds: 6, steals: 2, blocks: 1},
            { player: 'Robinson', points: 3, assists: 7, rebounds: 9, steals: 1, blocks: 3},
          ],
          scoreboardHeaders: [
            {
              text: 'Player',
              align: 'left',
              value: 'player',
            },
            {
              text: 'Points',
              value: 'points'
            },
            {
              text: 'Assists',
              value: 'assists'
            },
            {
              text: 'Rebounds',
              value: 'rebounds',
            },
            {
              text: 'Steals',
              value: 'steals'
            },
            {
              text: 'Blocks',
              value: 'blocks'
            }
          ],
          pdPlayers: [
            {player: 'Newton', threePT: 5, stls: 2, blk: 3, fgp: 57},
            {player: 'Robinson', threePT: 2, stls: 1, blk: 3, fgp: 63},
            {player: 'Walker', threePT: 7, stls: 4, blk: 1, fgp: 72},
          ],
          pdHeaders: [
            {
              text: 'Player',
              align: 'left',
              value: 'player',
            },
            {
              text: '3PT',
              value: 'threePT',
            },
            {
              text: 'STLS',
              value: 'stls',
            },
            {
              text: 'BLK',
              value: 'blk'
            },
            {
              text: 'FG%',
              value: 'fgp',
            },
          ],
          searchQuery: "",
          date: "",
          picker: null,
          landscape: false,
          reactive: false
      }
  },

  methods: {
    today() {
      this.date = moment().format("MMM Do[,] YYYY");
    }
  },

  computed: {
    teamDescription: function() {
      return this.university + " " + this.gender + "'s " + this.sport + " Team";
    }
  },

  mounted: function() {
    this.today()
  }
}
</script>

<style>
/************* TODO: fix styling *****************
 * which font to use
 * font size
 * margins
**************************************************/

  html {
      height: 100%;
      margin: 0;
  }
  
  body {
      color: white;
      background-color: black;
  }

</style>