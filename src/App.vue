<template>
  <div id="app">
    <div class="container">
      <h1>{{ msg }}</h1>
      <div class="drills">
        <drill v-for="item in items" :key="item.id" :title="item.title" :color="item.color"></drill>
      </div>
    </div>
  </div>
</template>

<script>
import drill from './components/drills-int/drills.vue';

export default {
  name: 'app',
  data () {
    return {
      msg: 'Iso Athletic',
      items: [
        { title: '2 PT Make', color: 'green'},
        { title: '3 PT Make', color: 'green'},
        { title: 'FT', color: 'green'},
        { title: '2 PT Miss', color: 'red'},
        { title: '3 PT Miss', color: 'red'},
        { title: 'FT', color: 'red'},
        { title: 'Assist'},
        { title: 'Turnover'},
        { title: 'Off Rebound'},
        { title: 'Def Rebound'},
        { title: 'Steal'},
        { title: 'Block'},
        { title: 'Foul'},
      ]
    }
  },
  components: {
    drill,
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

.drills {
  justify-content: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
