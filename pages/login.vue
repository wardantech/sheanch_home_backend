<template>
  <div>
    <div class="login-section">
      <b-container>
        <b-row class="justify-content-center">
          <b-col cols="6" class="text-center mb-5">
            <h2 class="heading-section">SHE-ANCH LOGIN</h2>
          </b-col>
        </b-row>
        <b-row class="justify-content-center">
          <b-col cols="12" md="8" lg="10">
            <div class="main-wrap d-md-flex">
              <img class="login-img" src="../assets/images/login.jpeg" alt="">
              <div class="login-wrap p-4 p-md-5">
                <div class="d-flex">
                  <div class="w-100">
                    <h4 class="mb-4">Sign In</h4>
                  </div>
                </div>
                <b-form @submit.prevent="userLogin" class="signin-form">
                  <b-form-group label="Your E-mail" label-for="email">
                    <b-form-input type="email" id="email" name="email" v-model="form.email" placeholder="Enter E-mail" required></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.email">{{ errors.email[0] }}</strong>
                  </b-form-group>

                  <b-form-group label="Your Password" label-for="password">
                    <b-form-input type="password" id="password" name="password" v-model="form.password" placeholder="Enter Password" required></b-form-input>
                    <strong class="text-danger" style="font-size: 12px" v-if="errors.password">{{ errors.password[0] }}</strong>
                  </b-form-group>

                  <b-form-group>
                    <b-button type="submit" block variant="primary" :disabled="loader">Login</b-button>
                  </b-form-group>
                </b-form>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    auth: false,
    data() {
      return {
        loader: false,
        form: {
          email: 'admin@gmail.com',
          password: '123456',
        },
        errors: {}
      }
    },
    mounted() {
      if (this.$auth.loggedIn) {
        this.$router.push({ name: '/' });
      }
    },
    methods: {
      async userLogin() {
        this.loader = true;
        await this.$auth.loginWith('local', { data: this.form })
          .then(response => {
            this.$izitoast.success({
              title: 'Success !!',
              message: 'Logged In successfully!'
            })
            this.$nuxt.$options.router.push({ path: '/' })
          }).catch(error => {
            this.loader = false;
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

<style scoped>

</style>
