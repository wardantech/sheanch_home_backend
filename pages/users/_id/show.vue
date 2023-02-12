<template>
  <div>
    <div v-if="isloading" class="text-center">
      <p style="font-size: 20px;">Loading...</p>
    </div>
    <div v-else class="card mb-5">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="card-title m-0">User Details</h5>

        <nuxt-link :to="{ name: 'users-id-edit', params: { id: this.$route.params.id } }" class="btn btn-sm btn-info">
          <font-awesome-icon icon="fa-solid fa-plus" />
          Edit user
        </nuxt-link>
      </div>

      <div class="card-body">
        <b-row>
          <b-col md="9">
            <table class="table table-bordered table-hover">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{{ user.name }}</td>
                </tr>
                <tr>
                  <td>E-mail</td>
                  <td>{{ user.email }}</td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>{{ user.mobile }}</td>
                </tr>
                <tr>
                  <td>NID</td>
                  <td>{{ user.nid }}</td>
                </tr>
                <tr>
                  <td>Division</td>
                  <td>{{ user.division }}</td>
                </tr>
                <tr>
                  <td>District</td>
                  <td>{{ user.district }}</td>
                </tr>
                <tr>
                  <td>Thana</td>
                  <td>{{ user.thana }}</td>
                </tr>
                <tr>
                  <td>Postal Address</td>
                  <td>{{ user.postal_address }}</td>
                </tr>
                <tr>
                  <td>Residential Address</td>
                  <td>{{ user.residential_address }}</td>
                </tr>
              </tbody>
            </table>
          </b-col>

          <b-col md="3">
            <b-img thumbnail :src="imageUrl + user.image" alt="Tenant image"
              style="object-fit: cover; width: 100%; margin-top: 26px;"></b-img>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "show",
  computed: {
    imageUrl() {
      return `${process.env.APP_ROOT_IMG_URL}`
    }
  },
  data() {
    return {
      isloading: true,
      user: ''
    }
  },
  async created() {
    await this.$axios.$post('users/show', { userId: this.$route.params.id })
      .then(response => {
        this.user = response.data.user;
        this.isloading = false;
      }).catch(error => {
        alert(error);
      });
  },
}
</script>

<style scoped>

</style>
