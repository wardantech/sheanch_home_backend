<template>
  <div>
    <!--Body Card-->
    <div v-if="isloading" class="text-center">
      <p style="font-size: 20px;">Loading...</p>
    </div>
    <b-row v-else>
      <b-col md="12">
        <div class="card mt-3">
          <div class="card-header">
            <h5 class="card-title m-0">Edit Property Customer Experiences</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="update">
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
                <b-button size="sm" type="submit" variant="dark" :disabled="isDisable">Update</b-button>
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
  name: "customer-experiences-edit",
  data() {
    return {
      isLoading: true,
      isDisable: false,
      form: {
        video_link: '',
        status: ''
      },
      errors: {}
    }
  },
  async created() {
    await this.$axios.$get('pages/property/customer-experiences/edit/' + this.$route.params.id)
      .then(response => {
        this.form = response.data;
        this.isLoading = false;
      }).catch(error => {
        alert(error);
      });
  },
  methods: {
    async update() {
      this.isDisable = true;
      await this.$axios.$post('pages/property/customer-experiences/update/' + this.$route.params.id, this.form,)
        .then(response => {
          this.$izitoast.success({
            title: 'Success !!',
            message: 'Customer Experiences updated successfully!'
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
        });
    },
  }
}
</script>
