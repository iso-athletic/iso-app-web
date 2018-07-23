<template>
  <v-card class="noBackground fullWidth bottomScrimmageBorder">
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
                      @click="removeEvent()">
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
  data() {
    return {
      shotValue: 0
    }
  },
  props: {
    actionEntry: Object,
    color: String,  
  },
  computed: {
    madeShot: function() {
      if (this.actionEntry.action != "Made Shot") {
        return false;
      }
      if (this.actionEntry.position.threePointer) this.shotValue = 3;
      else this.shotValue = 2;
      return true;
    }
  },
  methods: {
    removeEvent() {
      this.$store.dispatch("removeEvent", this.actionEntry.id);
    }
  }

}

</script>

<style>
  
</style>