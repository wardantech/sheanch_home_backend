<template>
  <div>
    <div>
      <b-row>
        <b-col lg="4" md="6" sm="12">
          <div class="dashboard-status status-success">
            <div class="dashboard-status-content">
              <h4>288,999</h4>
              <span>Approved properties</span>
            </div>
            <div class="dashboard-status-icon">
              <font-awesome-icon icon="fa-solid fa-circle-check" />
            </div>
          </div>
        </b-col>

        <b-col lg="4" md="6" sm="12">
          <div class="dashboard-status status-warning">
            <div class="dashboard-status-content">
              <h4>100,000</h4>
              <span>Pending approve properties</span>
            </div>
            <div class="dashboard-status-icon">
              <font-awesome-icon icon="fa-solid fa-circle-dollar-to-slot" />
            </div>
          </div>
        </b-col>

        <b-col lg="4" md="6" sm="12">
          <div class="dashboard-status status-info">
            <div class="dashboard-status-content">
              <h4>200,000</h4>
              <span>Rejected properties</span>
            </div>
            <div class="dashboard-status-icon">
              <font-awesome-icon icon="fa-solid fa-circle-nodes" />
            </div>
          </div>
        </b-col>

      </b-row>
    </div>

  </div>

</template>

<script>

import Default from "~/layouts/default";
import Login from "@/pages/login";

export default {
  name: 'IndexPage',
  components: {Login, Default},
  //middleware: 'auth',
  //middleware: ['authenticated'],
  computed: {
    loggedInUser() {
      return this.$auth.loggedIn
    }
  },
  async mounted() {
    //console.log(this.$store.state.auth.user)
    console.log(this.$auth.loggedIn)
    //await this.$auth.logout();

    if (!this.$auth.loggedIn) {
      this.$router.push({name: 'login'});
    }
  }
}
</script>
