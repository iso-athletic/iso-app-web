<template>
  <v-container fluid grid-list-xl my-4>
  <v-layout row>
    <v-flex d-flex xs12>
      <v-card class="elevation-3" color="grey lighten-3">
        <v-card-title primary-title>
          <div>
            
            <div class="green--text headline"><v-icon color="green">arrow_upward</v-icon>Alex Van Der Heiden</div>
            <span>Shot Chart</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat></v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex d-flex xs12>
      <v-card class="elevation-3" color="grey lighten-3">
        <v-card-title primary-title>
          <div>
            
            <div class="red--text headline"><v-icon color="red">arrow_downward</v-icon>Joe Cummings</div>
            <span>Player Development</span>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>    
    <v-flex d-flex xs12>
      <v-card class="elevation-3" color="grey lighten-3">
        <v-card-title primary-title>
          <div>
            <div class="green--text headline"><v-icon color="green">arrow_upward</v-icon>Kobe Bryant</div>
            <span>Lineup Optimization</span>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
  </v-container>
</template>
  
<script>
  export default {
    name: "Cards",
    data() {
      return {
        
      }
    }
  }
</script>