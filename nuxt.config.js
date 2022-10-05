export default {
  mode: 'universal',
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.APP_TITLE,
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/imgpsh_fullsize_anim.png' }
    ]
  },


  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    'assets/css/style.css',
    '~/assets/sass/dashboard/main.scss',
    'boxicons/css/boxicons.min.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/fontawesome.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [

  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'nuxt-izitoast',
    'vue-sweetalert2/nuxt',

  ],
  izitoast: {
    position: 'topRight',
    transitionIn: 'bounceInLeft',
    transitionOut: 'fadeOutRight',
  },

  axios: {
    //proxy: true,
    baseURL: process.env.APP_ROOT_API,
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'access_token',
          global: true,
          // required: true,
           type: 'Bearer'
        },
        user: {
          property: false,
          // autoFetch: true
        },
        endpoints: {
          login: { url: 'auth/login', method: 'post' },
          logout: { url: 'auth/logout', method: 'post' },
          user: { url: 'auth/me', method: 'post' }
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  router: {
    middleware: ['auth']
  },
  reactStrictMode: true,
  env: {
    APP_ROOT_API: process.env.APP_ROOT_API,
    APP_ROOT_IMG_URL: process.env.APP_ROOT_IMG_URL
  }

}
