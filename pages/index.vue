<template>
  <div>
    <div>
      <b-row>
        <b-col lg="4" md="6" sm="12">
          <div class="dashboard-status status-success">
            <div class="dashboard-status-content">
              <h4>{{ data.totalProperties }}</h4>
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
              <h4>{{ data.totalPropertyAds }}</h4>
              <span>Approved Ads</span>
            </div>
            <div class="dashboard-status-icon">
              <font-awesome-icon icon="fa-solid fa-circle-check" />
            </div>
          </div>
        </b-col>

        <b-col lg="4" md="6" sm="12">
          <div class="dashboard-status status-info">
            <div class="dashboard-status-content">
              <h4>{{ data.totalCompleteDeed }}</h4>
              <span>Complete Deeds</span>
            </div>
            <div class="dashboard-status-icon">
              <font-awesome-icon icon="fa-solid fa-circle-check" />
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
  components: { Login, Default },
  data() {
    return {
      data: '',
    }
  },
  computed: {
    loggedInUser() {
      return this.$auth.loggedIn
    }
  },
  mounted() {
    if (!this.$auth.loggedIn) {
      this.$router.push({ name: 'login' });
    }
  },

  async created() {
    await this.$axios.$post('get-dashboard-data')
      .then(response => {
        this.data = response.data;
      })
  }
}
</script>
