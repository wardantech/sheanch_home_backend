<template>
  <div>
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="card-title m-0">{{ landlord.name }}</h5>
      </div>

      <div class="card-body">
        <b-row>
          <b-col md="8">
            <table class="table table-bordered table-hover">
              <tbody>
              <tr>
                <td>Name</td>
                <td>{{ landlord.name }}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{{ landlord.email }}</td>
              </tr>
              <tr>
                <td>Mobile</td>
                <td>{{ landlord.mobile }}</td>
              </tr>
              <tr>
                <td>Nid</td>
                <td>{{ landlord.nid }}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{{ landlord.status ? 'Active': 'Inactive' }}</td>
              </tr>
              <tr>
                <td>Mobile</td>
                <td>{{ landlord.mobile }}</td>
              </tr>
              <tr>
                <td>Division</td>
                <td>{{ division }}</td>
              </tr>
              <tr>
                <td>District</td>
                <td>{{ district }}</td>
              </tr>
              <tr>
                <td>Thana</td>
                <td>{{ thana }}</td>
              </tr>
              <tr>
                <td>Postal address</td>
                <td>{{ landlord.postal_address }}</td>
              </tr>
              <tr>
                <td>Residential address</td>
                <td>{{ landlord.residential_address }}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>{{ landlord.description }}</td>
              </tr>
              </tbody>
            </table>
          </b-col>
          <b-col md="4" class="mt-3">
            <img style="height: 200px; width: 100%; object-fit: cover;" :src="imageUrl+landlord.image" alt="">
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
      landlord: '',
      division: '',
      district: '',
      thana: '',
      image: ''
    }
  },

  async created() {
    await this.$axios.$post('/landlord/show', {
      landlordId: this.$route.params.id
    })
      .then(response => {

        this.landlord = response.data;
        this.division = this.landlord.division.name;
        this.district = this.landlord.district.name;
        this.thana = this.landlord.thana.name;
        this.image = response.data.media;
      })
  },
}
</script>

<style scoped>

</style>
