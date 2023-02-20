<template>
  <div>
    <b-row>
      <b-col md="12">
        <div class="card mt-3">
          <div class="card-header">
            <h5 class="card-title m-0">
              Create Area
            </h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="store">
              <b-row>
                <b-col md="6">
                  <b-form-group label="Name">
                    <b-form-input v-model="form.name" type="text" class="custom-form-control"
                      placeholder="Name"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.name">{{
                      errors.name[0]
                    }}</strong>
                  </b-form-group>
                </b-col>

                <b-col md="6">
                  <b-form-group label="Select Division">
                    <select v-model="form.division_id" @change="getDistricts"
                      class="form-control custom-select-form-control">
                      <option value="">Select division</option>
                      <option v-for="(division, i) in divisions" :value="division.id" :key="i">
                        {{ division.name }}
                      </option>
                    </select>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.division_id">{{
                      errors.division_id[0]
                    }}</strong>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col md="6">
                  <b-form-group label="Select District">
                    <select v-model="form.district_id" @change="getThanas"
                      class="form-control custom-select-form-control">
                      <option value="">Select District</option>
                      <option v-for="(district, i) in districts" :value="district.id" :key="i">
                        {{ district.name }}
                      </option>
                    </select>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.district_id">{{
                      errors.district_id[0]
                    }}</strong>
                  </b-form-group>
                </b-col>

                <b-col md="6">
                  <b-form-group label="Select Thana">
                    <select v-model="form.thana_id" id="" class="form-control custom-select-form-control">
                      <option value="">Select District</option>
                      <option v-for="(thana, i) in thanas" :value="thana.id" :key="i">
                        {{ thana.name }}
                      </option>
                    </select>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.thana_id">{{
                      errors.thana_id[0]
                    }}</strong>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col>
                  <b-form-group>
                    <b-button size="sm" type="submit" variant="info" :disabled="isDisable">Save</b-button>
                  </b-form-group>
                </b-col>
              </b-row>
            </form>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'area-create',
  data() {
    return {
      form: {
        name: '',
        division_id: '',
        district_id: '',
        thana_id: ''
      },
      divisions: '',
      districts: '',
      thanas: '',
      isDisable: false,
      errors: {}
    }
  },
  async created() {
    await this.$axios.$post('areas/create')
      .then(response => {
        this.divisions = response.data.divisions;
      }).catch(error => {
        alert(error);
      });
  },
  methods: {
    async getDistricts(event) {
      let value = event.target.value;

      await this.$axios.$post('areas/get-districts', { divisionId: value })
        .then(response => {
          this.districts = '';
          this.districts = response.data.districts;
        }).catch(error => {
          alert(error);
        });
    },
    async getThanas(event) {
      let value = event.target.value;

      await this.$axios.$post('areas/get-thanas', { thanaId: value })
        .then(response => {
          this.thanas = '';
          this.thanas = response.data.thanas;
        }).catch(error => {
          alert(error);
        });
    },
    async store() {
      this.isDisable = true;
      await this.$axios.$post('areas/store', this.form)
        .then(response => {
          this.$izitoast.success({
            title: 'Success !!',
            message: response.message
          });
          this.$router.push({ name: 'settings-areas' });
        }).catch(error => {
          this.isDisable = false;
          if (error.response.status == 422) {
            this.errors = error.response.data.errors
          }
          else {
            alert(error.response.message)
          }
        });
    }
  }
}
</script>
