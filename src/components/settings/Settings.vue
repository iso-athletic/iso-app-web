<template>
<div>
  <v-list>
    <v-list-tile :to="{ path: '/settings/actions', params: {} }">
      <v-list-tile-avatar>
        <i class="far fa-user"></i>
      </v-list-tile-avatar>
        Players
    </v-list-tile>
    <v-list-tile :to="{ path: '/', params: {} }">
      <v-list-tile-avatar>
        <i class="far fa-hand-point-up"></i>
      </v-list-tile-avatar>
        Actions
    </v-list-tile>
    <v-list-tile :to="{ path: '/settings/clock', params: {} }">
      <v-list-tile-avatar>
        <i class="far fa-clock"></i>
      </v-list-tile-avatar>
        Clock
    </v-list-tile>
  </v-list>
</div>
</template>

<script>
</script>
