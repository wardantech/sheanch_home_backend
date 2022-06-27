<template>
  <div>
    <b-sidebar :no-close-on-route-change="true" id="sidebar-variant" aria-labelledby="sidebar-no-header-title" style="display: block !important" no-header shadow visible>
      <template #default="{ hide }">
        <div class="padding-top">
          <nav class="mb-3 sidebar-nav">
            <ul class="list-unstyled components">
              <li class="active">
                <nuxt-link :to="{ name: 'index' }"  class="dashboard">
                  <font-awesome-icon icon="fa-solid fa-house-chimney"/>
                  <span>Dashboard</span>
                </nuxt-link>
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
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
export default {

}
</script>
