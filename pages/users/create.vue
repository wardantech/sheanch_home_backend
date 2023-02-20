<template>
  <div>
    <b-row>
      <b-col md="8">
        <div class="card mt-3">
          <div class="card-header">
            <h5 class="card-title m-0">Create user</h5>
          </div>
          <div class="card-body">
            <b-form @submit.prevent="store">
              <b-row>
                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Name">
                    <b-form-input v-model="form.name" type="text" class="custom-form-control"
                      placeholder="Name"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.name">{{
                      errors.name[0]
                    }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Mobile">
                    <b-form-input v-model="form.mobile" type="text" class="custom-form-control"
                      placeholder="Mobile"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.mobile">{{
                      errors.mobile[0]
                    }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="NID">
                    <b-form-input v-model="form.nid" type="text" class="custom-form-control"
                      placeholder="National Id"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.nid">{{
                      errors.nid[0]
                    }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Email">
                    <b-form-input v-model="form.email" type="email" class="custom-form-control"
                      placeholder="Email"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.email">{{
                      errors.email[0]
                    }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Division">
                    <select @change="getDistricts" v-model="form.division_id" id=""
                      class="form-control custom-select-form-control">
                      <option value="">Select</option>
                      <option v-for="(division, i) in divisions" :value="division.id" :key="i">
                        {{ division.name }}
                      </option>
                    </select>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.division_id">{{
                      errors.division_id[0]
                    }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="District">
                    <select @change="getThanas" v-model="form.district_id" id=""
                      class="form-control custom-select-form-control">
                      <option value="">Select</option>
                      <option v-for="(district, i) in districts" :value="district.id" :key="i">
                        {{ district.name }}
                      </option>
                    </select>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.district_id">{{
                      errors.district_id[0]
                    }}</strong>
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
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.thana_id">{{
                      errors.thana_id[0]
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
                  <b-form-group label="Password">
                    <b-form-input v-model="form.password" type="password" class="custom-form-control"
                      placeholder="Password"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.password">{{
                      errors.password[0]
                    }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Confirm Password">
                    <b-form-input v-model="form.password_confirmation" class="custom-form-control" type="password"
                      placeholder="Password"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.password_confirmation">{{
                      errors.password_confirmation[0]
                    }}</strong>
                  </b-form-group>
                </b-col>

                <b-col md="12">
                  <b-form-group label="Postal Address">
                    <b-form-textarea class="custom-form-control" id="postal" placeholder="Postal Address..." rows="3"
                      v-model="form.postal_address"></b-form-textarea>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.postal_address">{{
                      errors.postal_address[0]
                    }}</strong>
                  </b-form-group>
                </b-col>

                <b-col md="12">
                  <b-form-group label="Residential Address">
                    <b-form-textarea class="custom-form-control" id="postal" placeholder="Residential Address..."
                      rows="3" v-model="form.residential_address"></b-form-textarea>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.residential_address">{{
                      errors.residential_address[0]
                    }}</strong>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col>
                  <b-form-group>
                    <b-button type="submit" variant="success" :disabled="loading" size="sm">Save</b-button>
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
            <Dropzone id="foo" ref="el" :options="options" :destroyDropzone="false">
            </Dropzone>
          </b-form-group>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Dropzone from 'nuxt-dropzone';
import 'nuxt-dropzone/dropzone.css';

export default {
  name: 'user-create',
  components: { Dropzone },
  data() {
    return {
      options: {
        url: "url",
        addRemoveLinks: true,
        headers: { "Authorization": this.$auth.strategy.token.get() },
        maxFiles: 1,
        autoProcessQueue: false,
        acceptedFiles: ".jpeg,.jpg,.png"
      },
      form: {
        name: '',
        mobile: '',
        nid: '',
        email: '',
        division_id: '',
        district_id: '',
        thana_id: '',
        status: '',
        password: '123456',
        password_confirmation: '123456',
        postal_address: '',
        residential_address: ''
      },
      loading: false,
      previewImage: null,
      divisions: '',
      districts: '',
      thanas: '',
      errors: {}
    }
  },
  async created() {
    await this.$axios.$post('users/create')
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
      this.loading = true;
      await this.$axios.$post('users/store', this.form)
        .then(response => {
          this.loading = false;
          this.$refs.el.dropzone.options.url = process.env.APP_ROOT_API + 'users/image/' + response.user.id;
          this.$refs.el.dropzone.processQueue();

          this.$izitoast.success({
            title: 'Success !!',
            message: 'User create successfully!'
          })
          this.$router.push({ name: 'users' });
        }).catch(error => {
          this.loading = false;
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

<style>

</style>
