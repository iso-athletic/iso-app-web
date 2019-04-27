<template>
  <div class="mb-10 noBackground">
    <ul>
      <li v-for="s in stuff"
          v-bind:data="s"
          v-bind:key="s">
          {{s}}
      </li>
    </ul>
  </div>
</template>

<script>
import EventsService from "./../../../api/eventsService";
import moment from "moment";

const eventsService = new EventsService();

var organizationId = localStorage.getItem("organization_id");

export default {
  name: "shotchartbase",
  data() {
    return {
      stuff: ['hi','bye']
    };
  },
  methods: {
  
  },
  mounted() {

  }
};
</script>