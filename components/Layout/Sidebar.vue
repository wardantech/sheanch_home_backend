<template>
  <div>
    <!-- Start Sidebar -->
    <nav id="sidebar">
      <div class="sidebar-header">
        <h3>
          <a href="#"><img src="../../assets/images/logo.png" class="img-fluid"/></a>
        </h3>
      </div>
      <ul class="list-unstyled components">
        <li class="active">
          <b-link href="#" class="dashboard">
            <font-awesome-icon icon="fa-solid fa-house-chimney"/>
            <span>Dashboard</span>
          </b-link>
        </li>

        <li>
          <b-button class="custom-dropdown-btn" v-b-toggle.collapse-2>
            <font-awesome-icon icon="fa-solid fa-layer-group"/>
            Users
            <font-awesome-icon icon="fa-solid fa-caret-down"/>
          </b-button>

          <b-collapse class="dropdown-container" id="collapse-2">
        <li>
          <nuxt-link :to="{ name: 'users-landlords' }">
            Landlords
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="{ name: 'users-tenants' }">
            Tenants
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="{ name: 'users-admins' }">
            Admins
          </nuxt-link>
        </li>
        </b-collapse>
        </li>
      </ul>
    </nav>
    <!-- Start Sidebar -->
  </div>
</template>

<script>
export default {
  //
}
</script>
