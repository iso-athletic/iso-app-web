<template>
  <div class="players">
    <h3>Select Your Players</h3>
    <div class="player">
      <player v-for="player in players" :key="player.id" :name="player.name" :isActive="0"></player>
    </div>
  </div>
</template>

<script>
import PlayersService from '../.././api/playersService';
import Player from './player';

const playersService = new PlayersService();

export default{
  name: 'playersselect',
  data () {
    return {
      players: []
    }
  },
  methods: {

  },
  components: {
    Player,
  },
  mounted() {
    playersService.getOrganizationPlayers(localStorage.getItem('organization_id')).then((res)=>{
      this.players = res.data;
    });
  }
}
</script>

<style>
.players {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

h1, h2 {
  font-weight: normal;
}

.player {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
