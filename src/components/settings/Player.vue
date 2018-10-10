<template>
  <div>
    <button class="btn player-button" @click="toggleActive()" v-bind:class="{active: isActive}">{{ name }}</button>
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
  props: ['name', 'isActive'],
}
</script>

<style>
.active {
  background-color: grey;
}
.player-button {
  color: white;
  margin: 10px;
  width: 125px
}
</style>
