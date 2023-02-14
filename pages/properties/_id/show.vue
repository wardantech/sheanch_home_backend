<template>
  <div>
    <div v-if="isloading" class="text-center">
      <p style="font-size: 20px;">Loading...</p>
    </div>
    <div v-else class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="card-title m-0">{{ property.name }}</h5>

        <nuxt-link :to="{ name: 'properties-id-edit', params: { id: this.$route.params.id } }"
          class="btn btn-sm btn-info">
          <font-awesome-icon icon="fa-solid fa-edit" />
          Edit property
        </nuxt-link>
      </div>

      <div class="card-body">
        <b-row>
          <b-col md="12">
            <b-tabs content-class="mt-3" justified>
              <b-tab title="Informations" active>
                <table class="table table-bordered table-hover">
                  <tbody>
                    <tr>
                      <td>Landlord</td>
                      <td>{{ property.name }}</td>
                    </tr>
                    <tr>
                      <td>Division</td>
                      <td>{{ property.division }}</td>
                    </tr>
                    <tr>
                      <td>District</td>
                      <td>{{ property.district }}</td>
                    </tr>
                    <tr>
                      <td>Thana</td>
                      <td>{{ property.thana }}</td>
                    </tr>
                    <tr>
                      <td>Property type</td>
                      <td>{{ property.property_type }}</td>
                    </tr>
                    <tr>
                      <td>Property category</td>
                      <td v-if="property.property_category == 1">Commercial</td>
                      <td v-else>Residential</td>
                    </tr>
                    <tr>
                      <td>Sale type</td>
                      <td v-if="property.sale_type == 1">Rent</td>
                      <td v-else>Sale</td>
                    </tr>
                    <tr>
                      <td>Bed rooms</td>
                      <td>{{ property.bed_rooms }}</td>
                    </tr>
                    <tr>
                      <td>Balcony</td>
                      <td>{{ property.balcony }}</td>
                    </tr>
                    <tr>
                      <td>Floor</td>
                      <td>{{ property.floor }}</td>
                    </tr>
                    <tr>
                      <td>Bath rooms</td>
                      <td>{{ property.bath_rooms }}</td>
                    </tr>
                    <tr>
                      <td>Holding number</td>
                      <td>{{ property.holding_number }}</td>
                    </tr>
                    <tr>
                      <td>Road number</td>
                      <td>{{ property.road_number }}</td>
                    </tr>
                    <tr>
                      <td>Zip code</td>
                      <td>{{ property.zip_code }}</td>
                    </tr>
                    <tr>
                      <td>Address</td>
                      <td>{{ property.address }}</td>
                    </tr>
                    <tr>
                      <td>Rent amount</td>
                      <td>{{ property.rent_amount }}</td>
                    </tr>
                    <tr>
                      <td>Security money</td>
                      <td>{{ property.security_money }}</td>
                    </tr>
                    <tr>
                      <td>Total amount</td>
                      <td>{{ property.total_amount }}</td>
                    </tr>
                    <tr>
                      <td>Area size</td>
                      <td>{{ property.area_size }}</td>
                    </tr>
                    <tr>
                      <td>Facilitie</td>
                      <td>
                        <b-badge v-for="(facility, index) in facilities" :key="index" class="mr-2" variant="primary">
                          {{ facility.name }}
                        </b-badge>
                      </td>
                    </tr>
                    <tr>
                      <td>Active status</td>
                      <td v-if="property.status == 1"><b-badge variant="primary">Active</b-badge></td>
                      <td v-else><b-badge variant="danger">Deactive</b-badge></td>
                    </tr>
                    <tr>
                      <td>Description</td>
                      <td>{{ property.description }}</td>
                    </tr>
                    <tr>
                      <td>Create at</td>
                      <td>{{ property.created_at }}</td>
                    </tr>
                  </tbody>
                </table>
              </b-tab>
              <b-tab title="Utilities">
                <b-row>
                  <b-col md="12">
                    <table class="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th scope="col">No</th>
                          <th scope="col">Name</th>
                          <th scope="col">Paid by</th>
                          <th scope="col">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(utility, index) in property.utilities" :key="index">
                          <th scope="row">{{ index+1 }}</th>
                          <td>{{ utility.utility_name }}</td>
                          <td v-if="utility.utility_paid_by == 1">Landlord</td>
                          <td v-else>Tenant</td>
                          <td>{{ utility.utility_amount }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </b-col>
                </b-row>
              </b-tab>
              <b-tab title="Images">
                <b-row>
                  <b-col md="4" lg="3" sm="12" v-for="(image, index) in images" :key="index">
                    <b-img thumbnail fluid :src="image.url" :alt="property.name" style="height: 188px;"></b-img>
                  </b-col>
                </b-row>
              </b-tab>
              <b-tab title="Video">
                <div class="block-body p-0" v-html="property.video_link"></div>
              </b-tab>
              <b-tab title="Location Map">
                <b-col md="12" v-html="property.google_map_location"></b-col>
              </b-tab>
            </b-tabs>
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
      facilities: '',
      property: '',
      images: ''
    }
  },
  async created() {
    await this.$axios.$get('property/show/' + this.$route.params.id)
      .then(response => {
        this.property = response.data.property;
        this.images = response.data.images;
        this.facilities = response.data.facilities;
        this.isloading = false;
      }).catch(error => {
        alert(error);
      });
  },
}
</script>

<style scoped lang="scss">
iframe {
  width: 100% !important;
}
</style>
