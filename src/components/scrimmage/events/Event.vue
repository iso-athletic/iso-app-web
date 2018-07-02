<template>
  <v-card>
    <v-card-title primary-title>
      <v-layout row>
        <v-flex xs9>
          <div>
            <div class="headline">{{actionEntry.player}}</div>
            <div>{{actionEntry.action}}</div>
            <div>{{actionEntry.timeStamp}}</div>
          </div>
        </v-flex>
        <v-flex xs3>
        </v-flex>
      </v-layout>
    </v-card-title>
  </v-card>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'event',
  props: {
    actionEntry: Object,
  }
}
  
</script>