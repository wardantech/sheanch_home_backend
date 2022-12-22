<template>
    <div>
      <!--Body Card-->
      <b-row>
        <b-col md="12">
          <div class="card mt-3">
            <div class="card-header">
              <h5 class="card-title m-0">Edit Landlord</h5>
            </div>
            <div class="card-body">
              <b-form @submit.prevent="update">
                <b-row>
                  <b-col lg="4" md="4" sm="12">
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
                  <b-col lg="4" md="4" sm="12">
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
                  <b-col lg="4" md="4" sm="12">
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
                </b-row>
  
                <b-row>
                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Area Name">
                    <b-form-input min="1" v-model="form.name" class="custom-form-control"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.name">{{
                        errors.name[0]
                      }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Area Bangla Name">
                    <b-form-input min="1" v-model="form.bn_name" class="custom-form-control"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.bn_name">{{
                        errors.bn_name[0]
                      }}</strong>
                  </b-form-group>
                </b-col>
              </b-row>
  
                <b-form-group>
                  <b-button type="submit" variant="dark">Save</b-button>
                </b-form-group>
  
              </b-form>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </template>
  
  <script>
  import Dropzone from 'nuxt-dropzone'
  import 'nuxt-dropzone/dropzone.css'
  
  export default {
    name: "edit",
    data() {
      return {
        form: {
          name: '',
          bn_name: '',
          thana_id: '',
          district_id: '',
          division_id: '',
        },
        area:'',
        divisions: '',
        districts: '',
        thanas: '',
        errors: {}
      }
    },
    async created() {
      await this.$axios.$get('/settings/area/'+ this.$route.params.id)
        
        .then(response=>{
          this.form = response.data.area
          this.getDivisions()
          this.getDistricts(this.form.division_id)
          this.getThanas(this.form.district_id)
        })
        //.catch(error=>this.errors = error.response.data.errors)
        //.finally(() =>{this.loading =  false});
  
  
    },
  
  
    methods: {
      async getDivisions() {
        let divisions = await this.$axios.$get('settings/divisions')
        this.divisions = divisions.data
  
      },
  
      async getDistricts(division_id) {
        this.thanas = '';
        let district = await this.$axios.$post('settings/districts', {divisionId: division_id});
        this.districts = district.data;
      },
  
      async getThanas(district_id) {
        let thanas = await this.$axios.$post('settings/thanas', {districtId: district_id});
        this.thanas = thanas.data;
      },
  
      async update() {
  
        await this.$axios.$put('settings/area/'+this.$route.params.id, this.form, )
          .then(response => {
  
            this.$izitoast.success({
              title: 'Success !!',
              message: 'Area updated successfully!'
            })
            this.$router.push({name: 'settings-area'});
          })
          .catch(error => {
            if(error.response.status == 422){
              this.errors = error.response.data.errors
            }
            else{
              alert(error.response.message)
            }
  
          })
      },
  
    }
  }
  </script>
  
  <style scoped lang="scss">
  
  </style>
  