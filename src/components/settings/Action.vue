<!-- Practice/Game Action Component -->
<template>
  <div class="action">
      <button class="btn action-button" @click="toggleActive()" v-bind:class="{active: isActive}">{{ title }}</button>
  </div>
</template>

<script>
export default {
  name: 'action', // name of the component
  data () {
    return {}
  },
  methods: {
    toggleActive: function(){
      this.isActive = !this.isActive;
    }
  },
  props: ['title', 'isActive'], // these are data attributes that are able to be set when using an action
  }
</script>

<style>
.active {
  background-color: green
}

.action-button {
  margin: 10px;
  width: 125px
}
</style>
