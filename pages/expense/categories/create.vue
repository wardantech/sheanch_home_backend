<template>
  <div>
    <b-row>
      <b-col md="12">
        <div class="card mt-3">
          <div class="card-header">
            <h5 class="card-title m-0">
              Create Expense Category
            </h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="store">
              <b-row>
                <b-col md="6">
                  <b-form-group label="Name">
                    <b-form-input v-model="form.name" type="text" class="custom-form-control"
                                  placeholder="Name"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.name">{{
                      errors.name[0]
                      }}</strong>
                  </b-form-group>
                </b-col>

                <b-col md="6">
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
                    <b-button size="sm" type="submit" variant="info">Save</b-button>
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
    name: "create",
    data() {
      return {
        form: {
          name: '',
          status: '',
          description: ''
        },
        errors: {}
      }
    },
    methods: {
      async store() {
        await this.$axios.$post('expense/category', this.form,)
          .then(response => {
            console.log(response);
            this.$izitoast.success({
              title: 'Success !!',
              message: 'Expense category create successfully!'
            })
            this.$router.push({name: 'expense-categories'});
          })
          .catch(error => {
            if(error.response.status == 422){
              this.errors = error.response.data.errors
            }
            else{
              alert(error.response.message)
            }
          })
      }
    }
  }
</script>

<style scoped>

</style>
