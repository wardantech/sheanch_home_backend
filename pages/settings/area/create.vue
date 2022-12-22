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
                  <b-col lg="4" md="4" sm="6">
                  <b-form-group label="Division">
                    <select @change="getDistricts(form.division_id)" v-model="form.division_id" id=""
                            class="form-control custom-select-form-control">
                      <option value="">Select</option>
                      <option v-for="(division, i) in divisions" :value="division.id" :key="i">
                        {{ division.name }}
                      </option>
                    </select>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.division_id">{{ errors.division_id[0] }}</strong>
                  </b-form-group>
                </b-col>
                  <b-col lg="4" md="4" sm="6">
                  <b-form-group label="District">
                    <select @change="getThanas(form.district_id)" v-model="form.district_id" id=""
                            class="form-control custom-select-form-control">
                      <option value="">Select</option>
                      <option v-for="(district, i) in districts" :value="district.id" :key="i">
                        {{ district.name }}
                      </option>
                    </select>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.district_id">{{ errors.district_id[0] }}</strong>
                  </b-form-group>
                </b-col>
                <b-col lg="4" md="4" sm="6">
                  <b-form-group label="Thana">
                    <select v-model="form.thana_id" id="" class="form-control custom-select-form-control">
                      <option value="">Select</option>
                      <option v-for="(thana, i) in thanas" :value="thana.id" :key="i">
                        {{ thana.name }}
                      </option>
                    </select>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.thana_id">{{ errors.thana_id[0] }}</strong>
                  </b-form-group>
                </b-col>
                <b-col lg="6" md="6" sm="6">
                    <b-form-group label="Area Name">
                      <b-form-input v-model="form.name" type="text" class="custom-form-control"
                                    placeholder="Name"></b-form-input>
                      <strong class="text-danger" style="font-size: 12px" v-if="errors.name">{{
                        errors.name[0]
                        }}</strong>
                    </b-form-group>
                  </b-col>
                  <b-col lg="6" md="6" sm="6">
                    <b-form-group label="Area Name Bangla">
                      <b-form-input v-model="form.bn_name" type="text" class="custom-form-control"
                                    placeholder="BN Name"></b-form-input>
                      <strong class="text-danger" style="font-size: 12px" v-if="errors.bn_name">{{
                        errors.bn_name[0]
                        }}</strong>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-group>
                      <b-button size="sm" type="submit" variant="info">Save</b-button>
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
      name: "create",
      data() {
        return {
          form: {
            division_id: '',
            district_id: '',
            thana_id:'',
            name: '',
            bn_name: ''
          },
          errors: {},
          divisions: '',
        districts: '',
        thanas: ''
        }
      },
      async created() {
      let divisions = await this.$axios.$get('settings/divisions')
      this.divisions = divisions.data
      console.log(this.$auth.strategy.token.get())
    },
      methods: {
        async getDistricts(division_id) {
        this.thanas = '';
        let district = await this.$axios.$post('settings/districts', {divisionId: division_id});
        this.districts = district.data;
      },

      async getThanas(district_id) {
        let thanas = await this.$axios.$post('settings/thanas', {districtId: district_id});
        this.thanas = thanas.data;
      },
        async store() {
          await this.$axios.$post('settings/area', this.form,)
            .then(response => {
              //console.log(response);
              this.$izitoast.success({
                title: 'Success !!',
                message: 'Area create successfully!'
              })
              this.$router.push({name: 'settings-area'});
            })
            .catch(error => {
              if (error.response.status == 422) {
                this.errors = error.response.data.errors
              }
              else {
                alert(error.response.message)
              }
            })
        }
      }
    }
  </script>
  
  <style scoped>
  
  </style>
  