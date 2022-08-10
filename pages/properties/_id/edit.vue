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
                  <b-form-group label="Property Category *">
                    <select v-model="form.property_category"
                            class="form-control custom-select-form-control">
                      <option value="">Select</option>
                      <option value="1">Commercial</option>
                      <option value="2">Residential</option>
                    </select>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.property_category">{{ errors.property_category[0] }}</strong>
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
                  <b-form-group label="Sale/Lease Type">
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
                  <b-form-group label="Property Name *">
                    <b-form-input v-model="form.name" class="custom-form-control" type="text"
                                  placeholder="Name"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.name">{{
                        errors.name[0]
                      }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="4" md="6" sm="12">
                  <b-form-group label="Status *">
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
                <b-col lg="4" md="6" sm="12">
                  <b-form-group label="Area Size">
                    <b-form-input min="1" v-model="form.area_size" class="custom-form-control" type="number"
                                  placeholder="Area Size"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.area_size">{{
                        errors.area_size[0]
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
                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Balcony">
                    <b-form-input min="0" v-model="form.balcony" class="custom-form-control" type="number"
                                  placeholder="Enter Quantity"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.balcony">{{
                        errors.balcony[0]
                      }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Floor">
                    <b-form-input v-model="form.floor" class="custom-form-control" type="number"
                                  placeholder="Enter Floor"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.floor">{{
                        errors.floor[0]
                      }}</strong>
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
                <!--<b-col lg="4" md="4" sm="12">-->
                <!--<b-form-group label="Units">-->
                <!--<b-form-input min="1" v-model="form.units" class="custom-form-control" type="number"-->
                <!--placeholder="Units"></b-form-input>-->
                <!--<strong class="text-danger" style="font-size: 12px" v-if="errors.units">{{-->
                <!--errors.units[0]-->
                <!--}}</strong>-->
                <!--</b-form-group>-->
                <!--</b-col>-->

                <b-col md="6">
                  <b-form-group label="Zip Code *">
                    <b-form-input v-model="form.zip_code" class="custom-form-control" type="text"
                                  placeholder="Zip Code"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.zip_code">{{
                        errors.zip_code[0]
                      }}</strong>
                  </b-form-group>
                </b-col>

                <b-col md="6">
                  <b-form-group label="House/Holding Number">
                    <b-form-input min="1" v-model="form.house_no" class="custom-form-control" type="text"
                                  placeholder="House Number"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.house_no">{{
                        errors.house_no[0]
                      }}</strong>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col md="12">
                  <b-form-group label="Video Link">
                    <b-form-input min="1" v-model="form.video_link" class="custom-form-control" type="text"
                                  placeholder="Enter video link"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.video_link">{{
                      errors.video_link[0]
                      }}</strong>
                  </b-form-group>
                </b-col>

                <b-col md="12">
                  <b-form-group label="Google map location">
                    <b-form-input min="1" v-model="form.google_map_location" class="custom-form-control" type="text"
                                  placeholder="Enter Google map location"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.google_map_location">{{
                        errors.google_map_location[0]
                      }}</strong>
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
              Utilities
            </div>
            <div class="card-body">
              <b-row>
                <b-col md="4">
                  <b-form-group label="Utilities">
                    <select v-model="utility" class="form-control custom-select-form-control" name="" id="">
                      <option value="">select</option>
                      <option v-for="(utility, n) in utilities" :value="utility">
                        {{ utility.name }}
                      </option>
                    </select>
                  </b-form-group>
                </b-col>
                <b-col md="4">
                  <div class="button-t-m" style="margin-top: 30px">
                    <b-button variant="success" @click="addUtilityRow(utility)">Add utility</b-button>
                  </div>
                </b-col>
              </b-row>
              <b-row class="align-items-center" v-for="(utility, n) in form.utilities" :key="utility">
                <b-col md="4">
                  <b-form-group label="Utility Name">
                    <b-form-input
                      readonly
                      v-model="utility.utility_name"
                      :id="'utility_name'+n"
                      min="1" class="custom-form-control" type="text"
                      placeholder="Utility Name">
                    </b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.security_money">{{
                        errors.security_money[0]
                      }}</strong>
                  </b-form-group>
                </b-col>

                <b-col md="4">
                  <b-form-group label="Paid By">
                    <select @click="utilityPaidBy(n, utility)" name="" :id="'utility_paid_by'+n"
                            class="form-control custom-select-form-control">
                      <option :selected="utility.utility_paid_by == 1" value="1">Landlord</option>
                      <option :selected="utility.utility_paid_by == 2" value="2">Tenant</option>
                    </select>

                  </b-form-group>
                </b-col>

                <b-col md="3">
                  <b-form-group label="Amount">
                    <b-form-input @input="utilityAmount(n, utility)"
                                  :id="'utility_amount'+n"
                                  v-model="utility.utility_amount"
                                  min="1" class="custom-form-control" type="text"
                                  placeholder="Amount"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.area_size">{{
                        errors.area_size[0]
                      }}</strong>
                  </b-form-group>
                </b-col>

                <b-col md="1" @click="deleteUtilityRow(n, utility)">
                  <div class="button-t-m">
                    <b-button variant="danger">-</b-button>
                  </div>
                </b-col>
              </b-row>
            </div>
          </div>
        </b-col>

        <b-col md="12">
          <div class="card mt-3">
            <div class="card-header">
              Facility
            </div>
            <div class="card-body">
              <b-row>
                <b-col md="4">
                  <b-form-group label="Facilities">
                    <select v-model="facility" class="form-control custom-select-form-control" name="" id="">
                      <option value="">select</option>
                      <option v-for="(facility, f) in facilities" :value="facility">
                        {{ facility.name }}
                      </option>
                    </select>
                  </b-form-group>
                </b-col>
                <b-col md="4">
                  <div class="button-t-m" style="margin-top: 30px">
                    <b-button variant="success" @click="addFacilityRow(facility)">Add facility</b-button>
                  </div>
                </b-col>
              </b-row>
              <b-row class="align-items-center" v-for="(facility, n) in form.facilities" :key="utility">
                <b-col md="4">
                  <b-form-group label="Facility name">
                    <b-form-input
                      readonly
                      v-model="facility.facility_name"
                      :id="'facility_name'+n"
                      min="1" class="custom-form-control" type="text"
                      placeholder="Facility name">
                    </b-form-input>

                  </b-form-group>
                </b-col>

                <b-col md="3">
                  <b-form-group label="Amount">
                    <b-form-input @input="facilityAmount(n, facility)"
                                  v-model="facility.facility_amount"
                                  :id="'facility_amount'+n"
                                  min="1" class="custom-form-control" type="text"
                                  placeholder="Amount"></b-form-input>
                  </b-form-group>
                </b-col>

                <b-col md="1" @click="deleteFacilityRow(n, facility)">
                  <div class="button-t-m">
                    <b-button variant="danger">-</b-button>
                  </div>
                </b-col>
              </b-row>

            </div>
          </div>
        </b-col>

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
        status: '',
        name: '',
        landlord_id: '',
        property_category: '',
        property_type_id: '',
        sale_type: '',
        area_size: '',
        bed_rooms: '',
        bath_rooms: '',
        balcony: '',
        floor: '',
        video_link: '',
        rent_amount: '',
        security_money: '',
        house_no: '',
        zip_code:'',
        thana_id: '',
        district_id: '',
        division_id: '',
        address: '',
        google_map_location:'',
        description: '',
        facilities: [],
        utilities: [],
        images: [],
        oldImages: [],
      },

      propertyTypes: '',
      landlords: '',
      utilities: '',
      utility: '',
      facility: '',
      facilities: '',
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
    this.utilities = data.data.utilities;
    this.facilities = data.data.facilities;

    this.form = data.data.property;
    this.form.utilities = JSON.parse(data.data.property.utilities);
    this.form.facilities = JSON.parse(data.data.property.facilities);
    let images = data.data.propertyImages
    this.form.oldImages = [];

    if (images.length > 0) {
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

    addUtilityRow(data) {
      if(data){
        let dataCheck = this.form.utilities.find(element => element.utility_id == data.id)
        if(!dataCheck){
          this.form.utilities.push({
            'utility_id': data.id,
            'utility_name': data.name,
            'utility_paid_by': '',
            'utility_amount': '',
          })
        }
        else{
          this.$izitoast.warning({
            title: 'Warning !!',
            message: data.name + ' Already added!'
          });
        }

      }
      else {
        this.$izitoast.error({
          title: 'Warning !!',
          message: 'Please select utility first!'
        });
      }
    },
    deleteUtilityRow(index, utility) {
      let idx = this.form.utilities.indexOf(utility);
      if (idx > -1) {
        this.form.utilities.splice(idx, 1);
      }
    },

    utilityPaidBy(n, utility) {
      let paid_by = document.getElementById('utility_paid_by' + n).value
      this.form.utilities[n].utility_paid_by = paid_by;
    },

    utilityAmount(n, utility) {
      let amount = document.getElementById('utility_amount' + n).value
      this.form.utilities[n].utility_amount = amount;
    },

    addFacilityRow(data) {
      if(data){
        let dataCheck = this.form.facilities.find(element => element.facility_id == data.id)
        if(!dataCheck){
          this.form.facilities.push({
            'facility_id': data.id,
            'facility_name': data.name,
            'facility_amount': '',
          })
        }
        else{
          this.$izitoast.warning({
            title: 'Warning !!',
            message: data.name + ' Already added!'
          });
        }

      }
      else{
        this.$izitoast.error({
          title: 'Warning !!',
          message: 'Please select facility first!'
        });
      }
    },

    deleteFacilityRow(index, facility) {
      let idx = this.form.facilities.indexOf(facility);
      if (idx > -1) {
        this.form.facilities.splice(idx, 1);
      }
    },

    facilityAmount(n, facility) {
      let amount = document.getElementById('facility_amount' + n).value
      this.form.facilities[n].facility_amount = amount;
    },

    async store() {
      await this.$axios.$post('property/update/' + this.$route.params.id, this.form)
        .then(response => {
          this.$izitoast.success({
            title: 'Success !!',
            message: 'Property updated successfully!'
          });

          this.$router.push({name: 'properties'});

        })
        .catch(error => {

          if (error.response.status == 422) {
            this.errors = error.response.data.errors
          } else {
            alert(error.response.message)
          }
        })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
