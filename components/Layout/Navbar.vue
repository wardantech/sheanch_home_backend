<template>
  <div>
    <b-navbar toggleable="lg" class="top-navbar" fixed="top">
      <b-navbar-brand class="ml-5" href="#">
        <b-img width="130" src="../../assets/images/logo.png"></b-img>
      </b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Home</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              {{ user }}
            </template>
            <b-dropdown-item >Profile</b-dropdown-item>
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>

      <!--<div class="top-navbar">-->
          <!--<b-navbar toggleable="lg" type="dark" variant="info" class="bg-navbar">-->
              <!--<b-navbar-brand href="#">-->
                <!--<font-awesome-icon icon="fa-solid fa-bars"/>-->
              <!--</b-navbar-brand>-->

              <!--<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>-->

              <!--<b-collapse id="nav-collapse" is-nav>-->
                  <!--<b-navbar-nav>-->
                      <!--<b-nav-item href="#">Home</b-nav-item>-->
                  <!--</b-navbar-nav>-->

                  <!--&lt;!&ndash; Right aligned nav items &ndash;&gt;-->
                  <!--<b-navbar-nav class="ml-auto">-->
                      <!--<b-nav-item-dropdown right class="navbar-dropdown-menu">-->
                          <!--&lt;!&ndash; Using 'button-content' slot &ndash;&gt;-->
                          <!--<template #button-content>-->
                            <!--{{ user }}-->
                          <!--</template>-->
                          <!--<b-dropdown-item href="#">Profile</b-dropdown-item>-->
                          <!--<b-dropdown-item @click="logout">Sign Out</b-dropdown-item>-->
                      <!--</b-nav-item-dropdown>-->
                  <!--</b-navbar-nav>-->
              <!--</b-collapse>-->
          <!--</b-navbar>-->
      <!--</div>-->
  </div>
</template>

<script>
    export default {
      name: "Navbar",
      data() {
        return {
          isPadding: false
        }
      },
      computed: {
        user() {
          return this.$auth.user.name;
        }
      },
      methods:{
        async logout (){
          await this.$auth.logout()
          this.$toast.error('Logged In successfully!');
          this.$nuxt.$options.router.push({name:'login'})
        },
      }
    }
</script>

<style scoped>

</style>
