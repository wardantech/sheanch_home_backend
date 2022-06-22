<template>
  <div>
    <Login v-if="$route.path === '/login' ? true : false"/>

    <div class="wrapper" v-if="$route.path === '/login' ? false : true">
      <!-- Navabar -->
      <Navbar/>
      <!--/. Navabar -->

      <!-- Sidebar -->
      <Sidebar/>
      <!--/. Sidebar -->

      <b-button
        v-b-toggle.sidebar-variant
        class="sidebar-toggle-btn"
        @click="addPadding">
        <font-awesome-icon icon="fa-solid fa-bars" />
      </b-button>
      <main class="pt-3" :class="(isPadding) ? 'add-padding': ''" style="margin-top: 65px">
        <div class="container-fluid">
          <Nuxt/>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
  import Sidebar from "~/components/Layout/Sidebar";
  import Navbar from "~/components/Layout/Navbar";
  import Login from "@/pages/login";
  export default {
    name: "default",
    components: {Login, Navbar, Sidebar},
    data() {
      return {
        isPadding: true,
        toggle:true
      }
    },
    methods: {
      addPadding() {
        if(this.isPadding) {
          this.isPadding = false;
        }else {
          this.isPadding = true;
        }
        console.log(this.isPadding);
      }
    }
  }
</script>

<style scoped>

</style>
