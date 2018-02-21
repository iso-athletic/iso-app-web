<!-- Practice/Game Action Component -->
<template>
  <div class="drill">
    <button v-bind:style="{backgroundColor: color}">{{ title }}</button>
  </div>
</template>

<script>
export default {
  name: 'drill', // name of the component
  data () {
    return {}
  },
  props: ['title', 'color'], // these are data attributes that are able to be set when using an action
  }
</script>