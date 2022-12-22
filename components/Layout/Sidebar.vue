<template>
  <div>
    <b-sidebar :no-close-on-route-change="true" id="sidebar-variant" aria-labelledby="sidebar-no-header-title"
               style="display: block !important" no-header shadow visible>
      <template #default="{ hide }">
        <div class="padding-top">
          <nav class="mb-3 sidebar-nav">
            <div class="sidebar-brand">
              <b-img width="160" src="../../assets/images/logo_white.png"></b-img>
            </div>

            <ul class="list-unstyled components">
              <li class="active">
                <nuxt-link :to="{ name: 'index' }" class="dashboard">
                  <i class='bx bxs-dashboard'></i>
                  <span>Dashboard</span>
                </nuxt-link>
              </li>

              <!-- Users -->
              <li>
                <b-button class="custom-dropdown-btn" v-b-toggle.users>
                  <i class='bx bx-group'></i>
                  Users
                  <font-awesome-icon icon="fa-solid fa-angle-right" class="custom-angle-right" />
                </b-button>
              </li>

              <b-collapse class="dropdown-container m-2" id="users">
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
              </b-collapse>
              <!--/. Users -->

              <!-- Properties -->
              <li>
                <b-button class="custom-dropdown-btn" v-b-toggle.properties>
                  <i class='bx bx-buildings'></i>
                  Properties
                  <font-awesome-icon icon="fa-solid fa-angle-right" class="custom-angle-right" />
                </b-button>
              </li>

              <b-collapse class="dropdown-container m-2" id="properties">
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

                <li>
                  <a href="#" v-b-toggle.property-settings>
                    Settings
                  </a>
                </li>

                <b-collapse class="dropdown-container m-2" id="property-settings">
                  <li>
                    <nuxt-link :to="{ name: 'settings-utilities' }">
                      Utility
                    </nuxt-link>
                  </li>

                  <li>
                    <nuxt-link :to="{ name: 'settings-facilities' }">
                      Facility
                    </nuxt-link>
                  </li>

                  <li>
                    <nuxt-link :to="{ name: 'settings-property-type' }">
                      Property Type
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link :to="{ name: 'settings-area' }">
                      Area
                    </nuxt-link>
                  </li>
                </b-collapse>
              </b-collapse>
              <!--/. Properties -->

              <!-- Property Ad Manager -->
              <li>
                <b-button class="custom-dropdown-btn" v-b-toggle.property-ads>
                  <i class='bx bx-user-voice'></i>
                  Property Ads
                  <font-awesome-icon icon="fa-solid fa-angle-right" class="custom-angle-right" />
                </b-button>
              </li>

              <b-collapse class="dropdown-container m-2" id="property-ads">
                <li>
                  <nuxt-link :to="{ name: 'properties-ads-manager' }">
                    All Ads
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="{ name: 'properties-ads-manager-create' }">
                    Add Ad
                  </nuxt-link>
                </li>
              </b-collapse>
              <!--/. Property Ad Manager -->

              <!-- Lease -->
              <li>
                <b-button class="custom-dropdown-btn" v-b-toggle.lease>
                  <i class='bx bx-news'></i>
                  Deed
                  <font-awesome-icon icon="fa-solid fa-angle-right" class="custom-angle-right" />
                </b-button>
              </li>

              <b-collapse class="dropdown-container m-2" id="lease">
                <li>
                  <nuxt-link :to="{ name: 'properties-deed' }">
                    All Deeds
                  </nuxt-link>
                </li>
              </b-collapse>
              <!--/. Leases -->

              <!-- Pages  -->
              <li>
                <b-button class="custom-dropdown-btn" v-b-toggle.pages>
                  <i class='bx bxs-news' ></i>
                  Pages
                  <font-awesome-icon icon="fa-solid fa-angle-right" class="custom-angle-right" />
                </b-button>
              </li>

              <b-collapse class="dropdown-container m-2" id="pages">
                <li class="custom-dropdown-btn" v-b-toggle.pages-property>
                  <nuxt-link :to="{ name: 'expense-categories' }">
                    Property
                  </nuxt-link>
                </li>

                <!-- Pages Property -->
                <b-collapse class="dropdown-container m-2" id="pages-property">
                  <li>
                    <nuxt-link :to="{ name: 'pages-property-faq' }">
                      FAQ
                    </nuxt-link>
                  </li>

                  <li>
                    <nuxt-link :to="{ name: 'pages-property-customer-experiences' }">
                      Customer Experiences
                    </nuxt-link>
                  </li>

                  <li>
                    <nuxt-link :to="{ name: 'pages-property-about-selling' }">
                      About Property Selling
                    </nuxt-link>
                  </li>
                </b-collapse>
                <!-- /.Pages Property -->
              </b-collapse>
              <!-- /.Pages  -->

              <!-- Widgets -->
              <li>
                <b-button class="custom-dropdown-btn" v-b-toggle.widgets>
                  <i class='bx bxs-widget'></i>
                  Widgets
                  <font-awesome-icon icon="fa-solid fa-angle-right" class="custom-angle-right" />
                </b-button>
              </li>

              <b-collapse class="dropdown-container m-2" id="widgets">
                <li>
                  <nuxt-link :to="{ name: 'widgets-how-to-work' }">
                    How to works
                  </nuxt-link>
                </li>
              </b-collapse>
              <!-- /.Widgets -->

              <!-- Reviews -->
              <li>
                <b-button class="custom-dropdown-btn" v-b-toggle.reviews>
                  <i class='bx bx-like'></i>
                  Reviews
                  <font-awesome-icon icon="fa-solid fa-angle-right" class="custom-angle-right" />
                </b-button>
              </li>

              <b-collapse class="dropdown-container m-2" id="reviews">
                <li>
                  <nuxt-link :to="{ name: 'reviews-property-review' }">
                    Property Reviews
                  </nuxt-link>
                </li>

                <li>
                  <nuxt-link :to="{ name: 'reviews-landlord-review' }">
                    Landlord Reviews
                  </nuxt-link>
                </li>

                <li>
                  <nuxt-link :to="{ name: 'reviews-tenant-review' }">
                    Tenant Reviews
                  </nuxt-link>
                </li>
              </b-collapse>
              <!--/. Reviews -->

              <!-- Wishlists -->
              <li>
                <b-button class="custom-dropdown-btn" v-b-toggle.wishlists>
                  <i class='bx bx-heart' ></i>
                  Wishlists
                  <font-awesome-icon icon="fa-solid fa-angle-right" class="custom-angle-right" />
                </b-button>
              </li>

              <b-collapse class="dropdown-container m-2" id="wishlists">
                <li>
                  <nuxt-link :to="{ name: 'wishlists' }">
                    All Wishlists
                  </nuxt-link>
                </li>
              </b-collapse>
              <!--/. Wishlists -->

              <!-- Expense -->
              <li>
                <b-button class="custom-dropdown-btn" v-b-toggle.expense>
                  <i class='bx bx-wallet-alt'></i>
                  Expense
                  <font-awesome-icon icon="fa-solid fa-angle-right" class="custom-angle-right" />
                </b-button>
              </li>

              <b-collapse class="dropdown-container m-2" id="expense">
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
                <b-button class="custom-dropdown-btn" v-b-toggle.settings>
                  <i class='bx bx-cog'></i>
                  Settings
                  <font-awesome-icon icon="fa-solid fa-angle-right" class="custom-angle-right" />
                </b-button>
              </li>

              <b-collapse class="dropdown-container m-2" id="settings">
                <li>
                  <a href="#" v-b-toggle.frontend-setting>
                    Frontend Setting
                  </a>
                </li>

                <b-collapse class="dropdown-container m-2" id="frontend-setting">
                  <li>
                    <nuxt-link :to="{ name: 'settings-frontend-general-create' }">
                      General
                    </nuxt-link>
                  </li>
                </b-collapse>
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
