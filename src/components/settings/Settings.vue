<template>
<div>
  <ul class="list-group list-group-flush">
    <router-link :to="{ path: '/settings/actions', params: {} }"
      class="list-group-item">
      <i class="far fa-hand-point-up"></i> Actions
    </router-link>
    <router-link :to="{ path: 'settings', params: {} }"
      class="list-group-item">
      <i class="far fa-user"></i> Players
    </router-link>
    <router-link :to="{ path: '/settings/clock', params: {} }"
      class="list-group-item">
      <i class="far fa-clock"></i> Clock
    </router-link>
  </ul>
</div>
</template>

<script>
</script>
