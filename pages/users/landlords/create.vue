<template>
  <div>
    <!--Body Card-->
    <b-row class="mt-2">
      <b-col>
        <b-card class="mt-3" header="Create Landlord">
          <b-form>
            <b-row>
              <b-col lg="4" md="4" sm="12">
                <b-form-group label="First name">
                  <b-form-input type="text" placeholder="First name" required></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="4" md="4" sm="12">
                <b-form-group label="Last name">
                  <b-form-input type="text" placeholder="Last name" required></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="4" md="4" sm="12">
                <b-form-group label="NID">
                  <b-form-input type="text" placeholder="National ID" required></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col lg="4" md="4" sm="12">
                <b-form-group label="Division">
                  <b-form-select v-model="selected1" :options="divisions"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="4" md="4" sm="12">
                <b-form-group label="District">
                  <b-form-select v-model="selected2" :options="districts"></b-form-select>
                </b-form-group>
              </b-col>
              <b-col lg="4" md="4" sm="12">
                <b-form-group label="Thana">
                  <b-form-select v-model="selected3" :options="thanas"></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>

            <b-form-group label="Postal Address">
              <b-form-textarea
                id="postal"
                placeholder="Postal Address..."
                rows="3"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group label="Residential Address">
              <b-form-textarea
                id="residential"
                placeholder="Residential Address..."
                rows="3"
              ></b-form-textarea>
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
        selected1: null,
        selected2: null,
        selected3: null,
        divisions: [
          { value: null, text: 'Please select an option' },
          { value: 'dhaka', text: 'Dhaka' },
          { value: 'rajshahi', text: 'Rajshahi' },
          { value: 'rangpur', text: 'Rangpur' },
          { value: 'bogura', text: 'Bogura'}
        ],
        districts: [
          { value: null, text: 'Please select an option' },
          { value: 'dhaka', text: 'Dhaka' },
          { value: 'rajshahi', text: 'Rajshahi' },
          { value: 'rangpur', text: 'Rangpur' },
          { value: 'bogura', text: 'Bogura'}
        ],
        thanas: [
          { value: null, text: 'Please select an option' },
          { value: 'savar', text: 'Savar' },
          { value: 'bagha', text: 'Bagha' },
          { value: 'kushtia', text: 'Kustiya' },
          { value: 'bagmara', text: 'Bagmara'}
        ]
      }
    }
  }
</script>

<style scoped>

</style>
