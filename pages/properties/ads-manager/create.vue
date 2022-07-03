<template>
  <div>
    <!--Body Card-->
    <b-row>
      <b-col md="12">
        <div class="card mt-3">
          <div class="card-header">
            <h5 class="card-title m-0">Create Property Ad</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="store">
              <b-row>

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Select Landlord">
                    <select @change="getProperties(form.landlord_id)" v-model="form.landlord_id" id=""
                            class="form-control">
                      <option value="">Select</option>
                      <option v-for="(landlord, i) in landlords" :value="landlord.id" :key="i">
                        {{ landlord.name }}
                      </option>
                    </select>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.landlord_id">{{ errors.landlord_id[0] }}</strong>
                  </b-form-group>
                </b-col>
                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Property">
                    <select @change="setRent" v-model="form.property_id" id=""
                            class="form-control">
                      <option value="">Select</option>
                      <option v-for="(property, i) in properties"
                              :sale_type="property.sale_type"
                              :security_money="property.security_money"
                              :rent_amount="property.rent_amount" :value="property.id" :key="i">
                        {{ property.name }}
                      </option>
                    </select>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.property_id">{{ errors.property_id[0] }}</strong>
                  </b-form-group>
                </b-col>
                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Rent amount">
                    <b-form-input v-model="form.rent_amount" type="text" placeholder="Rent amount"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.rent_amount">{{ errors.rent_amount[0] }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Security money">
                    <b-form-input v-model="form.security_money" type="text" placeholder="Rent amount"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.security_money">{{ errors.security_money[0] }}</strong>
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
                  <b-form-group label="Start date">
                    <b-form-input v-model="form.start_date" type="date"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.start_date">{{ errors.start_date[0] }}</strong>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col md="12">
                  <b-form-group label="Description">
                    <b-form-textarea
                      v-model="form.description"
                      placeholder="Say something..."
                      rows="3"
                    ></b-form-textarea>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-form-group>
                <b-button type="submit" variant="dark">Save</b-button>
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
        property_id: '',
        rent_amount: '',
        sale_type: '',
        security_money: '',
        start_date: '',
        description: '',
        status: '',
      },
      landlords: '',
      properties: '',
      errors: {}
    }
  },
  async created() {
    let landlords = await this.$axios.$get('landlord/get-landlords')
    this.landlords = landlords.data;

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
        console.log(this.form.sale_type);
      }
    },

    async store() {
      console.log();
      await this.$axios.$post('property/ad/store', this.form)
        .then(response => {
          this.$izitoast.success({
            title: 'Success !!',
            message: 'Property Ad create successfully!'
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
