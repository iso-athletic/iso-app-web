<template>
    <v-data-table
        :headers="headers"
        :items="this.$store.getters.getEventList.reverse()" 
        hide-actions
        class="elevation-1 scrimmageBorder"
    >
      <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.player }}</td>
        <td class="text-xs-center">{{ props.item.action }}</td>
        <td class="text-xs-center">{{ "x: "+ Math.round(props.item.position.x) + "&emsp;" + 
            "y: "+Math.round(props.item.position.y)}}</td>
        <td class="text-xs-center">{{ props.item.timeStamp }}</td>
      </template>
    </v-data-table>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      headers: [
        { text: "Player", align: "center", value: "player" },
        { text: "Action", align: "center", value: "action" },
        { text: "Position", align: "center", value: "position", sortable:false },
        { text: "Time", align: "center", value: "timeStamp" }
      ],
    };
  },
  /* manually styling bc vuetify doesn't expose the relevant HTML element */
  mounted: function() {
    document.getElementsByTagName("table")[0].className +=
      " " + "translucentBackground";
  }
};
</script>

<style>
    @media print{@page {size: landscape}; nav {display:none;}}
    
</style>
