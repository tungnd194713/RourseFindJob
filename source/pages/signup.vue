<template>
  <form class="signup-body"
        :class="{
            'font-vi': $i18n.locale === 'vi',
            'font-ja': $i18n.locale === 'ja'
          }"
        @submit.prevent="signup">
    <div v-show="hidePage" class="maintain">
      <div class="loader"></div>
    </div>
    <img class="background" src="../assets/images/bg-homepage.jpg" alt="">
    <div class="logo">
        <NuxtLink :to="localePath('/', $i18n.locale)"><img src="../assets/images/logo.svg" alt="" class="logo-unauth"></NuxtLink>
    </div>
    <div class="form_signup" :class="{ extraLong: error }">
        <div class="text-content d-flex justify-content-center title_form_signup">
            {{ $t('general.signup') }}
        </div>
        <div v-if="error && errorShow" class="alert alert-danger mt-3 text-center" role="alert">
            {{ $t(error) }}
        </div>

            <div>
              <div class="firstname">
                <div class="text">{{ $t('signup_page.username') }}
                  <p>*</p>
                </div>
                <img src="../assets/images/ic_user.svg" alt="">
                <div class="lineFillName"></div>
                <input v-model="user.name"
                       type="text" class="input-firstName"
                       @input="$v.user.name.$touch()"
                       @blur="$v.user.name.$touch()">
              </div>
              <div v-if="$v.user.name.$error" class="errorContain">
                  <div v-if="!$v.user.name.required" class="errorMsg someMore">
                      {{ $t('error_text.required') }}
                  </div>
                  <div v-if="!$v.user.name.maxLength" class="errorMsg someMore">
                      {{ $t('error_text.less_than_50_characters') }}
                  </div>
              </div>
            </div>
        <div>
          <div class="email">
            <div class="text-email">{{ $t('login_page.mail') }}<p>*</p></div>
            <img class="ic_mail" src="../assets/images/ic_mail.svg"  alt="">
            <div class="line"></div>
            <input v-model.trim="user.email"
                   type="email" class="input-email"
                   @input="emailTouch"
                   @blur="$v.user.email.$touch()"
                   @keydown.enter.prevent="signup"
            >
          </div>
          <div v-if="$v.user.email.$error" class="errorContain">
            <div v-if="!$v.user.email.required" class="errorMsg someMore">
                {{ $t('error_text.required') }}
            </div>
            <div v-if="!$v.user.email.email" class="errorMsg someMore">
                {{ $t('error_text.is_not_email_format') }}
            </div>
          </div>
        </div>
        <div>
          <div class="password">
            <div class="text-password">{{ $t('login_page.password') }}<p>*</p></div>
            <img  class="ic_lock" src="../assets/images/ic_lock.svg"  alt="">
            <div class="line"></div>
            <input v-model.trim="user.password"
                   :type="isHide ? 'password' : 'text'"
                   class="input-password"
                   @input="$v.user.password.$touch()"
                   @blur="$v.user.password.$touch()"
                   @keydown.enter.prevent="signup"
            >
            <img
              v-if="isHide"
              class="ic_eyes"
              src="../assets/images/ic_eyes.svg"
              alt=""
              @click="showPassword()"
            >
            <img
              v-else
              class="ic_eyes"
              src="../assets/images/ic_eyes_show.svg"
              alt=""
              @click="showPassword()"
            >
          </div>
          <div v-if="$v.user.password.$error" class="errorContain">
            <div v-if="!$v.user.password.required" class="errorMsg someMore">
                {{ $t('error_text.required') }}
            </div>
            <div v-if="!$v.user.password.minLength || !$v.user.password.maxLength" class="errorMsg someMore">
                {{ $t('error_text.is_not_password_format') }}
            </div>
          </div>
        </div>

        <div class="agree d-flex align-middle">
            <input v-model="acceptTerms"
                   type="checkbox"
                   value="0"
                   @input="$v.acceptTerms.$touch()"
                   @blur="$v.acceptTerms.$touch()">
          <span v-if="$i18n.locale === 'vi'" class="align-middle">{{ $t('general.toi_dong_y_voi') }}&nbsp;<NuxtLink :to="localePath('/term-use', $i18n.locale)">{{ $t('general.terms') }}</NuxtLink>&nbsp;{{ $t('general.and') }}&nbsp;<NuxtLink :to="localePath('/privacy-policy', $i18n.locale)">{{ $t('general.policy') }}</NuxtLink></span>
          <span v-else class="align-middle"><NuxtLink :to="localePath('/term-use', $i18n.locale)">{{ $t('general.terms') }}</NuxtLink>&nbsp;{{ $t('general.and') }}&nbsp;<NuxtLink :to="localePath('/privacy-policy', $i18n.locale)">{{ $t('general.policy') }}</NuxtLink>&nbsp;{{ $t('general.toi_dong_y_voi') }}</span>
        </div>
        <div v-if="$v.acceptTerms.$error" class="errorContain">
          <div class="errorMsg someMore towLine">
              {{ $t('error_text.check_term_user_privacy_policy') }}
          </div>
        </div>
        <div class="signCon">
            <div
              id="btn_login"
              class="btn fw-bold my-3 my-lg-4 rounded-pill"
              @click="goBack"
            >
                {{ $t('general.back') }}
            </div>
            <button class="signup" type="submit" @click="hidePage = true">{{ $t('signup_page.signup') }}</button>
        </div>
    </div>
  </form>
</template>
<script>
  import { mapGetters } from 'vuex'
  import {validationMixin} from 'vuelidate'
  import {required, email, maxLength, minLength} from 'vuelidate/lib/validators'

export default {
    name: "SignUp",

    mixins: [validationMixin],
    layout: 'external',
    middleware: ['redirectToHomeIfIsAuthenticated'],

    data() {
      return {
        user: {
          name: '',
          email: '',
          password: ''
        },
        acceptTerms: 0,
        errors: [],
        messages: '',
        isHide: true,
        status: '',
        error: '',
        errorShow: true,
        hidePage: false
      }
    },

    head () {
      return { title: `${ this.$t('general.signup') }` }
    },

    validations: {
      user: {
        name: {
          required,
          maxLength: maxLength(50),
        },
        email: {
          required,
          email,
        },
        password: {
          required,
          minLength: minLength(6),
          maxLength: maxLength(32),
        },
      },
      acceptTerms: {
        checked: value => value === true
      }
    },

    computed: {
      ...mapGetters(['loggedInUser', 'isAuthenticated']),
    },

  created() {
      // if (this.isAuthenticated) {
      //   this.$router.push('/')
      // }
    if (this.$nuxt?.context?.from?.path) localStorage.setItem('previousPath', this.$nuxt.context.from.path)
  },

  methods: {
      async signup() {
        this.$v.user.$touch()
        this.$v.acceptTerms.$touch()

        if (!this.$v.$invalid && this.acceptTerms === true) {
          try {
            await this.$repositories.accounts.signUp(this.user)
            .then((res) => {
                if (res.status === 200) {
                  this.$toast.success(this.$t('signup_page.success'))
                  this.user = {}
                  this.acceptTerms = 0
                  this.$v.user.$reset()
                  this.$v.acceptTerms.$reset()
                }
                else {
                  this.errorShow = true
                  const data = this.$handleResponse(res)
                  this.error = data.errors.email[0]
                }
            });
          }
          catch (e) {
            this.errors = e.errors
          }
        }
        this.hidePage = false
      },

      showPassword() {
        this.isHide = !this.isHide
      },

      goBack() {
        this.$router.push(this.localePath(localStorage.getItem('previousPath'), this.$i18n.locale))
        localStorage.removeItem('previousPath')
      },
      emailTouch() {
        this.$v.user.email.$touch()
        this.errorShow = false
      }
    }
}
</script>

<style lang="scss" scoped>
@import "../styles/pages/auth/register.scss";
</style>
