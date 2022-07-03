<template>
  <div>
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="card-title m-0">{{ property.name }}</h5>

        <nuxt-link :to="{ name: 'properties-create' }" class="btn btn-info">
          <font-awesome-icon icon="fa-solid fa-plus"/>
          Add Property
        </nuxt-link>
      </div>

      <div class="card-body">
        <b-row>
          <b-col md="12">
            <table class="table table-bordered table-hover">
              <tbody>
                <tr>
                  <td>Thana</td>
                  <td>{{ thana_name }}</td>
                </tr>
                <tr>
                  <td>District</td>
                  <td>{{ district_name }}</td>
                </tr>
                <tr>
                  <td>Division</td>
                  <td>{{ division_name }}</td>
                </tr>
                <tr>
                  <td>Property Type</td>
                  <td>{{ property_type_name }}</td>
                </tr>
                <tr>
                  <td>Lease Type</td>
                  <td>{{ (property.lease_type == 1) ? 'Commercial' : 'Residential' }}</td>
                </tr>
                <tr>
                  <td>Sale Type</td>
                  <td>{{ (property.sale_type == 1) ? 'For Rent' : 'For Sale' }}</td>
                </tr>
                <tr>
                  <td>House No</td>
                  <td>{{ property.house_no }}</td>
                </tr>
                <tr>
                  <td>ZIP Code</td>
                  <td>{{ property.zip_code }}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>{{ property.address }}</td>
                </tr>
                <tr>
                  <td>Bed Rooms</td>
                  <td>{{ property.bed_rooms }}</td>
                </tr>
                <tr>
                  <td>Bath Rooms</td>
                  <td>{{ property.bath_rooms }}</td>
                </tr>
                <tr>
                  <td>Units</td>
                  <td>{{ property.units }}</td>
                </tr>
                <tr>
                  <td>Area Size</td>
                  <td>{{ property.area_size }}</td>
                </tr>
                <tr>
                  <td>Rent amount</td>
                  <td>৳ {{ property.rent_amount }}</td>
                </tr>
                <tr>
                  <td>Security Money</td>
                  <td>৳ {{ property.security_money }}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td> {{ (property.status == 1) ? 'Active' : 'Inactive'  }}</td>
                </tr>
                <tr>
                  <td>Descriptions</td>
                  <td> {{ property.description }}</td>
                </tr>
              </tbody>
            </table>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="12">
            <h5 class="card-title">Image Section</h5>
          </b-col>
        </b-row>

        <b-row>
          <b-col md="4" lg="3" sm="12" v-for="(img, i) in images" :key="i">
            <img :src="imageUrl+img" alt="property.name" width="100%" height="100%" style="object-fit: cover;">
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
        property: '',
        thana_name: '',
        district_name: '',
        division_name: '',
        property_type_name: '',
        landlord_name: '',
        images: ''
      }
    },

    async created() {
      await this.$axios.$get('property/show/' + this.$route.params.id)
        .then(response => {
          this.property = response.data;

          if(this.property.image != null){
            this.images = this.property.image.split(',');
          }

          this.thana_name = this.property.thana.name;
          this.district_name = this.property.district.name;
          this.division_name = this.property.division.name;
          this.property_type_name = this.property.property_type.name;
          this.landlord_name = this.property.landlord.name;
        })
    },
  }
</script>

<style scoped>

</style>
