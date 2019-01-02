<template>
  <div id="score">
    {{teamScore}}
  </div>
</template>

<script>
export default {
  name: 'score',
  props: {
    teamScore: Number
  }
}
</script>