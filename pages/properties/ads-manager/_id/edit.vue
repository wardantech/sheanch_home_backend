<template>
  <div>
    <!--Body Card-->
    <b-row>
      <b-col md="12">
        <div class="card mt-3">
          <div class="card-header">
            <h5 class="card-title m-0">Update Property Ad</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="update">
              <b-row>
                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Select Landlord">
                    <select @change="getProperties(form.landlord_id)" v-model="form.landlord_id" id=""
                            class="form-control custom-select-form-control">
                      <option value="">Select</option>
                      <option v-for="(landlord, i) in landlords"
                              :value="landlord.id" :key="i">
                        {{ landlord.name }}
                      </option>
                    </select>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.landlord_id">{{ errors.landlord_id[0] }}</strong>
                  </b-form-group>
                </b-col>
                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Property">
                    <select @change="setRent" v-model="form.property_id"
                            class="form-control custom-select-form-control">
                      <option value="">Select</option>
                      <option v-for="(property, i) in properties"
                              :sale_type="property.sale_type"
                              :property_category="property.property_category"
                              :security_money="property.security_money"
                              :rent_amount="property.rent_amount"
                              :division_id="property.division_id"
                              :district_id="property.district_id"
                              :thana_id="property.thana_id"
                              :property_type_id="property.property_type_id"
                              :value="property.id" :key="i">
                        {{ property.name }}
                      </option>
                    </select>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.property_id">{{ errors.property_id[0] }}</strong>
                  </b-form-group>
                </b-col>
                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Property category">
                    <b-form-input
                      class="custom-form-control"
                      v-model="form.property_category"
                      type="text"
                      placeholder="Property category"
                      readonly
                    >
                    </b-form-input>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.property_category">{{ errors.property_category[0] }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Status">
                    <select v-model="form.status" id="" class="form-control">
                      <option value="">Select</option>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.status">{{ errors.status[0] }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Rent amount">
                    <b-form-input class="custom-form-control" v-model="form.rent_amount" type="text" placeholder="Rent amount"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.rent_amount">{{ errors.rent_amount[0] }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Security money">
                    <b-form-input class="custom-form-control" v-model="form.security_money" type="text" placeholder="Rent amount"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.security_money">{{ errors.security_money[0] }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Start date">
                    <b-form-input class="custom-form-control" v-model="form.start_date" type="date"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.start_date">{{ errors.start_date[0] }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="End date">
                    <b-form-input class="custom-form-control" v-model="form.end_date" type="date"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.end_date">{{ errors.start_date[0] }}</strong>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col md="12">
                  <b-form-group label="Description">
                    <b-form-textarea
                      class="custom-form-control"
                      v-model="form.description"
                      placeholder="Say something..."
                      rows="3"
                    ></b-form-textarea>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-form-group>
                <b-button size="sm" type="submit" variant="dark">Save</b-button>
              </b-form-group>
            </form>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>


export default {
  name: "create",
  components: {},
  data() {
    return {
      form: {
        landlord_id: '',
        property_id:'',
        property_category:'',
        property_category_id:'',
        property_type_id:'',
        division_id:'',
        district_id:'',
        thana_id:'',
        rent_amount: '',
        sale_type: '',
        security_money: '',
        start_date: '',
        end_date:'',
        description: '',
        status: '',
      },
      landlords: '',
      properties: '',
      errors: {}
    }
  },
  async created() {

    const propertyAdData = await this.$axios.$post('property/ad/get-property-edit-data', {
      id: this.$route.params.id,
    });
    this.landlords = propertyAdData.data.landlords;
    this.properties = propertyAdData.data.properties;
    this.form.landlord_id = propertyAdData.data.propertyAd.landlord_id;
    this.form.property_id = propertyAdData.data.propertyAd.property_id;

    this.form = propertyAdData.data.propertyAd;
    this.form.property_category_id = propertyAdData.data.propertyAd.property_category;


    propertyAdData.data.propertyAd.property_category == 1
      ? this.form.property_category = 'Commercial'
      : this.form.property_category = 'Residential';
  },

  methods: {
    async getProperties(landlord_id) {
      let properties = await this.$axios.$post('property/ad/get-property-as-landlord', {landlordId: landlord_id});
      this.properties = properties.data;
    },

    setRent(event) {
      var options = event.target.options
      if (options.selectedIndex > -1) {
        this.form.rent_amount = options[options.selectedIndex].getAttribute('rent_amount');
        this.form.security_money = options[options.selectedIndex].getAttribute('security_money');
        this.form.sale_type = options[options.selectedIndex].getAttribute('sale_type');

        options[options.selectedIndex].getAttribute('property_category') == 1
          ? this.form.property_category = 'Commercial'
          : this.form.property_category = 'Residential';

        console.log(options[options.selectedIndex].getAttribute('property_category'))

        this.form.division_id = options[options.selectedIndex].getAttribute('division_id');
        this.form.district_id = options[options.selectedIndex].getAttribute('district_id');
        this.form.thana_id = options[options.selectedIndex].getAttribute('thana_id');
        this.form.property_category_id = options[options.selectedIndex].getAttribute('property_category');
        this.form.property_type_id = options[options.selectedIndex].getAttribute('property_type_id');

      }
    },

    async update() {
      console.log();
      await this.$axios.$post('property/ad/update/'+ this.$route.params.id, this.form)
        .then(response => {
          this.$izitoast.success({
            title: 'Success !!',
            message: 'Property Ad update successfully!'
          });

          this.$router.push({name: 'properties-ads-manager'});
        })
        .catch(error => {
          if (error.response.status == 422) {
            this.errors = error.response.data.errors
          } else {
            alert(error.response.message)
          }

        })
    },
  }
}
</script>

<style scoped lang="scss">

</style>
