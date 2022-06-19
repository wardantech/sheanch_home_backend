<template>
    <div>
        <div class="top-navbar">
            <b-navbar toggleable="lg" type="dark" variant="info" class="bg-navbar">
                <b-navbar-brand href="#">
                  <font-awesome-icon icon="fa-solid fa-bars"/>
                </b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item href="#">Home</b-nav-item>
                    </b-navbar-nav>

                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item-dropdown right class="navbar-dropdown-menu">
                            <!-- Using 'button-content' slot -->
                            <template #button-content>
                              {{ user }}
                            </template>
                            <b-dropdown-item href="#">Profile</b-dropdown-item>
                            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
        </div>
    </div>
</template>

<script>
    export default {
      name: "Navbar",
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
          }
      }
    }
</script>

<style scoped>

</style>
