<template>
  <v-card color="light-grey">
    <v-container fluid>
      <v-layout row wrap>
        <v-flex md10>
          <v-layout row wrap>
            <v-flex d-flex md12>
              <h3>{{actionEntry.player}}</h3>
            </v-flex>
            <v-flex d-flex md12>
              <div>{{actionEntry.action}}</div>
            </v-flex>
            <v-flex d-flex md12>
              <div>{{actionEntry.timeStamp}}</div>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex md2>
          <v-layout row wrap>
            <v-flex d-flex md12>
              <v-btn flat icon color="error"
                      :ripple="false"
                      @click="$emit('remove-event', actionEntry.id)">
                      <v-icon>delete</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'event',
  props: {
    actionEntry: Object,
    color: String,
  }
}

</script>
