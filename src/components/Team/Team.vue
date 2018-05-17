<template>
    <div>
    <h1> {{university}} </h1>
    <h3> {{teamDescription}}</h3>
    <grid
      title="Scoreboard"
      :date="date"
      :columns="gridColumns"
      :filter-key="searchQuery"
      :data="gridData"
      />
    </div>
</template>

<script>
import Grid from "./Grid.vue"
import moment from 'moment'

export default {
  name: 'team',
  components: {
      Grid,
  },
  data() {
      return {
          university: "University of Miami",
          gender: "Men",
          sport: "Basketball",
          gridData: [
            { player: 'Newton', points: 20, assists: 6, rebounds: 3, steals: 3, blocks: 4},
            { player: 'Lykes', points: 18, assists: 15, rebounds: 8, steals: 4, blocks: 2},
            { player: 'Walker IV', points: 13, assists: 4, rebounds: 6, steals: 2, blocks: 1},
            { player: 'Robinson', points: 3, assists: 7, rebounds: 9, steals: 1, blocks: 3},
          ],
          gridColumns: [
            'player',
            'points',
            'assists',
            'rebounds',
            'steals',
            'blocks',
          ],
          searchQuery: "",
          date: "",
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
  html {
      height: 100%;
      margin: 0;
  }
  
  body {
      color: white;
      background-color: black;
  }

</style>