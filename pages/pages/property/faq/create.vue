<template>
  <div>
    <!--Body Card-->
    <b-row>
      <b-col md="12">
        <div class="card mt-3">
          <div class="card-header">
            <h5 class="card-title m-0">Create Faq</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="store">
              <b-row>
                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Name">
                    <b-form-input class="custom-form-control" v-model="form.title" type="text" placeholder="Name"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.name">{{
                      errors.name[0]
                      }}</strong>
                  </b-form-group>
                </b-col>
                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Status">
                    <select v-model="form.status" id="" class="form-control custom-form-control">
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
                      id="residential"
                      class="custom-form-control"
                      placeholder="Description..."
                      rows="3"
                      v-model="form.description"
                    ></b-form-textarea>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.description">{{ errors.description[0] }}</strong>
                  </b-form-group>
                </b-col>
              </b-row>

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
    data() {
      return {
        form: {
          title: '',
          status: '',
          description: ''
        },
        errors: {}
      }
    },
    methods: {
      async store() {
        await this.$axios.$post('/pages/faq/store', this.form)
          .then(response => {
            this.$izitoast.success({
              title: 'Success !!',
              message: 'Faq create successfully!'
            });
            this.$router.push({name: 'pages-property-faq'});
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
    }
  }
</script>

<style scoped>

</style>
