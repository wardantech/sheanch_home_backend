<template>
  <div>
    <b-sidebar :no-close-on-route-change="true" id="sidebar-variant" aria-labelledby="sidebar-no-header-title"
      style="display: block !important" no-header shadow visible>
      <template>
        <div class="padding-top">
          <nav class="mb-3 sidebar-nav">
            <div class="sidebar-brand">
              <b-img width="160" src="../../assets/images/logo_white.png"></b-img>
            </div>

            <b-list-group>
              <b-list-group-item>
                <i class='bx bxs-dashboard'></i>
                Dashboard
              </b-list-group-item>
              <!-- User -->
              <b-list-group-item v-b-toggle.users>
                <i class='bx bx-group'></i>
                Users
                <font-awesome-icon icon="fa-solid fa-angle-right" class="custom-angle-right" />
              </b-list-group-item>

              <b-collapse id="users" class="dropdown-container dropdown-list-item m-2">
                <li>
                  <NuxtLink :to="{ name: 'users' }">
                    <font-awesome-icon icon="fa-solid fa-right-long" />
                    All users
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink :to="{ name: 'users-create' }">
                    <font-awesome-icon icon="fa-solid fa-right-long" />
                    Add user
                  </NuxtLink>
                </li>
              </b-collapse>
              <!--./ User -->

              <!-- Properties -->
              <b-list-group-item v-b-toggle.properties>
                <i class='bx bx-buildings'></i>
                Properties
                <font-awesome-icon icon="fa-solid fa-angle-right" class="custom-angle-right" />
              </b-list-group-item>
              <b-collapse class="dropdown-container dropdown-list-item m-2" id="properties">
                <li>
                  <nuxt-link :to="{ name: 'properties' }">
                    <font-awesome-icon icon="fa-solid fa-right-long" />
                    All Properties
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="{ name: 'properties-create' }">
                    <font-awesome-icon icon="fa-solid fa-right-long" />
                    Add Property
                  </nuxt-link>
                </li>
                <li>
                  <a href="#" v-b-toggle.property-settings>
                    <font-awesome-icon icon="fa-solid fa-right-long" />
                    Settings
                  </a>
                </li>
                <b-collapse class="dropdown-container dropdown-list-item-sub m-2" id="property-settings">
                  <li>
                    <nuxt-link :to="{ name: 'settings-areas' }">
                      <font-awesome-icon icon="fa-solid fa-right-long" />
                      Areas
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link :to="{ name: 'settings-utilities' }">
                      <font-awesome-icon icon="fa-solid fa-right-long" />
                      Utility
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link :to="{ name: 'settings-facilities' }">
                      <font-awesome-icon icon="fa-solid fa-right-long" />
                      Facility
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link :to="{ name: 'settings-property-type' }">
                      <font-awesome-icon icon="fa-solid fa-right-long" />
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
              <!-- ./ Properties -->

              <!-- Property Ad Manager -->
              <b-list-group-item v-b-toggle.property-ads>
                <i class='bx bx-user-voice'></i>
                Property Ads
                <font-awesome-icon icon="fa-solid fa-angle-right" class="custom-angle-right" />
              </b-list-group-item>
              <b-collapse id="property-ads" class="dropdown-container dropdown-list-item m-2">
                <li>
                  <NuxtLink :to="{ name: 'properties-ads-manager' }">
                    <font-awesome-icon icon="fa-solid fa-right-long" />
                    All Ads
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink :to="{ name: 'properties-ads-manager-create' }">
                    <font-awesome-icon icon="fa-solid fa-right-long" />
                    Create ad
                  </NuxtLink>
                </li>
              </b-collapse>
              <!--./ Property Ad Manager -->

              <!-- Deeds -->
              <b-list-group-item v-b-toggle.deed>
                <i class='bx bx-news'></i>
                Deeds
                <font-awesome-icon icon="fa-solid fa-angle-right" class="custom-angle-right" />
              </b-list-group-item>
              <b-collapse id="deed" class="dropdown-container dropdown-list-item m-2">
                <li>
                  <NuxtLink :to="{ name: 'properties-deed' }">
                    <font-awesome-icon icon="fa-solid fa-right-long" />
                    All Deeds
                  </NuxtLink>
                </li>
              </b-collapse>
              <!--./ Deeds -->

              <!-- Pages -->
              <b-list-group-item v-b-toggle.pages>
                <i class='bx bxs-news'></i>
                Pages
                <font-awesome-icon icon="fa-solid fa-angle-right" class="custom-angle-right" />
              </b-list-group-item>
              <b-collapse id="pages" class="dropdown-container dropdown-list-item m-2">
                <li>
                  <nuxt-link :to="{ name: 'pages-home' }">
                    <font-awesome-icon icon="fa-solid fa-right-long" />
                    Home page
                  </nuxt-link>
                </li>
                <li>
                  <a href="#" v-b-toggle.pages-property>
                    <font-awesome-icon icon="fa-solid fa-right-long" />
                    Property
                  </a>
                </li>
                <b-collapse id="pages-property" class="dropdown-container dropdown-list-item-sub m-2">
                  <li>
                    <nuxt-link :to="{ name: 'pages-property-faq' }">
                      <font-awesome-icon icon="fa-solid fa-right-long" />
                      Faq
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link :to="{ name: 'pages-property-customer-experiences' }">
                      <font-awesome-icon icon="fa-solid fa-right-long" />
                      Experiences
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link :to="{ name: 'pages-property-about-selling' }">
                      <font-awesome-icon icon="fa-solid fa-right-long" />
                      About Selling
                    </nuxt-link>
                  </li>
                </b-collapse>
              </b-collapse>
              <!-- ./ Pages -->

              <!-- Widgets -->
              <b-list-group-item v-b-toggle.widgets>
                <i class='bx bxs-widget'></i>
                Widgets
                <font-awesome-icon icon="fa-solid fa-angle-right" class="custom-angle-right" />
              </b-list-group-item>

              <b-collapse id="widgets" class="dropdown-container dropdown-list-item m-2">
                <li>
                  <NuxtLink :to="{ name: 'widgets-how-to-work' }">
                    <font-awesome-icon icon="fa-solid fa-right-long" />
                    How to works
                  </NuxtLink>
                </li>
              </b-collapse>
              <!-- ./ Widgets -->

              <!-- Reviews -->
              <b-list-group-item v-b-toggle.reviews>
                <i class='bx bx-like'></i>
                Reviews
                <font-awesome-icon icon="fa-solid fa-angle-right" class="custom-angle-right" />
              </b-list-group-item>

              <b-collapse id="reviews" class="dropdown-container dropdown-list-item m-2">
                <li>
                  <NuxtLink :to="{ name: 'reviews-property-review' }">
                    <font-awesome-icon icon="fa-solid fa-right-long" />
                    Property Reviews
                  </NuxtLink>
                </li>
                <!-- <li>
                  <NuxtLink :to="{ name: 'reviews-landlord-review' }">
                    <font-awesome-icon icon="fa-solid fa-right-long" />
                    Landlord Reviews
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink :to="{ name: 'reviews-tenant-review' }">
                    <font-awesome-icon icon="fa-solid fa-right-long" />
                    Tenant Reviews
                  </NuxtLink>
                </li> -->
              </b-collapse>
              <!--./ Reviews -->

              <!-- Wishlists -->
              <b-list-group-item v-b-toggle.wishlists>
                <i class='bx bx-heart'></i>
                Wishlists
                <font-awesome-icon icon="fa-solid fa-angle-right" class="custom-angle-right" />
              </b-list-group-item>

              <b-collapse id="wishlists" class="dropdown-container dropdown-list-item m-2">
                <li>
                  <NuxtLink :to="{ name: 'wishlists' }">
                    <font-awesome-icon icon="fa-solid fa-right-long" />
                    All Wishlists
                  </NuxtLink>
                </li>
              </b-collapse>
              <!--./ Wishlists -->

              <!-- Expense -->
              <b-list-group-item v-b-toggle.expense>
                <i class='bx bx-wallet-alt'></i>
                Expense
                <font-awesome-icon icon="fa-solid fa-angle-right" class="custom-angle-right" />
              </b-list-group-item>

              <b-collapse id="expense" class="dropdown-container dropdown-list-item m-2">
                <li>
                  <NuxtLink :to="{ name: 'expense-categories' }">
                    <font-awesome-icon icon="fa-solid fa-right-long" />
                    Categories
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink :to="{ name: 'expense' }">
                    <font-awesome-icon icon="fa-solid fa-right-long" />
                    Expenses
                  </NuxtLink>
                </li>
              </b-collapse>
              <!--./ Expense -->

              <!-- Settings -->
              <b-list-group-item v-b-toggle.settings>
                <i class='bx bx-cog'></i>
                Settings
                <font-awesome-icon icon="fa-solid fa-angle-right" class="custom-angle-right" />
              </b-list-group-item>
              <b-collapse id="settings" class="dropdown-container dropdown-list-item m-2">
                <li>
                  <a href="#" v-b-toggle.frontend-setting>
                    <font-awesome-icon icon="fa-solid fa-right-long" />
                    Frontend
                  </a>
                </li>
                <b-collapse id="frontend-setting" class="dropdown-container dropdown-list-item-sub m-2">
                  <li>
                    <nuxt-link :to="{ name: 'settings-frontend-general-create' }">
                      <font-awesome-icon icon="fa-solid fa-right-long" />
                      General
                    </nuxt-link>
                  </li>
                </b-collapse>
                <li>
                  <nuxt-link :to="{ name: 'subscriptions' }">
                    <font-awesome-icon icon="fa-solid fa-right-long" />
                    Subscriptions
                  </nuxt-link>
                </li>
              </b-collapse>
              <!--./ Settings -->
            </b-list-group>
          </nav>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      visible: false,
      items: [
        { title: 'Dashboard', icon: 'bxs-dashboard', right_icon: 'fa-angle-right' }
      ]
    }
  }
}
</script>
