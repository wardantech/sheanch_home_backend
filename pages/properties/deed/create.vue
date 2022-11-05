<template>
  <div>
    <!--Body Card-->
    <b-row>
      <b-col md="12">
        <div class="card mt-3">
          <div class="card-header">
            <h5 class="card-title m-0">Create lease</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="store">
              <b-row>

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Select Landlord">
                    <select  @change="getProperties(form.landlord_id)" v-model="form.landlord_id" id=""
                            class="form-control custom-select-form-control">
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
                    <select v-model="form.property_id" id=""
                            class="form-control custom-select-form-control">
                      <option value="">Select</option>
                      <option v-for="(property, i) in properties" :value="property.id" :key="i">
                        {{ property.name }}
                      </option>
                    </select>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.property_id">{{ errors.property_id[0] }}</strong>
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
                    <b-form-input v-model="form.password" type="text" placeholder="Password"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.password">{{ errors.password[0] }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Confirm Password">
                    <b-form-input v-model="form.password_confirmation" type="text"
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
    components: {

    },
    data() {
      return {

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
        let properties = await this.$axios.$post('lease/get-property-as-landlord', {landlordId: landlord_id});
        this.properties = properties.data;
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
