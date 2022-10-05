<template>
  <div>
    <b-navbar toggleable="lg" class="top-navbar" :class="(isPadding) ? '': 'top-navbar-left'" fixed="top">
      <b-navbar-brand class="ml-5" href="#">
        <!-- <b-img width="130" src="../../assets/images/logo.png"></b-img> -->
      </b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!--<b-nav-item href="#">Home</b-nav-item>-->
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto user-setting">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              {{ user }}
            </template>
            <b-dropdown-item>Profile</b-dropdown-item>
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    isPadding: Boolean
  },
  computed: {
    user() {
      return this.$auth.user.name;
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()

      this.$izitoast.success({
        title: 'Success !!',
        message: 'Log out In successfully!'
      })

      this.$nuxt.$options.router.push({ name: 'login' })
    },
  }
}
</script>

<style scoped>

</style>
