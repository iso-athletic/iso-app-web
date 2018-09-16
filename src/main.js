// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './stateStores/ScrimmageAppStore'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
// import 'material-design-icons-iconfont/dist/material-design-icons.css'
// import '@fortawesome/fontawesome-free/css/all.css'
// import '@mdi/font/css/materialdesignicons.css'


Vue.use(Vuetify, {
  iconfont: 'fa'
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
