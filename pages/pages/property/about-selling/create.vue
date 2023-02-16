<template>
  <div>
    <!--Body Card-->
    <b-row>
      <b-col md="12">
        <div class="card mt-3">
          <div class="card-header">
            <h5 class="card-title m-0">Create about property selling</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="store">
              <b-row>
                <b-col lg="6" md="6" sm="12">
                  <b-form-group label="Title">
                    <b-form-input class="custom-form-control" v-model="form.title" type="text"
                      placeholder="Title"></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.title">{{
                      errors.title[0]
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

              <b-row>
                <b-col md="12">
                  <b-form-group label="Description">
                    <b-form-textarea id="residential" class="custom-form-control" placeholder="Description..." rows="3"
                      v-model="form.description"></b-form-textarea>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.description">{{ errors.description[0]
                    }}</strong>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col md="12">
                  <b-form-group label="Image">
                    <Dropzone id="foo" ref="el" :options="options" :destroyDropzone="false">
                    </Dropzone>
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
        headers: { "Authorization": this.$auth.strategy.token.get() },
        maxFiles: 1,
        autoProcessQueue: false,
        acceptedFiles: ".jpeg,.jpg,.png"
      },
      form: {
        title: '',
        status: '',
        image: '',
        description: ''
      },
      isDisable: false,
      previewImage: null,
      errors: {}
    }
  },
  methods: {
    async store() {
      this.isDisable = true;
      await this.$axios.$post('pages/property/about-selling/store', this.form)
        .then(response => {
          this.$izitoast.success({
            title: 'Success !!',
            message: 'About property selling create successfully!'
          });

          this.$refs.el.dropzone.options.url = process.env.APP_ROOT_API + 'pages/property/about-selling/image-upload/' + response.data.id;
          this.$refs.el.dropzone.processQueue();
          this.$router.push({ name: 'pages-property-about-selling' });
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
