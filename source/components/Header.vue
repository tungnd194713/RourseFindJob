<template>
  <div>
    <header :key="key" ref="general" class="text-white user-header" :class="{ 'font-change' : $i18n.locale === 'vi' }">
      <div class="container">
        <!--phần này khi đã login-->
        <div v-if="isAuthenticated" class="row flex-nowrap justify-content-between align-items-center">
          <div class="col-4">
            <NuxtLink class="me-lg-4" :to="localePath('/', $nuxt.$i18n.locale)">
              <h1>TheRoute</h1>
              <!-- <img
                src="../assets/images/logo.svg"
                alt=""
              /> -->
            </NuxtLink>
            <!--<nuxt-link
              class="blog-header-logo text-decoration-none ms-2 ms-lg-5"
              :to="'/jobs'"
              >Danh sách việc làm</nuxt-link
            >-->
            <h3 ref="h3"></h3>
          </div>
          <div class="col-8 d-flex justify-content-end align-items-center">
            <div class="dropdown text-end dropdown-link-acc">
              <button
                id="dropdownUser1"
                ref="dropdown"
                href="#"
                class="d-block text-decoration-none dropdown-toggle user-dropdown-name"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                @click="dropdownShow = !dropdownShow"
              >
              <span class="user-name">{{ loggedInUser.name }}</span>
              </button>
              <ul
                class="dropdown-menu dropdown-menu-end text-small"
                aria-labelledby="dropdownUser1"
              >
                <li class="border-bottom">
                  <NuxtLink
                    class="dropdown-item"
                    :to="localePath('/users/account-management', $i18n.locale)"
                    :class="{ chosen: $route.path == localePath('/users/account-management', $i18n.locale) }"
                  >
                    <img
                      class="user-avat"
                      src="../assets/images/users/ic_avatar.svg"
                    />
                    {{ $t('general.account') }}
                  </NuxtLink>
                </li>
                <li class="border-bottom">
                  <NuxtLink
                    class="dropdown-item"
                    :to="localePath('/users/user-profile', $i18n.locale)"
                    :class="{ chosen: $route.path == localePath('/users/user-profile', $i18n.locale) }"
                  >
                    <img
                      class=""
                      src="../assets/images/users/icon_profile.svg"
                    />
                    {{ $t('general.myProfile') }}
                  </NuxtLink>
                </li>
                <li class="border-bottom">
                  <NuxtLink
                    class="dropdown-item"
                    :to="localePath('/jobs/applied', $i18n.locale)"
                    :class="{ chosen: $route.path == localePath('/jobs/applied', $i18n.locale) }"
                  >
                    <img
                      class=""
                      src="../assets/images/users/icon_apply_job.svg"
                    />
                    {{ $t('general.appliedJobs') }}
                  </NuxtLink>
                </li>
                <li class="border-bottom">
                  <NuxtLink
                    class="dropdown-item"
                    :to="localePath('/educations/', $i18n.locale)"
                    :class="{ chosen: $route.path == localePath('/educations/', $i18n.locale) }">
                    <img
                      class=""
                      src="../assets/images/users/icon_favorite.svg"
                    />
                    Chương trình đào tạo
                  </NuxtLink>
                </li>
                <li>
                  <a class="dropdown-item" @click="logout()">
                    <img
                      class=""
                      src="../assets/images/users/icon_log_out.svg"
                    />
                    {{ $t('general.logout') }}
                  </a>
                </li>
              </ul>
            </div>
            <div class="point-owned" style="margin-right: 16px">{{ loggedInUser.point_owned || 0 }} points</div>
            <img
              v-if="loggedInUser.profile_image"
              id="bridge"
              :src="url_file + loggedInUser.profile_image"
              alt="mdo"
              width="34"
              height="34"
              class="rounded-circle user-avatar"
              style="height: 34px;"
            />
            <img
              v-else
              id="bridge"
              src="../assets/images/users/icon_avatar_orange.svg"
              alt="mdo"
              width="34"
              height="34"
              class="rounded-circle user-avatar"
              style="height: 34px;"
            />
            <!-- <select v-model="lang" class="langChange" @change="switchLocale()">
              <option value="vi" :selected="lang === 'vi'">
                Tiếng Việt (VI)
              </option>
              <option value="ja" :selected="lang === 'ja'">
                日本語 (JA)
              </option>
            </select> -->
          </div>
        </div>
        <!--phần chưa login-->
        <div v-if="!isAuthenticated" class="row justify-content-between align-items-center">
            <div class="col-12 col-sm-4 col-lg-4 pt-1">
                <NuxtLink class="me-lg-4" :to="localePath('/', $nuxt.$i18n.locale)">
                    <img
                      src="../assets/images/logo.svg"
                      alt=""
                    />
                </NuxtLink>
                <!--<NuxtLink class="blog-header-logo text-white text-decoration-none ms-2 ms-lg-5" :to="'/jobs'">
                  {{ $t('general.listJob') }}
                </NuxtLink>-->
            </div>
            <div class="col-12 col-sm-8 col-lg-8 d-flex flex-wrap flex-sm-wrap flex-md-nowrap justify-content-center justify-content-sm-end justify-content-end header-right" :class="{ shirnk: $i18n.locale === 'vi' }">
                <a class="border-end text-white text-decoration-none nah" :href="url_company" target="_blank">{{ $t('general.forCompany') }}</a>
                <NuxtLink class="border-end text-white text-decoration-none nah" :to="localePath('/login', $nuxt.$i18n.locale)">{{ $t('general.login') }}</NuxtLink>
                <NuxtLink
                  class="border-end text-white text-decoration-none nah"
                  :to="localePath('/signup', $nuxt.$i18n.locale)"
                >{{ $t('general.register') }}</NuxtLink>
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
    <div
      v-if="$route.path != '/' && $route.path != '/ja'"
      id="main-menu"
      class="container-fluid justify-content-between align-items-center"
    >
      <div class="row justify-content-between align-items-center">
        <div
          v-for="router in routers"
          :id="router.tab + '-tab'"
          :key="router.tab"
          class="
            col-4
            justify-content-center
            align-items-center
            main-menu-items
          "
        >
          <a
            class="cursor-pointer d-flex align-items-center"
            @click="loginRedirect(router.path)"
          >
            <span class="vertical-align-middle">
              <img
                :src="
                  $nuxt.$route.path === localePath(router.path, 'vi') || $nuxt.$route.path === localePath(router.path, 'ja')
                  ? require(`@/assets/images/users` + router.srcImageActive)
                  : require(`@/assets/images/users` + router.srcImage)
                "
                alt=""
                width="21px"
                height="21px"
              />
            </span>
            <span
              class="nav-router-title vertical-align-middle"
              :class="{
                'nav-router-title-active': $nuxt.$route.path === localePath(router.path, 'vi') || $nuxt.$route.path === localePath(router.path, 'ja')
              }"
            >
              {{ $t(router.localeId) }}
            </span>
          </a>
        </div>
      </div>
    </div>
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
      if (this.$route.query.salary) {
        q.salary = this.$route.query.salary
      }
      if (this.$route.query.status_stay) {
        q.status_stay = this.$route.query.status_stay
      }
      if (this.$route.query.province_id) {
        q.province_id = this.$route.query.province_id
      }
      if (this.$route.query.career) {
        q.career = this.$route.query.career
      }
      if (this.$route.query.region_id) {
        q.region_id = this.$route.query.region_id
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
    },

    async logout() {
      await this.$auth.logout()
      await this.$router.push(this.localePath('/', this.$i18n.locale))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/layout/_header.scss';
</style>
