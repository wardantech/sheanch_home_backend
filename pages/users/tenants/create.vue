<template>
  <div>
    <b-row>
      <b-col md="8">
        <div class="card mt-3">
          <div class="card-header">
            <h5 class="card-title m-0">Create Tenants</h5>
          </div>
          <div class="card-body">
            <b-form @submit.prevent="store">

              <b-row>
                <b-col md="12">
                  <b-form-group label="Name">
                    <b-form-input v-model="form.name" type="text" class="custom-form-control" placeholder="Name"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.name">{{
                      errors.name[0]
                      }}</strong>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Email">
                    <b-form-input v-model="form.email" type="email" class="custom-form-control" placeholder="Email"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.email">{{
                      errors.email[0]
                      }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Mobile">
                    <b-form-input v-model="form.mobile" type="text" class="custom-form-control" placeholder="Mobile"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.mobile">{{
                      errors.mobile[0]
                      }}</strong>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col lg="6" md="6" sm="12">
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

                <b-col lg="6" md="6" sm="12">
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
              </b-row>

              <b-row>
                <b-col lg="6" md="6" sm="12">
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

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Status">
                    <select v-model="form.status" id="" class="form-control custom-select-form-control">
                      <option value="">Select</option>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.status">{{ errors.status[0] }}</strong>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Gender">
                    <select v-model="form.gender" id="" class="form-control custom-select-form-control">
                      <option value="">Select</option>
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                      <option value="3">Others</option>
                    </select>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.gender">{{ errors.gender[0] }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Date of birth">
                    <b-form-input v-model="form.dob" type="date"
                                  placeholder="Date of Birth" class="custom-form-control"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.dob">{{ errors.dob[0] }}</strong>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="National Id">
                    <b-form-input v-model="form.nid" class="custom-form-control" type="text"
                                  placeholder="National Id"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.nid">{{ errors.nid[0] }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Passport No">
                    <b-form-input v-model="form.passport_no" class="custom-form-control" type="text"
                                  placeholder="Passport No"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.passport_no">{{ errors.passport_no[0] }}</strong>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Marital status">
                    <select v-model="form.marital_status" id="" class="form-control custom-select-form-control">
                      <option value="">Select</option>
                      <option value="1">Married</option>
                      <option value="2">Unmarried</option>
                    </select>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.marital_status">{{ errors.marital_status[0] }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Postal code">
                    <b-form-input v-model="form.postal_code" class="custom-form-control" type="text"
                                  placeholder="Postal code"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.postal_code">{{ errors.postal_code[0] }}</strong>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Password">
                    <b-form-input v-model="form.password" type="text" class="custom-form-control" placeholder="Password"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.password">{{ errors.password[0] }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Confirm Password">
                    <b-form-input v-model="form.password_confirmation" class="custom-form-control" type="text"
                                  placeholder="Password"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.password_confirmation">{{ errors.password_confirmation[0] }}</strong>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-form-group label="Postal Address">
                <b-form-textarea
                  class="custom-form-control"
                  id="postal"
                  placeholder="Postal Address..."
                  rows="3"
                  v-model="form.postal_address"
                ></b-form-textarea>
                <strong class="text-danger" style="font-size: 12px"
                        v-if="errors.postal_address">{{ errors.postal_address[0] }}</strong>
              </b-form-group>

              <b-form-group label="Physical Address">
                <b-form-textarea
                  class="custom-form-control"
                  id="physical_address"
                  placeholder="Physical Address..."
                  rows="3"
                  v-model="form.physical_address"
                ></b-form-textarea>
                <strong class="text-danger" style="font-size: 12px"
                        v-if="errors.physical_address">{{ errors.physical_address[0] }}</strong>
              </b-form-group>

              <b-row>
                <b-col>
                  <b-form-group>
                    <b-button size="sm" type="submit" variant="dark">Save</b-button>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-form>
          </div>
        </div>
      </b-col>

      <b-col md="4">
        <b-card class="mt-3" header="Upload Image">
          <b-form-group label="Image">
            <Dropzone id="foo" ref="el"
                      :options="options"
                      :destroyDropzone="false"
            >
            </Dropzone>
          </b-form-group>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import Dropzone from 'nuxt-dropzone'
  import 'nuxt-dropzone/dropzone.css'

  export default {
    name: "create",
    components: {
      Dropzone
    },
    data() {
      return {
        options: {
          url: "url",
          addRemoveLinks: true,
          headers: {"Authorization": this.$auth.strategy.token.get()},
          maxFiles: 1,
          autoProcessQueue: false,
          acceptedFiles: ".jpeg,.jpg,.png"
        },
        form: {
          name: '',
          email: '',
          mobile: '',
          thana_id: '',
          district_id: '',
          division_id: '',
          gender: '',
          dob: '',
          nid: '',
          marital_status: '',
          postal_address: '',
          physical_address: '',
          postal_code: '',
          passport_no: '',
          password: '',
          password_confirmation: ''
        },
        previewImage: null,
        tenants: '',
        divisions: '',
        districts: '',
        thanas: '',
        errors: {}
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
        await this.$axios.$post('tenant/store', this.form,)
          .then(response => {
            console.log(response);
            // this.$toast.success('Tenants create successfully!');
            this.$refs.el.dropzone.options.url = process.env.APP_ROOT_API+'tenant/image-upload/'+response.data.id;
            this.$refs.el.dropzone.processQueue();
            this.$izitoast.success({
              title: 'Success !!',
              message: 'Tenants create successfully!'
            })
            this.$router.push({name: 'users-tenants'});
          })
          .catch(error => {
            if(error.response.status == 422){
              this.errors = error.response.data.errors
            }
            else{
              alert(error.response.message)
            }
          })
      }
    }
  }
</script>

<style scoped lang="scss">
  .imagePreviewWrapper {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    display: block;
    cursor: pointer;
    margin: 0 auto 30px;
    background-size: cover;
    background-position: center center;
  }
</style>
