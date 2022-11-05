<template>
  <div>
    <!--Body Card-->
    <b-row>
      <b-col md="8">
        <div class="card mt-3">
          <div class="card-header">
            <h5 class="card-title m-0">Edit Landlord</h5>
          </div>
          <div class="card-body">
            <b-form @submit.prevent="update">
              <b-row>
                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Name">
                    <b-form-input v-model="form.name" type="text" placeholder="Name"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.name">{{
                      errors.name[0]
                      }}</strong>
                  </b-form-group>
                </b-col>
                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Mobile">
                    <b-form-input type="text" v-model="form.mobile" placeholder="Mobile"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.mobile">{{ errors.mobile[0] }}</strong>
                  </b-form-group>
                </b-col>

              </b-row>

              <b-row>
                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="NID">
                    <b-form-input type="text" v-model="form.nid" placeholder="National ID"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.nid">{{
                      errors.nid[0]
                      }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Email">
                    <b-form-input v-model="form.email" type="email" placeholder="Email"></b-form-input>
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

            </b-form>
          </div>
        </div>
      </b-col>
      <b-col md="4">
        <b-card class="mt-3" header="Image">
          <td>
            <img style="height: 200px; width: 300px; object-fit: cover;" v-model="form.oldImage" :src="imageUrl+form.image" alt="">
          </td>
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
  name: "edit",
  components: {
    Dropzone
  },
  computed:{
    imageUrl(){
      return `${process.env.APP_ROOT_IMG_URL}/`
    }
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
        oldImage:'',
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

    await this.$axios.$get('landlord/show/'+this.$route.params.id)
      .then(response=>{
        this.form = response.data;
        this.form.oldImage = response.data.image;
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

      await this.$axios.$post('landlord/update/'+this.$route.params.id, this.form, )
        .then(response => {

          this.$izitoast.success({
            title: 'Success !!',
            message: 'Landlord create successfully!'
          })
          this.$refs.el.dropzone.options.url = process.env.APP_ROOT_API+'landlord/image-upload/'+response.data.id;
          this.$refs.el.dropzone.processQueue();
          this.$router.push({name: 'users-landlords'});
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
