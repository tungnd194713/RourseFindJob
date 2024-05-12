<template>
    <div class="form-body font-vi"
         :class="{
            'font-vi': $i18n.locale === 'vi',
            'font-ja': $i18n.locale === 'ja'
          }"
    >
      <img class="background " src="../assets/images/bg-homepage.jpeg" alt="">
      <div class="logo">
        <NuxtLink :to="localePath('/', $i18n.locale)"><img src="../assets/images/logo.svg" alt="" class="logo-unauth"></NuxtLink>
      </div>
      <form class="form_login" @submit.prevent="login">
        <div class="text-content d-flex justify-content-center">
          {{ $t('general.login') }}
        </div>

        <a class="text-decoration-none login-fb d-flex cursor-pointer" @click="loginWithFacebook">
          <div class="logo-fb">
            <img src="../assets/images/ic_fb.svg" alt="" width="10" height="19">
          </div>
          {{ $i18n.locale === 'vi' ? $t('login_page.login_with') : '' }}
          <p>{{ $t('login_page.facebook') }}</p>
          {{ $i18n.locale === 'ja' ? $t('login_page.login_with') : '' }}
        </a>

        <div v-if="error" class="alert alert-danger text-center" :class="{
            'font-vi': $i18n.locale === 'vi',
            'font-ja': $i18n.locale === 'ja'
          }" role="alert">
          {{ $t(error) }}
        </div>

        <div v-if="errors.unauthenticate && errorShow" class="alert alert-danger text-center" :class="{
            'font-vi': $i18n.locale === 'vi',
            'font-ja': $i18n.locale === 'ja'
          }" role="alert">
          {{$t(errors.unauthenticate)}}
        </div>

        <div class="form-group">
          <div class="email">
            <div class="text-email">{{ $t('login_page.mail') }} <span class="text-danger">*</span></div>
            <img src="../assets/images/ic_mail.svg"  alt="">
            <div class="line"></div>
            <input
              v-model.trim="$v.data.email.$model"
              class="input-email"
              :class="{'invalid': $v.data.email.$invalid && $v.data.email.$dirty}"
              maxlength="50"
              @change="clearErrors"
              @input="errorShow = false"
              @keydown.enter.prevent="login"
            >
          </div>
          <div v-if="$v.data.email.$error">
            <div v-if="!$v.data.email.required" class="error">{{ $t('error_text.required') }}</div>
            <div v-if="!$v.data.email.email" class="error">{{ $t('error_text.is_not_email_format') }}</div>
          </div>
        </div>

        <div class="form-group">
          <div class="password">
            <div class="text-password">{{ $t('login_page.password') }} <span class="text-danger">*</span></div>
            <img  class="ic_lock" src="../assets/images/ic_lock.svg"  alt="">
            <div class="line"></div>
            <img
              v-if="isHide"
              class="ic_eyes"
              src="../assets/images/ic_eyes.svg"
              alt=""
              @click="showPassword"
            >
            <img
              v-else
              class="ic_eyes"
              src="../assets/images/ic_eyes_show.svg"
              alt=""
              @click="showPassword"
            >
            <input
              id="password"
              v-model.trim="$v.data.password.$model"
              class="input-password"
              :class="{'invalid': $v.data.password.$invalid && $v.data.password.$dirty}"
              maxlength="32"
              :type="isHide ? 'password' : 'text'"
              @change="clearErrors"
              @input="errorShow = false"
              @keydown.enter.prevent="login"
            >
          </div>
          <div class="d-flex flex-row">
              <div class="col-11">
                <div v-if="$v.data.password.$error" >
                  <div v-if="!$v.data.password.required" class="error">{{ $t('error_text.required') }}</div>
                  <div v-if="!$v.data.password.minLength" class="error">{{ $t('error_text.is_not_password_format') }}</div>
                </div>
              </div>
            </div>
          <div class="d-flex flex-row">
            <div class="forgot-pass col-11 ml-auto" :class="{ 'ma-32': $v.data.email.$error}">
              <NuxtLink :to="localePath('/forgot-password', $i18n.locale)">{{ $t('login_page.forgot_pasword') }}</NuxtLink>
            </div>
          </div>
        </div>
        <div>
          <button class="login" @click="errorShow = true">{{ $t('general.login') }}</button>
        </div>
        <div class="register">
          <ul class="d-flex list-link">
            <li>
              <NuxtLink :to="localePath('/can-not-login', $i18n.locale)" class="text-decoration-none"
              >{{ $t('login_page.can_not_login') }}</NuxtLink>
            </li>
            <div class="dot-link">•</div>
            <li>
              <NuxtLink class="text-decoration-none" :to="localePath('/signup', $i18n.locale)">{{ $t('login_page.not_have_account') }}</NuxtLink>
            </li>
          </ul>
        </div>
      </form>
    </div>
</template>

<script>
  import {validationMixin} from 'vuelidate'
  import {
    required,
     email,
     minLength
  } from 'vuelidate/lib/validators'

  export default {
    name: "Login",
    mixins: [validationMixin],
      layout: 'external',
    middleware: ['redirectToHomeIfIsAuthenticated'],

    data () {
      return {
        data: {
          email: '',
          password: ''
        },
        errors: [],
        error: this.$route.query.error ? this.$route.query.error : null,
        verifyText: this.$route.query.verify ? this.$route.query.verify : null,
        isHide: true,
        prevPage: null,
        errorShow: true
      }
    },

    head () {
      return { title: `${ this.$t('general.login') }` }
    },

    validations: {
      data: {
        email: {
          required,
           email,
        },
        password: {
          required,
           minLength: minLength(6),
        }
      }
    },

      mounted() {
          this.showToast();
      },

    methods: {
      clearErrors() {
        this.errors = ''
      },

      resetData() {
        this.$v.$reset();
        this.data.email = '';
        this.data.password = '';
      },

      async login() {
        this.$v.data.$touch();
        if (!this.$v.data.$invalid) {
          try {
            await this.$auth.loginWith('local', {
              data: {
                email: this.data.email,
                password: this.data.password,
                role: 'user',
              }
            }).then((res) => {
              if (res.status === 200) {
                if (!this.$route.query.return_to) {
                  this.$router.push(this.localePath('/', this.$i18n.locale))
                }
                if (this.$route.query.return_to === '/' || this.$route.query.return_to === '/ja') {
                  this.$router.push(this.localePath('/', this.$i18n.locale))
                }

                if (this.$route.query.return_to) {
                  this.$router.push(`${this.$route.query.return_to}`)
                }
              }
              const data = this.$handleResponse(res);
              this.errors = data.errors;
              this.resetData();
            });
          } catch (e) {
            this.errors = e.response.data.errors;
          }
        }
      },

      loginWithFacebook() {
        window.location.href = `${process.env.API_URL}/users/login/facebook`
      },

      showPassword() {
        this.isHide = !this.isHide
      },

        showToast(){
          if (this.verifyText)
            this.$toast.success(this.$t(this.verifyText))
        }
    }
  }
</script>

<style lang="scss" scoped>
@import "../styles/pages/auth/login.scss";
</style>
