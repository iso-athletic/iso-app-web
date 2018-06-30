<template>
  <div id="scoreboard">
    <v-card color="blue-grey darken-2" class="white--text">
      <v-layout>
        <v-flex xs4>
          Team 1
        </v-flex>
        <v-flex xs4>
          <Score />
        </v-flex>
        <v-flex xs4>
          <Score />
        </v-flex>
        <v-flex xs4>
          Team 2
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import Vue from 'vue';
import Score from './Score.vue';

export default {
  name: 'scoreboard',
  data () {
    return {}
  },
  components: {
    Score,
  }
}

</script>

