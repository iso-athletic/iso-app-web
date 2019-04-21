<template>
    <v-navigation-drawer
      class="grey lighten-3"
      app
    >
    <v-list-tile class="grey lighten-4" dark three-line>
      <v-list-tile-avatar>
        <img alt="Logo" ref="logo" id="logo" height="20px" :src="this.organizationLogo">
      </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title class="title">ISO Athletic</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list>
        <v-list-tile
          v-for="item in items"
          :key="item.title"
          v-on:click="{}"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
  
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

</template>

<script>
import OrganizationsService from "../../api/organizationsService";
const organizationsService = new OrganizationsService();

export default {
  
  data() {
    return {
      items: [
        { title: 'Dashboard', icon: 'dashboard' },
        { title: 'Account', icon: 'account_box' },
        { title: 'Admin', icon: 'gavel' },
        { title: 'Settings', icon: 'settings' }
      ]
    }
  },
  methods: {
    loadLogo() {
      var logoString = "";
      var localStorageLogo = localStorage.getItem("organization_logo");
      if (localStorageLogo) {
        this.organizationLogo = localStorageLogo;
      } else {
        organizationsService
          .getOrganizationInfo(localStorage.getItem("organization_id"))
          .then(response => {
            logoString = response.data.logo;
            this.organizationLogo = logoString;
            localStorage.setItem("organization_logo", logoString);
          });
      }
    },
  },
  mounted() {
    this.loadLogo();
  }
}

</script>
