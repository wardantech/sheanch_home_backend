<template>
  <div>
    <div class="card mb-5">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="card-title m-0">Tenant Details</h5>

        <nuxt-link :to="{ name: 'properties-create' }" class="btn btn-sm btn-info">
          <font-awesome-icon icon="fa-solid fa-plus"/>
          Add Tenant
        </nuxt-link>
      </div>

      <div class="card-body">
        <b-row>
          <b-col md="9">
            <table class="table table-bordered table-hover">
              <tbody>

              <tr>
                <td>Name</td>
                <td>{{ tenant.name }}</td>
              </tr>
              <tr>
                <td>E-mail</td>
                <td>{{ tenant.email }}</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>{{ tenant.mobile }}</td>
              </tr>
              <tr>
                <td>NID</td>
                <td>{{ tenant.nid }}</td>
              </tr>
              <tr>
                <td>Passport</td>
                <td>{{ tenant.passport_no }}</td>
              </tr>
              <tr>
                <td>Gender</td>
                <td v-if="tenant.gender === 1">Male</td>
                <td v-if="tenant.gender === 2">Female</td>
                <td v-if="tenant.gender === 2">Others</td>
              </tr>
              <tr>
                <td>Date of birth</td>
                <td>{{ tenant.dob }}</td>
              </tr>
              <tr>
                <td>Marital Status</td>
                <td v-if="tenant.marital_status === 1">Married</td>
                <td v-if="tenant.marital_status === 2">Unmarried</td>
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
                <td>Physical Address</td>
                <td>{{ tenant.physical_address }}</td>
              </tr>
              <tr>
                <td>Postal Address</td>
                <td>{{ tenant.postal_address }}</td>
              </tr>
              <tr>
                <td>Postal Code</td>
                <td>{{ tenant.postal_code }}</td>
              </tr>

              </tbody>
            </table>
          </b-col>

          <b-col md="3">
            <b-img thumbnail :src="imageUrl+image" alt="Tenant image" style="object-fit: cover; height: 150px; width: 100%; margin-top: 26px;"></b-img>
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
        'tenant': '',
        'division': '',
        'district': '',
        'thana': '',
        'image': '',
      }
    },
    async created() {
      const response = await this.$axios.$post('tenant/show',  {tenantId: this.$route.params.id});

      this.tenant = response.data;
      this.division = response.data.division.name;
      this.district = response.data.district.name;
      this.thana = response.data.thana.name;
      this.image = response.data.image;
    },
  }
</script>

<style scoped>

</style>
