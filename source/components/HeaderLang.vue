<template>
  <div>
    <header :key="key" ref="general" class="text-white user-header" :class="{ 'font-change' : $i18n.locale === 'vi' }">
      <div class="container">
        <!--phần này khi đã login-->
        <div v-if="isAuthenticated" class="row flex-nowrap justify-content-between align-items-center">
          <div class="col-4">

          </div>
          <div class="col-8 d-flex justify-content-end align-items-center">
            <select v-model="lang" class="langChange" @change="switchLocale()">
              <option value="vi" :selected="lang === 'vi'">
                Tiếng Việt (VI)
              </option>
              <option value="ja" :selected="lang === 'ja'">
                日本語 (JA)
              </option>
            </select>
          </div>
        </div>
        <!--phần chưa login-->
        <div v-if="!isAuthenticated" class="row justify-content-between align-items-center pt-1 pt-lg-2">
            <div class="col-12 col-sm-4 col-lg-4 pt-1">

            </div>
            <div class="col-12 col-sm-8 col-lg-8 d-flex flex-wrap flex-sm-wrap flex-md-nowrap justify-content-center justify-content-sm-end justify-content-end header-right" :class="{ shirnk: $i18n.locale === 'vi' }">

                <select v-model="lang" class="langChange" @change="switchLocale()">
                  <option value="vi" :selected="lang === 'vi'">
                    Tiếng Việt (VI)
                  </option>
                  <option value="ja" :selected="lang === 'ja'">
                    日本語 (JA)
                  </option>
                </select>
            </div>
        </div>
      </div>
    </header>

    <button
      ref="showPopUpAlertBtn"
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#popUpBlert"
      class="d-none"
    />
    <LoginRedirection
      :status-blert="status_blert"
      :return-to="return_to"
    />
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import routers from '~/constants/routers'
import 'bootstrap/dist/css/bootstrap.css'
import LoginRedirection from "~/components/modal/LoginRedirection"

export default {
  components: {
    LoginRedirection
  },
  data() {
    return {
      routers,
      url_file: process.env.URL_FILE,
      url_company: process.env.COMPANY_SITE_URL,
      dropdownShow: false,
      status_blert: 0,
      return_to: undefined,
      lang: this.$nuxt.$i18n.locale,
      key: 1
    }
  },
  computed: {
    ...mapGetters(['loggedInUser', 'isAuthenticated']),
  },
  watch: {
    $route (to, from){
        // this.lang = 'vi'
    },

    '$i18n.locale': {
      handler(newVal, oldVal) {
        this.lang = newVal
      },
      deep: true
    }
  },

  created() {
    // if (this.$nuxt.$route.path.slice(0, 4) === '/ja/' || this.$nuxt.$route.path.slice(0, 4) === '/ja') {
    //   this.lang = 'ja'
    // }
    this.lang = this.$i18n.locale
  },

  mounted() {
    // eslint-disable-next-line prefer-const
    let self = this
    // eslint-disable-next-line no-undef
    $(document).on('click', '#bridge', function() {
      if (self.dropdownShow === false) {
        // eslint-disable-next-line no-undef
        $('#dropdownUser1').trigger('click')
        self.dropdownShow = true
        // eslint-disable-next-line no-useless-return
        return
      }
      if (self.dropdownShow === true) {
        // eslint-disable-next-line no-undef
        $('h3').trigger('click')
        self.dropdownShow = false
        // eslint-disable-next-line no-useless-return
        return
      }
    })
  },
  methods: {
    loginRedirect(route) {
      const returnTo = this.localePath(route, this.$i18n.locale)
      if (!this.isAuthenticated) {
        this.status_blert = 4
        this.return_to = returnTo
        this.$refs.showPopUpAlertBtn.click()
      }
      else {
        this.$router.push(returnTo)
      }
    },
      switchLocale() {
          if (this.$i18n.locale === 'ja') {
              this.$i18n.locale = 'vi'
              this.lang = 'vi'
          }
          else if (this.$i18n.locale === 'vi') {
              this.$i18n.locale = 'ja'
              this.lang = 'ja'
          }
          // this.$router.replace({ path: this.localePath(this.$route.path, this.$i18n.locale) })
          const q = {}
          if (this.$route.query.email) {
              q.email = this.$route.query.email
          }
          if (this.$route.query.name) {
              q.name = this.$route.query.name
          }
          if (this.$route.query.id) {
              q.id = this.$route.query.id
          }
          if (this.$route.query.error) {
              q.error = this.$route.query.error
          }
          if (this.$route.query.verify) {
              q.verify = this.$route.query.verify
          }
          if (this.$route.query.token) {
              q.token = this.$route.query.token
          }
          history.replaceState(
              {},
              null,
              this.localePath(
                  {
                      path: this.$route.path,
                      query: q
                  },
                  this.$i18n.locale
              )
          )
      }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/layout/_header.scss';
</style>
