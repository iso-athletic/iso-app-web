<template>
    <div>
        <div v-for="x in allEvents" v-bind:key="x.id">Hey</div>
    </div>
</template>


<script>
import Vue from 'vue'

export default {
    props: ['allEvents']
}
</script>

<style>
</style>