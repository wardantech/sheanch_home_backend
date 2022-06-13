<template>
  <div>
    <Login v-if="$route.path === '/login' ? true : false"/>

    <div class="wrapper" v-if="$route.path === '/login' ? false : true">
      <div class="body-overlay"></div>
      <Sidebar />
      <!-- Start Content -->
      <div id="content">
        <Navbar  />
        <div class="main-content" >

          <Nuxt/>
        </div>
      </div>
      <!-- End Content -->
    </div>
  </div>
</template>

<script>
import Sidebar from "~/components/Layout/Sidebar";
import Navbar from "~/components/Layout/Navbar";
import Login from "@/pages/login";
export default {
  name: "default",
  components: {Login, Navbar, Sidebar}
}
</script>

<style scoped>

</style>
