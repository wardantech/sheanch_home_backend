<template>
  <div>
    <!--Body Card-->
    <form @submit.prevent="store">
      <b-row>
        <b-col md="12">
          <div class="card mt-3">
            <div class="card-header">
              <h5 class="card-title m-0">Edit Property</h5>
            </div>
            <div class="card-body">
              <b-row>
                <b-col lg="4" md="6" sm="12">
                  <b-form-group label="Select Landlord *">
                    <select v-model="form.landlord_id"
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

                <b-col lg="4" md="6" sm="12">
                  <b-form-group label="Property Types *">
                    <select v-model="form.property_type_id"
                            class="form-control custom-select-form-control">
                      <option value="">Select</option>
                      <option v-for="(type, i) in propertyTypes" :key="i" :value="type.id">
                        {{ type.name }}
                      </option>
                    </select>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.property_type_id">{{ errors.property_type_id[0] }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="4" md="6" sm="12">
                  <b-form-group label="Property Name *">
                    <b-form-input v-model="form.name" class="custom-form-control" type="text"
                                  placeholder="Name"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.name">{{
                      errors.name[0]
                      }}</strong>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col lg="4" md="6" sm="12">
                  <b-form-group label="Division *">
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

                <b-col lg="4" md="6" sm="12">
                  <b-form-group label="District *">
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

                <b-col lg="4" md="6" sm="12">
                  <b-form-group label="Thana *">
                    <select v-model="form.thana_id" class="form-control custom-select-form-control">
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
                <b-col lg="4" md="6" sm="12">
                  <b-form-group label="Zip Code *">
                    <b-form-input v-model="form.zip_code" class="custom-form-control" type="text"
                                  placeholder="Zip Code"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.zip_code">{{
                      errors.zip_code[0]
                      }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="4" md="6" sm="12">
                  <b-form-group label="Bed Rooms (Qty)">
                    <b-form-input min="1" v-model="form.bed_rooms" class="custom-form-control" type="number"
                                  placeholder="Enter Quantity"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.bed_rooms">{{
                      errors.bed_rooms[0]
                      }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="4" md="6" sm="12">
                  <b-form-group label="Bath Rooms (Qty)">
                    <b-form-input min="1" v-model="form.bath_rooms" class="custom-form-control" type="number"
                                  placeholder="Enter Quantity"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.bath_rooms">{{
                      errors.bath_rooms[0]
                      }}</strong>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <!--<b-col lg="4" md="4" sm="12">-->
                <!--<b-form-group label="Units">-->
                <!--<b-form-input min="1" v-model="form.units" class="custom-form-control" type="number"-->
                <!--placeholder="Units"></b-form-input>-->
                <!--<strong class="text-danger" style="font-size: 12px" v-if="errors.units">{{-->
                <!--errors.units[0]-->
                <!--}}</strong>-->
                <!--</b-form-group>-->
                <!--</b-col>-->

                <b-col lg="4" md="6" sm="12">
                  <b-form-group label="House Number">
                    <b-form-input min="1" v-model="form.house_no" class="custom-form-control" type="text"
                                  placeholder="House Number"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.house_no">{{
                      errors.house_no[0]
                      }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="4" md="6" sm="12">
                  <b-form-group label="Sale Type">
                    <select v-model="form.sale_type"
                            class="form-control custom-select-form-control">
                      <option value="">Select</option>
                      <option value="1">For Rent</option>
                      <option value="2">For Sale</option>
                    </select>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.sale_type">{{ errors.sale_type[0] }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="4" md="6" sm="12">
                  <b-form-group label="Lease Type">
                    <select v-model="form.lease_type"
                            class="form-control custom-select-form-control">
                      <option value="">Select</option>
                      <option value="1">Commercial</option>
                      <option value="2">Residential</option>
                    </select>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.lease_type">{{ errors.lease_type[0] }}</strong>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Rent Amount *">
                    <b-form-input min="0" v-model="form.rent_amount" class="custom-form-control" type="number"
                                  placeholder="Rent Amount"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.rent_amount">{{
                      errors.rent_amount[0]
                      }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Security Money">
                    <b-form-input v-model="form.security_money" class="custom-form-control" type="number"
                                  placeholder="Rent Amount"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.security_money">{{
                      errors.security_money[0]
                      }}</strong>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Area Size">
                    <b-form-input min="1" v-model="form.area_size" class="custom-form-control" type="number"
                                  placeholder="Area Size"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.area_size">{{
                      errors.area_size[0]
                      }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Status">
                    <select v-model="form.status"
                            class="form-control custom-select-form-control">
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
                <b-col md="12">
                  <b-form-group label="Address *">
                    <b-form-textarea
                      id="address"
                      placeholder="Address..."
                      rows="3"
                      v-model="form.address"
                      class="custom-form-control"
                    ></b-form-textarea>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.address">{{ errors.address[0] }}</strong>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col md="12">
                  <b-form-group label="Description">
                    <b-form-textarea
                      id="description"
                      placeholder="Description..."
                      rows="3"
                      v-model="form.description"
                      class="custom-form-control"
                    ></b-form-textarea>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.description">{{ errors.description[0] }}</strong>
                  </b-form-group>
                </b-col>
              </b-row>
            </div>
          </div>
        </b-col>

        <!-- Add Utility -->

        <b-col md="12">
          <div class="card mt-3">
            <div class="card-header">
              Image Upload
            </div>
            <div class="card-body">
              <b-form-group label="Image">
                <dropzone id="foo" ref="el"
                          :options="options"
                          @vdropzone-files-added="processFile"
                          @vdropzone-removed-file="fileRemoved"
                          :destroyDropzone="false"
                >
                </dropzone>
              </b-form-group>

              <b-form-group>
                <b-button type="submit" variant="info">Update</b-button>
              </b-form-group>
            </div>
          </div>
        </b-col>
      </b-row>
    </form>
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
    data() {
      return {
        options: {
          url: "url",
          addRemoveLinks: true,
          headers: {"Authorization": this.$auth.strategy.token.get()},
          // maxFiles: 1,
          autoProcessQueue: false,
          acceptedFiles: ".jpeg,.jpg,.png",
          parallelUploads: 20,
          maxFilesize: 2,
          maxFiles: 20, // Test
        },

        form: {
          name: '',
          thana_id: '',
          district_id: '',
          division_id: '',
          property_type_id: '',
          bed_rooms: '',
          bath_rooms: '',
          address: '',
          area_size: '',
          rent_amount: '',
          security_money: '',
          status: '',
          description: '',
          landlord_id: '',
          images: [],
          oldImages: [],
          lease_type: '',
          sale_type: '',
          house_no: '',
          facilities: [],
          utilities_paid_by_tenant: [],
          utilities_paid_by_landlord: []
        },

        propertyTypes: '',
        landlords: '',
        utilityCategories: '',
        facilitiesCategories: '',
        divisions: '',
        districts: '',
        thanas: '',
        errors: {},
      }
    },


    async created() {

      const data = await this.$axios.$post('property/get-edit-data',
        {id: this.$route.params.id}
      );

      this.divisions = data.data.divisions;
      this.districts = data.data.districts;
      this.thanas = data.data.thanas;
      this.landlords = data.data.landlords;
      this.propertyTypes = data.data.propertyTypes;
      this.utilityCategories = data.data.utilityCategories;
      this.facilitiesCategories = data.data.facilitiesCategories;

      this.form = data.data.property;
      let images = data.data.propertyImages
      this.form.oldImages = [];

      for (let i = 0; i < images.length; i++) {

        var file = {
          size: images[i].size,
          name: images[i].name,
          url: images[i].url,
          data: images[i].data,
        };

        this.$refs.el.manuallyAddFile(file, images[i].url);

        this.form.oldImages.push(file)
      }

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

      processFile(file) {

        console.log(file)
        this.form.images = [];
        let image = Array.from(file)
        image.forEach(element => {
          const reader = new FileReader()
          reader.readAsDataURL(element)

          reader.onload = event => {
            const fileObj = {}
            fileObj.name = element.name
            fileObj.description = ''
            fileObj.data = event.target.result
            fileObj.size = (element.size / (1024 * 1024)).toFixed(2)
            fileObj.type = element.type

            this.form.images.push(fileObj)

            console.log(this.form.images)
          }
        })

      },

      fileRemoved(file) {
        if (file.hasOwnProperty('manuallyAdded')) {
          this.form.oldImages = this.form.oldImages.filter(element => element.url !== file.url)
        } else {
          if (file.dataURL) {
            this.form.images = this.form.images.filter(element => element.data !== file.dataURL)
          } else {
            this.form.images = this.form.images.filter(element => element.name !== file.name)
          }
        }
      },

      async store() {

        await this.$axios.$post('property/update/' + this.$route.params.id, this.form)
          .then(response => {
            this.$izitoast.success({
              title: 'Success !!',
              message: 'Property updated successfully!'
            });

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

<style scoped lang="scss">

</style>
