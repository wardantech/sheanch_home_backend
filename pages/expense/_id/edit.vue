<template>
  <div>
    <b-row>
      <b-col md="12">
        <div class="card mt-3">
          <div class="card-header">
            <h5 class="card-title m-0">
              Edit Utility
            </h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="update">
              <b-row>
                <b-col md="4">
                  <b-form-group label="Name">
                    <b-form-input v-model="form.name" type="text" class="custom-form-control"
                                  placeholder="Name"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.name">{{
                      errors.name[0]
                      }}</strong>
                  </b-form-group>
                </b-col>

                <b-col md="4">
                  <b-form-group label="Category">
                    <select v-model="form.utility_category_id"
                            class="form-control custom-select-form-control">
                      <option value="">Select</option>
                      <option v-for="(category, i) in utilityCategories" :value="category.id" :key="i">
                        {{ category.name }}
                      </option>
                    </select>
                    <strong class="text-danger" style="font-size: 12px"
                            v-if="errors.utility_category_id">{{ errors.utility_category_id[0] }}</strong>
                  </b-form-group>
                </b-col>

                <b-col md="4">
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

              <b-row>
                <b-col md="12">
                  <b-form-group label="Description">
                    <b-form-textarea
                      class="custom-form-control"
                      v-model="form.description"
                      placeholder="Say something..."
                      rows="3"
                    ></b-form-textarea>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col>
                  <b-form-group>
                    <b-button type="submit" variant="info">Update</b-button>
                  </b-form-group>
                </b-col>
              </b-row>
            </form>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    name: "edit",
    data() {
      return {
        form: {
          name: '',
          status: '',
          description: '',
          utility_category_id: ''
        },
        utilityCategories: '',
        errors: {}
      }
    },
    async created() {
      let utilityCategories = await this.$axios.$get('settings/utility/get-categories');
      this.utilityCategories = utilityCategories.data;

      await this.$axios.$get('/settings/utility/show/' + this.$route.params.id)
        .then(response => {
          this.form = response.data;
        })
    },
    methods: {
      async update() {
        await this.$axios.$post('/settings/utility/update/' + this.$route.params.id, this.form,)
          .then(response => {
            this.$izitoast.success({
              title: 'Success !!',
              message: 'Utility updated successfully!'
            })
            this.$router.push({name: 'settings-utilities'});
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

<style scoped>

</style>
