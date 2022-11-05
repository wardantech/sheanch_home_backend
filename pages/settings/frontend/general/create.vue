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
                <b-form-input class="custom-form-control" v-model="form.email" type="email" placeholder="Enter E-mail"></b-form-input>
                <strong class="text-danger" style="font-size: 12px" v-if="errors.email">{{
                  errors.email[0]
                  }}</strong>
              </b-form-group>

              <b-form-group label="Phone">
                <b-form-input class="custom-form-control" v-model="form.phone" type="text" placeholder="Enter Phone Number"></b-form-input>
                <strong class="text-danger" style="font-size: 12px" v-if="errors.phone">{{
                  errors.phone[0]
                  }}</strong>
              </b-form-group>

              <b-form-group label="Address">
                <b-form-textarea
                  class="custom-form-control"
                  id="address"
                  placeholder="Enter Address..."
                  rows="3"
                  v-model="form.address"
                ></b-form-textarea>
                <strong class="text-danger" style="font-size: 12px"
                        v-if="errors.address">{{ errors.address[0] }}</strong>
              </b-form-group>

              <b-row>
                <b-col md="4">
                  <b-form-group label="Banner Image">
                    <dropzone id="banner_img" ref="banner_el"
                              :options="options"
                              @vdropzone-files-added="processBannerFile"
                              @vdropzone-removed-file="fileBannerRemoved"
                              :destroyDropzone="false"
                    >
                    </dropzone>
                  </b-form-group>
                </b-col>

                <b-col md="4">
                  <b-form-group label="Header Logo">
                    <dropzone id="logo" ref="logo_el"
                              :options="options"
                              @vdropzone-files-added="processLogoFile"
                              @vdropzone-removed-file="fileLogoRemoved"
                              :destroyDropzone="false"
                    >
                    </dropzone>
                  </b-form-group>
                </b-col>

                <b-col md="4">
                  <b-form-group label="Footer Logo">
                    <dropzone id="footer" ref="footer_el"
                              :options="options"
                              @vdropzone-files-added="processFooterFile"
                              @vdropzone-removed-file="fileFooterLogoRemoved"
                              :destroyDropzone="false"
                    >
                    </dropzone>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-form-group>
                <b-button size="sm" type="submit" variant="dark">Save</b-button>
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
          footerLogo: [],
          logo: [],
        },
        errors: {}
      }
    },

    async created() {
      const data = await this.$axios.$post('settings/frontend/get-data');

      if (data.status) {
        this.form.email = data.data.email;
        this.form.phone = data.data.phone;
        this.form.address = data.data.address;
      }
      let images = data.data.media;
      //console.log(data.data.media);

      if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          var file = {
            size: images[i].size,
            name: images[i].name,
            url: images[i].original_url,
            data: images[i].data,
          };

          if (images[i].collection_name == 'banner') {
            this.$refs.banner_el.manuallyAddFile(file, images[i].original_url);
            this.form.bannerImage.push(file)
          }
          // else if (images[i].collection_name == 'favicon'){
          //   this.$refs.favicon_el.manuallyAddFile(file, images[i].original_url);
          //   this.form.favicon.push(file)
          // }
          else if (images[i].collection_name == 'logo') {
            this.$refs.logo_el.manuallyAddFile(file, images[i].original_url);
            this.form.logo.push(file)
          } else if (images[i].collection_name == 'footerLogo') {
            this.$refs.footer_el.manuallyAddFile(file, images[i].original_url);
            this.form.footerLogo.push(file)
          }
        }
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
          this.form.bannerImage = this.form.bannerImage.filter(element => element.data !== file.dataURL)
        } else {
          this.form.bannerImage = this.form.bannerImage.filter(element => element.name !== file.name)
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
          this.form.logo = this.form.logo.filter(element => element.data !== file.dataURL)
        } else {
          this.form.logo = this.form.logo.filter(element => element.name !== file.name)
        }
      },

      // Catch Footer Logo Image
      processFooterFile(file) {
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

            this.form.footerLogo.push(fileObj)
          }
        })
      },

      // Remove Logo Image
      fileFooterLogoRemoved(file) {
        if (file.dataURL) {
          this.form.logo = this.form.logo.filter(element => element.data !== file.dataURL)
        } else {
          this.form.logo = this.form.logo.filter(element => element.name !== file.name)
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
