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
                  <b-form-group label="Select Users">
                    <select @change="getProperties" v-model="form.user_id" id=""
                      class="form-control custom-select-form-control">
                      <option value="">Select</option>
                      <option v-for="(user, index) in users" :value="user.id" :key="index">
                        {{ user.name }}
                      </option>
                    </select>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.user_id">{{
                      errors.user_id[0]
                    }}</strong>
                  </b-form-group>
                </b-col>
                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Property">
                    <select @change="setRent" v-model="form.property_id" id=""
                      class="form-control custom-select-form-control">
                      <option value="">Select</option>
                      <option v-for="(property, i) in properties" :sale_type="property.sale_type"
                        :property_category="property.property_category" :security_money="property.security_money"
                        :rent_amount="property.rent_amount" :division_id="property.division_id"
                        :district_id="property.district_id" :thana_id="property.thana_id"
                        :property_type_id="property.property_type_id" :value="property.id" :key="i">
                        {{ property.name }}
                      </option>
                    </select>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.property_id">{{
                      errors.property_id[0]
                    }}</strong>
                  </b-form-group>
                </b-col>
                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Property category">
                    <b-form-input class="custom-form-control" v-model="form.property_category" type="text"
                      placeholder="Property category" readonly>
                    </b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.property_category">{{
                      errors.property_category[0]
                    }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Status">
                    <select v-model="form.status" id="" class="form-control custom-select-form-control">
                      <option value="">Select</option>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>

                    </select>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.status">{{
                      errors.status[0]
                    }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Rent amount">
                    <b-form-input class="custom-form-control" v-model="form.rent_amount" type="text"
                      placeholder="Rent amount"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.rent_amount">{{
                      errors.rent_amount[0]
                    }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Security money">
                    <b-form-input class="custom-form-control" v-model="form.security_money" type="text"
                      placeholder="Rent amount"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.security_money">{{
                      errors.security_money[0]
                    }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Start date">
                    <b-form-input class="custom-form-control" v-model="form.start_date" type="date"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.start_date">{{
                      errors.start_date[0]
                    }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="End date">
                    <b-form-input class="custom-form-control" v-model="form.end_date" type="date"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.end_date">{{
                      errors.start_date[0]
                    }}</strong>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col md="12">
                  <b-form-group label="Description">
                    <b-form-textarea class="custom-form-control" v-model="form.description"
                      placeholder="Say something..." rows="3"></b-form-textarea>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-form-group>
                <b-button size="sm" type="submit" variant="info" :disabled="isDisable">Save</b-button>
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
        user_id: '',
        property_id: '',
        property_category: '',
        property_category_id: '',
        property_type_id: '',
        division_id: '',
        district_id: '',
        thana_id: '',
        rent_amount: '',
        sale_type: '',
        security_money: '',
        start_date: '',
        end_date: '',
        description: '',
        status: '',
      },
      users: '',
      properties: '',
      isDisable: false,
      errors: {}
    }
  },
  async created() {
    await this.$axios.$post('property/ad/create')
      .then(response => {
        this.users = response.data.users;
      }).catch(err => {
        alert(err);
      });
  },
  methods: {
    async getProperties(event) {
      await this.$axios.$post('property/ad/get-property', { userId: event.target.value })
        .then(response => {
          this.properties = response.data.properties;
        }).catch(err => {
          alert(err);
        });
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

        this.form.division_id = options[options.selectedIndex].getAttribute('division_id');
        this.form.district_id = options[options.selectedIndex].getAttribute('district_id');
        this.form.thana_id = options[options.selectedIndex].getAttribute('thana_id');
        this.form.property_category_id = options[options.selectedIndex].getAttribute('property_category');
        this.form.property_type_id = options[options.selectedIndex].getAttribute('property_type_id');
      }
    },
    async store() {
      this.isDisable = true;
      await this.$axios.$post('property/ad/store', this.form)
        .then(response => {
          this.$izitoast.success({
            title: 'Success !!',
            message: 'Property Ad create successfully!'
          });

          this.$router.push({ name: 'properties-ads-manager' });
        }).catch(error => {
          this.isDisable = false;
          if (error.response.status == 422) {
            this.errors = error.response.data.errors
          } else {
            alert(error.response.message)
          }
        });
    },
  }
}
</script>
