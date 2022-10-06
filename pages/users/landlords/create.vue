<template>
  <div>
    <!--Body Card-->
    <b-row>
      <b-col md="8">
        <div class="card mt-3">
          <div class="card-header">
            <h5 class="card-title m-0">Create Landlord</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="store">
              <b-row>
                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Name">
                    <b-form-input class="custom-form-control" v-model="form.name" type="text" placeholder="Name"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.name">{{
                      errors.name[0]
                      }}</strong>
                  </b-form-group>
                </b-col>
                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Mobile">
                    <b-form-input class="custom-form-control" type="text" v-model="form.mobile" placeholder="Mobile"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.mobile">{{ errors.mobile[0] }}</strong>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="NID">
                    <b-form-input class="custom-form-control" type="text" v-model="form.nid" placeholder="National ID"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.nid">{{
                      errors.nid[0]
                      }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Email">
                    <b-form-input class="custom-form-control" v-model="form.email" type="email" placeholder="Email"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.email">{{
                      errors.email[0]
                      }}</strong>
                  </b-form-group>
                </b-col>

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
                  <b-form-group label="Password">
                    <b-form-input class="custom-form-control" v-model="form.password" type="text" placeholder="Password"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.password">{{ errors.password[0] }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Confirm Password">
                    <b-form-input class="custom-form-control" v-model="form.password_confirmation" type="text"
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

              <b-form-group label="Residential Address">
                <b-form-textarea
                  class="custom-form-control"
                  id="residential"
                  placeholder="Residential Address..."
                  rows="3"
                  v-model="form.residential_address"
                ></b-form-textarea>
                <strong class="text-danger" style="font-size: 12px"
                        v-if="errors.residential_address">{{ errors.residential_address[0] }}</strong>
              </b-form-group>

              <b-form-group>
                <b-button size="sm" type="submit" variant="dark">Save</b-button>
              </b-form-group>
            </form>
          </div>
        </div>
      </b-col>

      <b-col md="4">
        <b-card class="mt-3" header="Image">
          <!--          <b-form-group label="Image">-->
          <!--            <b-form-file-->
          <!--              ref="fileInput"-->
          <!--              @input="pickFile"-->
          <!--            >-->
          <!--            </b-form-file>-->
          <!--            &lt;!&ndash;            <input type="hidden" v-model="form.image">&ndash;&gt;-->
          <!--            <strong class="text-danger" style="font-size: 12px" v-if="errors.nid">{{ errors.nid[0] }}</strong>-->
          <!--          </b-form-group>-->
          <!--          <div-->
          <!--            class="imagePreviewWrapper"-->
          <!--            :style="{ 'background-image': `url(${previewImage})` }">-->
          <!--          </div>-->
          <b-form-group label="Image">
            <dropzone id="foo" ref="el"
                      :options="options"
                      :destroyDropzone="false"
            >
            </dropzone>
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
          mobile: '',
          nid: '',
          email: '',
          image: '',
          status: '',
          thana_id: '',
          district_id: '',
          division_id: '',
          postal_address: '',
          residential_address: '',
          password: '',
          password_confirmation: '',
        },
        previewImage: null,
        landlord: '',
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
        await this.$axios.$post('landlord/store', this.form,)
          .then(response => {
            this.$izitoast.success({
              title: 'Success !!',
              message: 'Landlord create successfully!'
            });

            this.$refs.el.dropzone.options.url = process.env.APP_ROOT_API + 'landlord/image-upload/' + response.data.id;
            this.$refs.el.dropzone.processQueue();
            this.$router.push({name: 'users-landlords'});
          })
          .catch(error => {
            if (error.response.status == 422) {
              this.errors = error.response.data.errors
            }
            else {
              alert(error.response.message)
            }
          })
      },


      // selectImage() {
      //   this.$refs.fileInput.click()
      // },
      // pickFile() {
      //   this.form.image = event.target.files[0]
      //   let input = this.$refs.fileInput
      //   let file = input.files
      //   if (file && file[0]) {
      //     let reader = new FileReader
      //     reader.onload = e => {
      //       this.previewImage = e.target.result
      //     }
      //     reader.readAsDataURL(file[0])
      //     this.$emit('input', file[0])
      //   }
      // }
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
