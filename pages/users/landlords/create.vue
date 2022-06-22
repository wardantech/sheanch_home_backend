<template>
  <div>
    <!--Body Card-->
    <b-row>
      <b-col>
        <b-card header="Create Landlord">
          <b-form @submit.prevent="store">
            <b-row>
              <b-col lg="4" md="4" sm="12">
                <b-form-group label="First name">
                  <b-form-input v-model="form.name" type="text" placeholder="First name" ></b-form-input>
                  <strong class="text-danger" style="font-size: 12px" v-if="errors.name" >{{errors.name[0]}}</strong>
                </b-form-group>
              </b-col>
              <b-col lg="4" md="4" sm="12">
                <b-form-group label="Mobile">
                  <b-form-input type="text" v-model="form.mobile" placeholder="Mobile" ></b-form-input>
                  <strong class="text-danger" style="font-size: 12px" v-if="errors.mobile" >{{errors.mobile[0]}}</strong>
                </b-form-group>
              </b-col>
              <b-col lg="4" md="4" sm="12">
                <b-form-group label="NID">
                  <b-form-input type="text" v-model="form.nid" placeholder="National ID" ></b-form-input>
                  <strong class="text-danger" style="font-size: 12px" v-if="errors.nid" >{{errors.nid[0]}}</strong>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col lg="4" md="4" sm="12">
                <b-form-group label="Division">
                  <select @change="getDistricts(form.division_id)" v-model="form.division_id" id="" class="form-control">
                    <option value="">Select</option>
                    <option v-for="(division, i) in divisions" :value="division.id" :key="i">
                      {{division.name}}
                    </option>
                  </select>
                  <strong class="text-danger" style="font-size: 12px" v-if="errors.division_id" >{{errors.division_id[0]}}</strong>
               </b-form-group>
              </b-col>
              <b-col lg="4" md="4" sm="12">
                <b-form-group label="District">
                  <select @change="getThanas(form.district_id)" v-model="form.district_id" id="" class="form-control">
                    <option value="">Select</option>
                    <option v-for="(district, i) in districts" :value="district.id" :key="i">
                      {{district.name}}
                    </option>
                  </select>
                  <strong class="text-danger" style="font-size: 12px" v-if="errors.district_id" >{{errors.district_id[0]}}</strong>
                </b-form-group>
              </b-col>
              <b-col lg="4" md="4" sm="12">
                <b-form-group label="Thana">
                  <select v-model="form.thana_id" id="" class="form-control">
                    <option value="">Select</option>
                    <option v-for="(thana, i) in thanas" :value="thana.id" :key="i">
                      {{thana.name}}
                    </option>
                  </select>
                  <strong class="text-danger" style="font-size: 12px" v-if="errors.thana_id" >{{errors.thana_id[0]}}</strong>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col lg="4" md="4" sm="12">
                <b-form-group label="Email">
                  <b-form-input v-model="form.email" type="email" placeholder="Email" ></b-form-input>
                  <strong class="text-danger" style="font-size: 12px" v-if="errors.email" >{{errors.email[0]}}</strong>
                </b-form-group>
              </b-col>

              <b-col lg="4" md="4" sm="12">
                <b-form-group label="Password">
                  <b-form-input v-model="form.password" type="text" placeholder="Password" ></b-form-input>
                  <strong class="text-danger" style="font-size: 12px" v-if="errors.password" >{{errors.password[0]}}</strong>
                </b-form-group>
              </b-col>

              <b-col lg="4" md="4" sm="12">
                <b-form-group label="Confirm Password">
                  <b-form-input v-model="form.password_confirmation" type="text" placeholder="Password" ></b-form-input>
                  <strong class="text-danger" style="font-size: 12px" v-if="errors.password_confirmation" >{{errors.password_confirmation[0]}}</strong>
                </b-form-group>
              </b-col>
            </b-row>

            <b-form-group label="Postal Address">
              <b-form-textarea
                id="postal"
                placeholder="Postal Address..."
                rows="3"
                v-model="form.postal_address"
              ></b-form-textarea>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.postal_address" >{{errors.postal_address[0]}}</strong>
            </b-form-group>

            <b-form-group label="Residential Address">
              <b-form-textarea
                id="residential"
                placeholder="Residential Address..."
                rows="3"
                v-model="form.residential_address"
              ></b-form-textarea>
              <strong class="text-danger" style="font-size: 12px" v-if="errors.residential_address" >{{errors.residential_address[0]}}</strong>
            </b-form-group>

            <b-form-group>
                <b-button type="submit" variant="dark">Save</b-button>
            </b-form-group>

          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    name: "create",

    data() {
      return {
        form:{
          name:'',
          mobile:'',
          nid:'',
          thana_id:'',
          district_id:'',
          division_id:'',
          postal_address:'',
          residential_address:'',
          email:'',
          password:'',
          password_confirmation:'',
        },
        landlord:'',
        divisions: '',
        districts: '',
        thanas: '',
        errors:{}
      }
    },
    async created() {
      let divisions = await this.$axios.$get('settings/divisions')
      this.divisions = divisions.data
    },

    methods:{
      async getDistricts(division_id){
        this.thanas = '';
        let district = await this.$axios.$post('settings/districts',{divisionId: division_id});
        this.districts = district.data;
      },

      async getThanas(district_id){
        let thanas = await this.$axios.$post('settings/thanas',{districtId: district_id});
        this.thanas = thanas.data;
      },

      async store(){
        await this.$axios.$post('landlord',this.form)
          .then(response=>{
            this.$toast.success('Landlord create successfully!');
            this.errors = ''
            this.$router.push({name: 'users-landlords'});
          })
          .catch(error=>this.errors = error.response.data.errors)
      }
    }
  }
</script>

<style scoped>

</style>
