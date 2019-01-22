<template>
<div class="settings">
  <v-container fluid>
    <v-layout>
      <v-flex xs6 md3>
        <v-btn @click="changeEnumSetting(0)" round dark>
          <v-icon left dark>far fa-user</v-icon>
          Players
        </v-btn>
        <v-spacer />
        <v-btn @click="changeEnumSetting(1)" round dark>
          <v-icon left dark>far fa-hand-point-up</v-icon>
          Actions
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="changeEnumSetting(2)" round dark>
          <v-icon left dark>far fa-clock</v-icon>
          Clock
        </v-btn>
      </v-flex>
      <v-flex xs6 md6>
        <v-layout justify-center>
          <v-flex xs12 md12>
            <div v-if="type_of_setting_enum===0">
              <PlayersSelect/>
            </div>
            <div v-if="type_of_setting_enum===1">
              <ActionsSelect/>
            </div>
            <div v-if="type_of_setting_enum===2">
              <Clock/>
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
import ActionsSelect from './ActionsSelect';
import PlayersSelect from './PlayersSelect';
import Clock from './Clock';
import {mapActions} from 'vuex';

export default {
  name: "settings", //  name of the component
  components: {
    PlayersSelect,
    ActionsSelect,
    Clock
  },
  data() {
    return {
      type_of_setting_enum: 0,
    }
  },
  methods: {
    changeEnumSetting: function(num) {
      this.type_of_setting_enum = num;
    },
  }
}
</script>
