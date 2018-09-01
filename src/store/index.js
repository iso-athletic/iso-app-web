import Vue from 'vue'
import Vuex from 'vuex'

import actionEntry from './modules/scrimmage/actionEntry'
import team from './modules/scrimmage/team'
import time from './modules/scrimmage/time'
import etc from './modules/scrimmage/etc'

// store modules

export default new Vuex.Store({
  modules: {
    actionEntry,
    team,
    time,
    etc,
  }
})