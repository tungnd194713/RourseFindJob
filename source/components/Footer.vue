<template>
  <footer class="user-footer" :class="{ 'font-change' : $i18n.locale === 'vi' }">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-3 mb-3 text-center text-lg-start">
          <NuxtLink :to="localePath('/', $nuxt.$i18n.locale)">
            <img
              src="../assets/images/logo_footer.svg"
              alt=""
              class="footer-logo"
            />
          </NuxtLink>
        </div>
        <div class="col-6 col-lg-3 mb-2">
          <h5 class="fw-bold text-yell">{{ $t('general.aboutUs') }}</h5>
          <div class="my-2 my-lg-3 line-title"></div>
          <ul class="nav flex-column">
            <li class="nav-item mb-1">
              <NuxtLink :to="localePath('/', $nuxt.$i18n.locale)" class="nav-link p-0">{{ $t('general.homepage') }}</NuxtLink>
            </li>
            <li class="nav-item mb-1">
              <NuxtLink :to="localePath('/jobs', $nuxt.$i18n.locale)" class="nav-link p-0">{{ $t('general.listJob') }}</NuxtLink>
            </li>
            <li class="nav-item mb-1">
              <NuxtLink :to="localePath('/contact-form', $nuxt.$i18n.locale)" class="nav-link p-0">{{ $t('general.contact') }}</NuxtLink>
            </li>
            <li class="nav-item mb-1">
              <NuxtLink :to="localePath('/faq', $nuxt.$i18n.locale)" class="nav-link p-0">{{ $t('general.qa') }}</NuxtLink>
            </li>
          </ul>
        </div>
        <div class="col-6 col-lg-3 mb-2">
          <h5 class="fw-bold text-yell">{{ $t('general.rules') }}</h5>
          <div class="my-2 my-lg-3 line-title"></div>
          <ul class="nav flex-column">
            <li class="nav-item mb-1">
              <NuxtLink :to="localePath('/term-use', $nuxt.$i18n.locale)" class="nav-link p-0">{{ $t('general.terms') }}</NuxtLink>
            </li>
            <li class="nav-item mb-1">
              <NuxtLink :to="localePath('/privacy-policy', $nuxt.$i18n.locale)" class="nav-link p-0">{{ $t('general.policy') }}</NuxtLink>
            </li>
          </ul>
        </div>
        <div class="col-12 col-lg-3">
          <h5 class="fw-bold text-yell">{{ $t('general.social') }}</h5>
          <div class="my-2 my-lg-3 line-title"></div>
         <div class="code-fb overflow-auto">
            <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FShuu-Navi-101044019300839&tabs&width=300&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
              width="300"
              height="130"
              style="border:none;overflow:hidden"
              scrolling="no"
              frameborder="0"
              allowfullscreen="true"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
          </div>
          <div class="footer-icon-social">
            <a @click="showPopupFB()">
              <img
                class="fs-2 me-3"
                src="../assets/images/users/icon_facebook_footer.svg"
                alt=""
              />
            </a>
            <a href="https://www.instagram.com/shuu_navi/" target="_blank">
              <img
                class="fs-2 me-3"
                src="../assets/images/users/icon_instagram_footer.svg"
                alt=""
              />
            </a>
            <!-- <img
              class="fs-2"
              src="../assets/images/users/ic_tiktok.svg"
              alt=""
              style="height: 30px"
            /> -->
          </div>
        </div>
      </div>
    </div>
    <div
      class="d-flex justify-content-center align-items-center footer-copyright"
    >
      Copyright @
      &nbsp;
      <NuxtLink :to="localePath('/', $nuxt.$i18n.locale)"
        style="text-decoration: none; color: inherit;"
      >
        Shuu-navi.com
      </NuxtLink>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      user_url: process.env.USER_URL
    }
  },
  methods: {
    showPopupFB() {
      const url = 'https://www.facebook.com/sharer/sharer.php?u=' + this.user_url + this.localePath('/', this.$nuxt.$i18n.locale)
      window.open(url,'popup','width=600,height=600');
      return false;
    }
  },
  computed: {
    ...mapGetters(['loggedInUser', 'isAuthenticated']),
  },
}
</script>
<style lang="scss">
@import '../styles/layout/_footer.scss';
</style>
