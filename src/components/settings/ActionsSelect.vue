<template>
  <div id="app">
    <div class="container">
      <h3>{{ msg }}</h3>
      <div class="action">
        <action v-for="item in items" :key="item.id" :title="item.title" :isActive="item.isActive"></action>
      </div>
      <button class="btn btn-secondary save">Save</button>
    </div>
  </div>
</template>

<script>
import Action from './Action.vue';

export default {
  name: 'app',
  data () {
    return {
      msg: 'Select Your Actions',
      items: [
        { title: '2 PT Make', isActive: 1},
        { title: '3 PT Make', isActive: 1},
        { title: 'FT', isActive: 1},
        { title: '2 PT Miss', isActive: 1},
        { title: '3 PT Miss', isActive: 1},
        { title: 'FT', isActive: 1},
        { title: 'Assist', isActive: 1},
        { title: 'Turnover', isActive: 1},
        { title: 'Off Rebound', isActive: 0},
        { title: 'Def Rebound', isActive: 0},
        { title: 'Steal', isActive: 0},
        { title: 'Block', isActive: 0},
        { title: 'Foul', isActive: 0},
      ]
    }
  },
  components: {
    Action,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

.action {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
