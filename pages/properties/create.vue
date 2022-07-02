<template>
  <div>
    <!--Body Card-->
    <b-row>
      <b-col md="8">
        <div class="card mt-3">
          <div class="card-header">
            <h5 class="card-title m-0">Create Property</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="store">
              <b-row>
                <b-col lg="6" md="6" sm="12">
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

                <b-col lg="6" md="6" sm="12">
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
              </b-row>

              <b-row>
                <b-col md="12">
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
                <b-col lg="6" md="6" sm="12">
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

                <b-col lg="6" md="6" sm="12">
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
              </b-row>

              <b-row>
                <b-col lg="6" md="6" sm="12">
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

                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Zip Code *">
                    <b-form-input v-model="form.zip_code" class="custom-form-control" type="text"
                                  placeholder="Zip Code"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.zip_code">{{
                      errors.zip_code[0]
                      }}</strong>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col lg="4" md="4" sm="12">
                  <b-form-group label="Bed Rooms (Qty)">
                    <b-form-input min="1" v-model="form.bed_rooms" class="custom-form-control" type="number"
                                  placeholder="Enter Quantity"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.bed_rooms">{{
                      errors.bed_rooms[0]
                      }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="4" md="4" sm="12">
                  <b-form-group label="Bath Rooms (Qty)">
                    <b-form-input min="1" v-model="form.bath_rooms" class="custom-form-control" type="number"
                                  placeholder="Enter Quantity"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.bath_rooms">{{
                      errors.bath_rooms[0]
                      }}</strong>
                  </b-form-group>
                </b-col>

                <b-col lg="4" md="4" sm="12">
                  <b-form-group label="Units">
                    <b-form-input min="1" v-model="form.units" class="custom-form-control" type="number"
                                  placeholder="Units"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.units">{{
                      errors.units[0]
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

              <b-row>
                <b-col md="12">
                  <b-form-group label="Image">
                    <dropzone id="foo" ref="el"
                              :options="options"
                              :destroyDropzone="false"
                    >
                    </dropzone>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-form-group>
                <b-button type="submit" variant="info">Save</b-button>
              </b-form-group>
            </form>
          </div>
        </div>
      </b-col>

      <b-col md="4">

        <div class="card mt-3">
          <div class="card-header">
            Utilities Paid By Landlord
          </div>
          <div class="card-body">
            <div class="form-check" v-for="(utilityCategory, i) in utilityCategories" :key="i">
              <span v-if="utilityCategory.utilities.length > 0">
                <b>{{utilityCategory.name}}</b>
                <div class="form-check ml-2" v-for="(utility, j) in utilityCategory.utilities" :key="j">
                <input class="form-check-input mt-2"
                       type="checkbox"
                       :value="utility.id"
                       v-model="form.utilities_paid_by_landlord"
                       :id="'utility-'+utility.id">
                <label class="form-check-label" :for="'utility-'+utility.id">
                  {{ utility.name }}
                </label>
              </div>
              </span>
            </div>
          </div>
        </div>

        <div class="card mt-3">
          <div class="card-header">
            Utilities Paid By Tenants
          </div>
          <div class="card-body">
            <div class="form-check" v-for="(utilityCategory, i) in utilityCategories" :key="i">
              <span v-if="utilityCategory.utilities.length > 0">
                <b>{{utilityCategory.name}}</b>
                <div class="form-check ml-2" v-for="(utility, j) in utilityCategory.utilities" :key="j">
                <input class="form-check-input mt-2"
                       type="checkbox"
                       :value="utility.id"
                       v-model="form.utilities_paid_by_tenant"
                       :id="'tenantUtility-'+utility.id">
                <label class="form-check-label" :for="'tenantUtility-'+utility.id">
                  {{ utility.name }}
                </label>
              </div>
              </span>
            </div>
          </div>
        </div>

        <div class="card mt-3">
          <div class="card-header">
            Facilities
          </div>
          <div class="card-body">
            <div class="form-check" v-for="(facilityCategory, i) in facilitiesCategories" :key="i">
              <span v-if="facilityCategory.facilities.length > 0">
                <b>{{facilityCategory.name}}</b>
                <div class="form-check ml-2" v-for="(facility, j) in facilityCategory.facilities" :key="j">
                <input class="form-check-input mt-2"
                       type="checkbox"
                       :value="facility.id"
                       v-model="form.facilities"
                       :id="'facilityUtility-'+facility.id">
                <label class="form-check-label" :for="'facilityUtility-'+facility.id">
                  {{ facility.name }}
                </label>
              </div>
              </span>
            </div>
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
          image: '',
          facilities: [],
          utilities_paid_by_tenant: [],
          utilities_paid_by_landlord: []
        },
        propertyTypes: '',
        previewImage: null,
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

      const divisions = await this.$axios.$get('settings/divisions');
      this.divisions = divisions.data;

      const landlords = await this.$axios.$get('landlord/get-landlords');
      this.landlords = landlords.data;

      const utilityCategories = await this.$axios.$get('settings/utility/get-utilities');
      this.utilityCategories = utilityCategories.data;

      const facilitiesCategories = await this.$axios.$get('settings/facility/get-facilities');
      this.facilitiesCategories = facilitiesCategories.data;

      const propertyTypes = await this.$axios.$get('property/get-property-type');
      this.propertyTypes = propertyTypes.data;
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

        await this.$axios.$post('property/store', this.form)
          .then(response => {
            // this.$izitoast.success({
            //   title: 'Success !!',
            //   message: 'Property create successfully!'
            // });

            this.$refs.el.dropzone.options.url = process.env.APP_ROOT_API + 'landlord/image-upload/' + response.data.id;
            this.$refs.el.dropzone.processQueue();
            this.$router.push({name: 'properties'});
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
