<template>
  <b-row>
    <b-col md="8">
      <div class="card mt-3">
        <div class="card-header">
          <h5 class="card-title m-0">Home pages</h5>
        </div>
        <div class="card-body">
          <b-form @submit.prevent="store">
            <div class="form-group">
              <label for="page_title">Title</label>
              <input type="text" v-model="form.title" class="form-control" id="page_title" placeholder="Page title">
            </div>
            <div class="form-group">
              <label for="banner_title">Banner Title</label>
              <input type="text" v-model="form.banner_title" class="form-control" id="banner_title" placeholder="Banner title">
            </div>
            <div class="form-group">
              <label for="caption">Caption</label>
              <textarea name="caption" v-model="form.caption" class="form-control" id="caption" cols="30" rows="3" placeholder="Write a short caption"></textarea>
            </div>
            <h6 for="newsletter_title" class="text-bold">
              <b>Newsletter section:</b>
            </h6>
            <hr class="my-2">
            <div class="form-group">
              <label for="">Title</label>
              <input type="text" v-model="form.newsletter.title" class="form-control" name="title" id="newsletter_title" placeholder="Newsletter title">
            </div>
            <div class="form-group">
              <label for="newsletter_caption">Newsletter caption</label>
              <textarea v-model="form.newsletter.caption" name="newsletter_caption" class="form-control" id="newsletter_caption" cols="30" rows="3" placeholder="Write a short caption"></textarea>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="button_text">Button text</label>
                <input type="text" v-model="form.newsletter.button_text" class="form-control" id="button_text" placeholder="Button text">
              </div>
              <div class="form-group col-md-6">
                <label for="button_url">Button Url</label>
                <input type="text" v-model="form.newsletter.button_link" class="form-control" id="button_url" placeholder="Button Url https://">
              </div>
            </div>

            <b-button type="submit" :disabled="isDisable" variant="success" size="sm">Save</b-button>
          </b-form>
        </div>
      </div>
    </b-col>
    <b-col md="4">
      <b-card class="mt-3" header="Upload Image">
        <b-form-group label="Image">
          <Dropzone id="foo" ref="el" :options="options" :destroyDropzone="false"></Dropzone>
        </b-form-group>
      </b-card>

      <b-card class="mt-3" header="Section show">
          <div class="form-check">
            <input class="form-check-input" v-model="form.is_properties" type="checkbox" id="properties_section">
            <label class="form-check-label" for="properties_section">
              Properties section
            </label>
          </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import Dropzone from 'nuxt-dropzone';
import 'nuxt-dropzone/dropzone.css';

export default({
  name: 'home-page',
  components: { Dropzone },
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
        banner_title: '',
        caption: '',
        is_properties: '',
        newsletter: {
          title: '',
          caption: '',
          button_text: '',
          button_link: ''
        }
      },
      isDisable: false,
      previewImage: null,
      errors: {}
    }
  },
  methods: {
    async store() {
      this.isDisable = true;
      await this.$axios.$post('pages/homes/update-create', this.form)
        .then((response) => {
          this.isDisable = false;
          console.log(response);
        })
        .catch((error) => {
          this.isDisable = false;
          console.error(error)
        })
    }
  }
})
</script>
