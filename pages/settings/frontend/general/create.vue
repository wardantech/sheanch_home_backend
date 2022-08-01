<template>
  <div>
    <!--Body Card-->
    <b-row>
      <b-col md="12">
        <div class="card mt-3">
          <div class="card-header">
            <h5 class="card-title m-0">General Setting</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="store">
              <b-form-group label="E-mail">
                <b-form-input v-model="form.email" type="email" placeholder="Enter E-mail"></b-form-input>
                <strong class="text-danger" style="font-size: 12px" v-if="errors.email">{{
                  errors.email[0]
                  }}</strong>
              </b-form-group>

              <b-form-group label="Phone">
                <b-form-input v-model="form.phone" type="text" placeholder="Enter Phone Number"></b-form-input>
                <strong class="text-danger" style="font-size: 12px" v-if="errors.phone">{{
                  errors.phone[0]
                  }}</strong>
              </b-form-group>

              <b-form-group label="Address">
                <b-form-textarea
                  id="address"
                  placeholder="Enter Address..."
                  rows="3"
                  v-model="form.address"
                ></b-form-textarea>
                <strong class="text-danger" style="font-size: 12px"
                        v-if="errors.address">{{ errors.address[0] }}</strong>
              </b-form-group>

              <b-form-group label="Banner Image">
                <dropzone id="banner_img" ref="favicon_el"
                          :options="options"
                          @vdropzone-files-added="processBannerFile"
                          @vdropzone-removed-file="fileBannerRemoved"
                          :destroyDropzone="false"
                >
                </dropzone>
              </b-form-group>

              <b-form-group label="Favicon">
                <dropzone id="favicon" ref="favicon_el"
                          :options="options"
                          @vdropzone-files-added="processFaviconFile"
                          @vdropzone-removed-file="fileFaviconRemoved"
                          :destroyDropzone="false"
                >
                </dropzone>
              </b-form-group>

              <b-form-group label="Logo">
                <dropzone id="logo" ref="logo_el"
                          :options="options"
                          @vdropzone-files-added="processLogoFile"
                          @vdropzone-removed-file="fileLogoRemoved"
                          :destroyDropzone="false"
                >
                </dropzone>
              </b-form-group>

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
          acceptedFiles: ".jpeg,.jpg,.png",
          parallelUploads: 20,
          maxFilesize: 2,
        },
        form: {
          email: '',
          phone: '',
          address: '',
          bannerImage: [],
          favicon: [],
          logo: []
        },
        errors: {}
      }
    },

    methods: {
      // Catch Banner Image
      processBannerFile(file) {
        let image = Array.from(file);
        image.forEach(element => {
          const reader = new FileReader();
          reader.readAsDataURL(element);

          reader.onload = event => {
            const fileObj = {};
            fileObj.name = element.name;
            fileObj.description = '';
            fileObj.data = event.target.result;
            fileObj.size = (element.size / (1024 * 1024)).toFixed(2);
            fileObj.type = element.type;

            this.form.bannerImage.push(fileObj)
          }
        })
      },

      // Remove Banner Image
      fileBannerRemoved(file) {
        if (file.dataURL) {
          this.form.images = this.form.bannerImage.filter(element => element.data !== file.dataURL)
        } else {
          this.form.images = this.form.bannerImage.filter(element => element.name !== file.name)
        }
      },

      // Catch Favicon Image
      processFaviconFile(file) {
        let image = Array.from(file);
        image.forEach(element => {
          const reader = new FileReader();
          reader.readAsDataURL(element);

          reader.onload = event => {
            const fileObj = {};
            fileObj.name = element.name;
            fileObj.description = '';
            fileObj.data = event.target.result;
            fileObj.size = (element.size / (1024 * 1024)).toFixed(2);
            fileObj.type = element.type;

            this.form.favicon.push(fileObj)
          }
        })
      },

      // Remove Favicon Image
      fileFaviconRemoved(file) {
        if (file.dataURL) {
          this.form.favicon = this.form.bannerImage.filter(element => element.data !== file.dataURL)
        } else {
          this.form.favicon = this.form.bannerImage.filter(element => element.name !== file.name)
        }
      },

      // Catch Logo Image
      processLogoFile(file) {
        let image = Array.from(file);
        image.forEach(element => {
          const reader = new FileReader();
          reader.readAsDataURL(element);

          reader.onload = event => {
            const fileObj = {};
            fileObj.name = element.name;
            fileObj.description = '';
            fileObj.data = event.target.result;
            fileObj.size = (element.size / (1024 * 1024)).toFixed(2);
            fileObj.type = element.type;

            this.form.logo.push(fileObj)
          }
        })
      },

      // Remove Logo Image
      fileLogoRemoved(file) {
        if (file.dataURL) {
          this.form.favicon = this.form.logo.filter(element => element.data !== file.dataURL)
        } else {
          this.form.favicon = this.form.logo.filter(element => element.name !== file.name)
        }
      },

      async store() {
        await this.$axios.$post('settings/frontend/general/store', this.form)
          .then(response => {
            this.$izitoast.success({
              title: 'Success !!',
              message: 'Frontend general setting updated successfully!'
            });

            this.$router.push({name: 'settings-frontend-general-create'});
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

<style scoped>

</style>
