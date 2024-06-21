<template>
  <div class="text-center form-body"
       :class="{
            'font-vi': $i18n.locale === 'vi',
            'font-ja': $i18n.locale === 'ja'
          }"
  >
    <main class="p-2 p-lg-0 form-login">
      <form @submit.prevent="sendVerifyMail">
        <img
          class="background"
          src="../assets/images/users/bg-homepage.jpg"
          alt=""
        />
        <div class="logo">
          <NuxtLink :to="localePath('/', $i18n.locale)"><img src="../assets/images/logo.svg" alt="" class="logo-unauth" /></NuxtLink>
        </div>
        <div class="form_forgot">
          <div class="text-content w-100 d-flex justify-content-center">
            {{ $t('general.verify') }}
          </div>
          <div class="textforgot">
            {{ $t('verify.note') }}
          </div>
          <div class="m-auto">
            <img
              class="email-green"
              src="../assets/images/users/ic_mail_green.svg"
              alt=""
            />
<!--            <div v-if="message" class="alert alert-success" role="alert">-->
<!--              {{ message }}-->
<!--            </div>-->
<!--            <div v-if="error" class="alert alert-danger" role="alert">-->
<!--              {{ error }}-->
<!--            </div>-->
          </div>
          <div class="email">
            <div class="text-email d-flex">
              {{ $t('login_page.mail') }}
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
              @keydown.enter.prevent="sendVerifyMail"
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
          <div class="submit-btn d-flex justify-content-center">
            <button type="submit" class="send">{{ $t('general.send') }}</button>
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css';
  import {validationMixin} from 'vuelidate'
  import {required, email} from 'vuelidate/lib/validators'

  export default {
    name: "ResendVerifyMail",
    mixins: [validationMixin],
      layout: 'external',
    middleware: ['redirectToHomeIfIsAuthenticated'],

    data() {
      return {
        email: '',
        message: '',
        error: '',
          verifyText: this.$route.query.error ? this.$route.query.error : null,
      }
    },

    validations: {
      email: {
        required,
        email,
      }
    },

    head() {
      return {title: `${ this.$t('general.verify') }`}
    },

    watch: {
      email (value) {
        if (!value) {
          this.message = ''
          this.error = ''
        }
      }
    },

      mounted() {
          this.showToast();
      },

    methods: {
      async sendVerifyMail() {
        this.$v.$touch();
        if (!this.$v.$invalid) {
          try {
            await this.$repositories.accounts.sendVerification({
              email: this.email
            })
              .then((res) => {
                const data = this.$handleResponse(res);
                this.message = data.message;
                this.error = data.errorMsg;
                this.getMessage(this.error);
                this.getMessage(this.message);
                if (res.status === 200) {
                  if (res.data.errors !== 400 && res.data.errors !== 403 && !this.error) {
                    this.$toast.info(this.$t(this.message))
                  } else if (res.data.errors === 403) {
                    this.$toast.success(this.$t(res.data.message))
                  } else {
                    this.$toast.error(this.$t(res.data.message))
                  }
                }
                else {
                  this.$toast.error(this.$t(this.error))
                }
              });
          } catch (e) {
            this.message = '';
            this.error = e.response.data.message;
          }
        }
      },

      getMessage(message) {
        if (message === 'The given data was invalid.') {
          this.error = 'error_text.please_wait_try_again'
        }
        if (message === 'Too Many Attempts.') {
          this.error = 'error_text.please_wait_try_again'
        }
      },

        showToast(){
            if (this.verifyText)
                this.$toast.error(this.$t(this.verifyText))
        }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/pages/users/verify.scss';
</style>
