<template>
  <div
    class="text-center form-body"
    :class="{
      'font-vi': $i18n.locale === 'vi',
      'font-ja': $i18n.locale === 'ja'
    }"
  >
    <div v-show="hidePage" class="maintain">
      <div class="loader"></div>
    </div>
    <main class="p-2 p-lg-0 form-login">
      <form @submit.prevent="forgotPassword">
        <img
          class="background"
          src="../assets/images/users/bg-homepage.jpg"
          alt=""
        />
        <div class="logo">
          <NuxtLink :to="localePath('/', $i18n.locale)"><img src="../assets/images/logo.svg" alt="" class="logo-unauth" /></NuxtLink>
        </div>
        <div class="form_forgot">
          <div class="text-content d-flex justify-content-center">
            {{ $t('general.forgot_password') }}
          </div>
          <div class="textforgot">
            {{ $t('forgot_password_page.note2') }}
          </div>
          <div class="m-auto">
            <img
              class="email-green"
              src="../assets/images/users/ic_mail_green.svg"
              alt=""
            />
            <div v-if="message" class="alert alert-success" role="alert" style="padding: 0.5rem 1rem;">
              {{ $t(message) }}
            </div>
            <div v-if="error" class="alert alert-danger" role="alert" style="padding: 0.5rem 1rem;">
              {{ $t(error) }}
            </div>
          </div>
          <div class="email">
            <div class="text-email d-flex">
              {{ $t('general.mail') }}
              <p>*</p>
            </div>
            <img
              class="mail-icon"
              src="../assets/images/users/icon_email.svg"
              alt=""
            />
            <div class="line"></div>
            <input
              id="email"
              v-model="$v.email.$model"
              class="input-email"
              aria-describedby="emailHelp"
              maxlength="50"
              @keydown.enter.prevent="forgotPassword"
            />
          </div>
          <div v-if="$v.email.$error">
            <div v-if="!$v.email.required" class="error">
              {{ $t('error_text.required') }}
            </div>
            <div v-if="!$v.email.email" class="error">
              {{ $t('error_text.is_not_email_format') }}
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <NuxtLink class="goBack" :to="localePath('/login', $i18n.locale)">{{ $t('general.back') }}</NuxtLink>
            <button type="submit" class="send" @click="showLoader()">{{ $t('general.send') }}</button>
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'ForgotPassword',
  mixins: [validationMixin],
    layout: 'external',
  middleware: ['redirectToHomeIfIsAuthenticated'],

  data() {
    return {
      email: '',
      message: '',
      error: '',
      allowTime: '',
      prEmail: '',
      hidePage: false,
    }
  },

  validations: {
    email: {
      required,
      email,
    },
  },

  head() {
    return { title: `${ this.$t('general.forgot_password') }` }
  },

  methods: {
    async forgotPassword() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        if (this.prEmail !== this.email) {
          try {
            await this.$repositories.accounts
            .forgotPassword({
              email: this.email,
            })
            .then((res) => {
              const data = this.$handleResponse(res)
              if (data.message) {
                this.$toast.success(this.$t(data.message))
              }
              this.error = data.errorMsg
              this.prEmail = this.email
              this.allowTime = this.$moment().add(2, 'm')
              this.getMessage(this.error)
              this.hidePage = false
            })
          } catch (e) {
            this.message = ''
            this.error = e.response.data.message
          }
        }
        else {
          if (this.$moment() <= this.allowTime) {
            this.error = 'error_text.please_wait_try_again'
          }
          if (this.$moment() > this.allowTime) {
            try {
            await this.$repositories.accounts
            .forgotPassword({
              email: this.email,
            })
            .then((res) => {
              const data = this.$handleResponse(res)
              if (data.message) {
                this.$toast.success(this.$t(data.message))
              }
              this.error = data.errorMsg
              this.prEmail = this.email
              this.allowTime = this.$moment()
              this.getMessage(this.error)
              this.hidePage = false
            })
            } catch (e) {
              this.message = ''
              this.error = e.response.data.message
            }
          }
        }
      }
    },
    getMessage(message) {
      if (message === 'The given data was invalid.') {
        this.error = 'error_text.please_wait_try_again'
      }
    },
    showLoader(){
      if(this.$v.email.required && this.$v.email.email){
        this.hidePage = true;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/pages/users/forgot-password.scss';
</style>
