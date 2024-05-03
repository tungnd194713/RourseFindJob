export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Route4u',
    htmlAttrs: {
      class: 'no-js',
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { hid: 'keywords', name: 'keywords', content: '在日ベトナム人, 仕事, 就職支援,, 就職活動, Shuuナビ, 就職, 転職, 日本仕事, Shuunavi, Shuu Navi, tìm việc, chuyển việc, việc tại nhật, hỗ trợ tìm việc, hoạt động tìm kiếm việc làm, công việc, Shuu, Shuushoku, hỗ trợ việc làm, tìm việc tại nhật bản, tìm việc tại japan' },
      { name: 'robots', content: 'noodp,index,follow' },
      { name: 'revisit-after', content: '1 days' },
      { 'http-equiv': 'content-language', content: 'vi, ja' },
      { property: 'og:title', content: 'Route4u' },
      { property: 'og:description', content: '' },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: process.env.USER_URL },
      { property: 'og:image', content: process.env.USER_URL+'/anh-bia-shuunavi.jpg' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=M+PLUS+1p'}
    ],
    script: [
      { src: "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js", type: "text/javascript"},
      { src: "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js", type: "text/javascript"},
      { src: "/jquery.japan-map.min.js", type: "text/javascript"}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/styles/style.scss',
    'element-ui/lib/theme-chalk/index.css',
    'video.js/dist/video-js.css',
    'videojs-markers/dist/videojs.markers.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/vee-validate.js', ssr: false},
    '~/plugins/api',
    '~/plugins/repositories',
    '~/plugins/handle-response.js',
    '~/plugins/main.js',
    {src: '~/plugins/vuelidate'},
    { src: "~/plugins/customer-fb-chat.js", mode: false},
    '@/plugins/element-ui',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv',
    '@nuxtjs/auth',
    '@nuxtjs/moment',
    '@nuxtjs/toast',
  ],

  toast: {
    position: 'top-right',
    duration: 3000,
    register: [
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },

  i18n: {
    locales: ['vi', 'ja'],
    defaultLocale: 'vi',
    vueI18n: {
      fallbackLocale: 'vi',
      messages: {
        'vi': require('./locales/vi.json'),
        'ja': require('./locales/ja.json'),
      }
    }
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'access_token' // property of token in JSON data of API login
          },
          tokenRequired: false,
          // logout: {
          //   url: '/users/logout',
          //   method: 'post'
          // },
          user: {
            url: 'users/me',
            method: 'get',
            propertyName: false
          },
        }
      },
      facebook: {
        endpoints: {
          userInfo: 'https://graph.facebook.com/v6.0/me?fields=id,name,picture{url}'
        },
        clientId: process.env.FACEBOOK_CLIENT_ID,
        scope: ['public_profile', 'email']
      },
      watchLoggedIn: true,
      redirect: {
        login: '/login',
        logout: '/',
        callback: '/login',
        home: '/'
      },
      token: {
        prefix: '_token.',
        global: true,
      }
    }
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL,
    proxyHeaders: false,
    credentials: false,
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.API_URL
    }
  },

  // moment nuxtjs
  moment: {
    defaultLocale: 'ja',
    locales: ['ja'],
    defaultTimezone: 'Asia/Tokyo',
    timezone: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    standalone: true,
    extend(config, { isDev, isClient }) {
      config.resolve.alias.vue = "vue/dist/vue.common";
      // Sets webpack's mode to development if `isDev` is true.
      if (isDev) {
        config.mode = 'development'
      }
    }
  }
}
