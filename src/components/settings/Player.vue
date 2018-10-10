<template>
  <div>
    <button class="player-button">{{ name }} #{{ jersey_num }}</button>
  </div>
</template>

<script>
export default {
  name: 'player',
  data () {
    return {}
  },
  methods: {
    toggleActive: function(){
      this.isActive = !this.isActive;
    }
  },
  props: ['name', 'jersey_num'],
}
</script>

<style>
.active {
  background-color: grey;
}
.player-button {
  color: white;
  margin: 10px;
  width: 135px
}
</style>
