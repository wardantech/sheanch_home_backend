<template>
  <div>
    <b-sidebar :no-close-on-route-change="true" id="sidebar-variant" aria-labelledby="sidebar-no-header-title"
               style="display: block !important" no-header shadow visible>
      <template #default="{ hide }">
        <div class="padding-top">
          <nav class="mb-3 sidebar-nav">
            <ul class="list-unstyled components">
              <li class="active">
                <nuxt-link :to="{ name: 'index' }" class="dashboard">
                  <font-awesome-icon icon="fa-solid fa-house-chimney"/>
                  <span>Dashboard</span>
                </nuxt-link>
              </li>

              <!-- Users -->
              <li>
                <b-button class="custom-dropdown-btn" v-b-toggle.collapse-2>
                  <font-awesome-icon icon="fa-solid fa-layer-group"/>
                  Users
                  <font-awesome-icon icon="fa-solid fa-caret-down"/>
                </b-button>
              </li>

              <b-collapse class="dropdown-container m-2" id="collapse-2">
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
              <!--/. Users -->

              <!-- Properties -->
              <li>
                <b-button class="custom-dropdown-btn" v-b-toggle.collapse-7>
                  <font-awesome-icon icon="fa-solid fa-hotel" />
                  Properties
                  <font-awesome-icon icon="fa-solid fa-caret-down"/>
                </b-button>
              </li>

              <b-collapse class="dropdown-container m-2" id="collapse-7">
                <li>
                  <nuxt-link :to="{ name: 'properties' }">
                    All Properties
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="{ name: 'properties-create' }">
                    Add Property
                  </nuxt-link>
                </li>
              </b-collapse>
              <!--/. Properties -->

              <!-- Lease -->
              <li>
                <b-button class="custom-dropdown-btn" v-b-toggle.collapse-9>
                  <font-awesome-icon icon="fa-solid fa-hotel" />
                  Lease
                  <font-awesome-icon icon="fa-solid fa-caret-down"/>
                </b-button>
              </li>

              <b-collapse class="dropdown-container m-2" id="collapse-9">
                <li>
                  <nuxt-link :to="{ name: 'leases' }">
                    All Leases
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="{ name: 'leases-create' }">
                    Add Lease
                  </nuxt-link>
                </li>
              </b-collapse>
              <!--/. Leases -->

              <!-- Expense -->
              <li>
                <b-button class="custom-dropdown-btn" v-b-toggle.collapse-8>
                  <font-awesome-icon icon="fa-solid fa-hand-holding-dollar" />
                  Expense
                  <font-awesome-icon icon="fa-solid fa-caret-down"/>
                </b-button>
              </li>

              <b-collapse class="dropdown-container m-2" id="collapse-8">
                <li>
                  <nuxt-link :to="{ name: 'expense-categories' }">
                    Categories
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="{ name: 'expense' }">
                    Expenses
                  </nuxt-link>
                </li>
              </b-collapse>
              <!--/. Expense -->

              <!-- Settings -->
              <li>
                <b-button class="custom-dropdown-btn" v-b-toggle.collapse-3>
                  <font-awesome-icon icon="fa-solid fa-gear"/>
                  Settings
                  <font-awesome-icon icon="fa-solid fa-caret-down"/>
                </b-button>
              </li>

              <b-collapse class="dropdown-container m-2" id="collapse-3">
                <li>
                  <b-button class="custom-dropdown-btn" v-b-toggle.collapse-4>
                    Utilities
                  </b-button>
                </li>

                <b-collapse class="dropdown-container m-2" id="collapse-4">
                  <li>
                    <nuxt-link :to="{ name: 'settings-utilities-categories' }">
                      Categories
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link :to="{ name: 'settings-utilities' }">
                      Utility
                    </nuxt-link>
                  </li>
                </b-collapse>

                <li>
                  <b-button class="custom-dropdown-btn" v-b-toggle.collapse-6>
                    Facilities
                  </b-button>
                </li>

                <b-collapse class="dropdown-container m-2" id="collapse-6">
                  <li>
                    <nuxt-link :to="{ name: 'settings-facilities-categories' }">
                      Categories
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link :to="{ name: 'settings-facilities' }">
                      Facility
                    </nuxt-link>
                  </li>
                </b-collapse>

                <li>
                  <nuxt-link class="m-0" :to="{ name: 'settings-property-type' }">
                    Property Type
                  </nuxt-link>
                </li>

              </b-collapse>

              <!--/. Settings -->

            </ul>
          </nav>
        </div>
      </template>
    </b-sidebar>
  </div>

</template>

<script>
export default {}
</script>
