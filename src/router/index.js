import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Callback from '../components/Callback'
import Settings from '../components/settings/Settings'
import Team from '../components/team/Team'
import ScrimmageApp from '../components/scrimmage/ScrimmageApp'
import EventsSummary from '../components/scrimmage/events/EventsSummary'
import ShotChartBase from '../components/dashboard/shot-chart/ShotChartBase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: false }
    },
    {
      // i have no clue what we wanna do here
      path: '/callback',
      name: 'Callback',
      component: Callback
    },
    {
      path: '*',
      redirect: '/home',
      meta: { requiresAuth: false }
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: { requiresAuth: true }
    },
    {
      path: '/team',
      name: 'Team',
      component: Team,
      meta: { requiresAuth: true }
    },
    {
      path: '/scrimmage',
      name: 'Scrimmage',
      component: ScrimmageApp,
      meta: { requiresAuth: true }
    },
    {
      path: '/events',
      name: 'EventsSummary',
      component: EventsSummary,
      meta: { requiresAuth: true }
    },
    {
      path: '/shotchart',
      name: 'ShotChart',
      component: ShotChartBase,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // not sure if this is the proper way to check auth
    if (localStorage.getItem('access_token') == null) {
      next({
        path: '/home',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
