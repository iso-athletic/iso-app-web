import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Callback from '../components/Callback'
import ActionsSelect from '../components/settings/ActionsSelect'
import Settings from '../components/settings/Settings'
import Clock from '../components/settings/Clock'
import Team from '../components/Team/Team'
import ScrimmageApp from '../components/scrimmage/ScrimmageApp'
import EventsSummary from '../components/scrimmage/events/EventsSummary'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback
    },
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/settings/actions',
      name: 'ActionsSelect',
      component: ActionsSelect
    },
    {
      path: '/settings/clock',
      name: 'Clock',
      component: Clock
    },
    {
      path: '/team',
      name: 'Team',
      component: Team
    },
    {
      path: '/scrimmage',
      name: 'Scrimmage',
      component: ScrimmageApp
    },
    {
      path: '/events',
      name: 'EventsSummary',
      component: EventsSummary
    }
  ]
})

export default router
