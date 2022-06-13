<template>
  <div>
    <div class="login-section">
      <b-container>
        <b-row class="justify-content-center">
          <b-col cols="6" class="text-center mb-5">
            <h2 class="heading-section">SEANCH LOGIN</h2>
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
                    <b-form-input
                      type="email"
                      id="email"
                      name="email"
                      v-model="form.email"
                      placeholder="Enter E-mail"
                      required>

                    </b-form-input>
                  </b-form-group>

                  <b-form-group label="Your Password" label-for="password">
                    <b-form-input
                      type="password"
                      id="password"
                      name="password"
                      v-model="form.password"
                      placeholder="Enter Password"
                      required>

                    </b-form-input>
                  </b-form-group>

                  <b-form-group>
                    <b-button type="submit" block variant="primary">Login</b-button>
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
      loader:false,
      form: {
        email: 'admin@gmail.com',
        password: '123456',
      },
      errors:{}
    }
  },
  mounted() {
    console.log(this.$store.state.auth.user)
     console.log(this.$auth.loggedIn)
    if(this.$auth.loggedIn){
      this.$router.push({name: '/'});
    }
  },
  methods: {

    async userLogin () {
      this.loader = true;

        await this.$auth.loginWith('local', { data: this.form })
          .then(response=>{
            this.$toast.success('Logged In successfully!');
            //console.log(response)
            //this.$nuxt.$loading.finish();
            //this.$store.dispatch('auth/storeAuthToken', response.data.data.token)
            //console.log(this.$store.getters['auth/getAuthToken']);
            //console.log(response);
            //console.log(this.$auth.user)
            this.$nuxt.$options.router.push({path:'/'})
            //console.log(this.$auth.user)
            //console.log(this.$auth.loggedIn)
          });


    },
  }
}
</script>

<style scoped>

</style>
