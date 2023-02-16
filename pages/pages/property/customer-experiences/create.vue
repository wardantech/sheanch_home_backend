<template>
  <div>
    <!--Body Card-->
    <b-row>
      <b-col md="12">
        <div class="card mt-3">
          <div class="card-header">
            <h5 class="card-title m-0">Create Property Customer Experiences</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="store">
              <b-row>
                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Video Link">
                    <b-form-input class="custom-form-control" v-model="form.video_link" type="text"
                      placeholder="Video Link"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.video_link">{{
                      errors.video_link[0]
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
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.status">{{ errors.status[0]
                    }}</strong>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-form-group>
                <b-button size="sm" type="submit" variant="dark" :disabled="isDisable">Save</b-button>
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
  data() {
    return {
      form: {
        video_link: '',
        status: '',
      },
      isDisable: false,
      errors: {}
    }
  },
  methods: {
    async store() {
      this.isDisable = true;
      await this.$axios.$post('pages/property/customer-experiences/store', this.form)
        .then(response => {
          this.$izitoast.success({
            title: 'Success !!',
            message: 'Customer experiences create successfully!'
          });
          this.$router.push({ name: 'pages-property-customer-experiences' });
        }).catch(error => {
          this.isDisable = false;
          if (error.response.status == 422) {
            this.errors = error.response.data.errors
          }
          else {
            alert(error.response.message)
          }
        })
    },
  }
}
</script>
