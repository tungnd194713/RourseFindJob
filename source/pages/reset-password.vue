<template>
  <div class="text-center form-body">
    <main class="p-2 p-lg-0 form-login">
      <form @submit.prevent="resetPassword">
        <img
          class="background"
          src="../assets/images/users/bg-homepage.jpg"
          alt=""
        />
        <div class="logo">
          <NuxtLink :to="localePath('/', $i18n.locale)"><img src="../assets/images/logo.svg" alt="" class="logo-unauth" /></NuxtLink>
        </div>
        <div class="container">
          <div class="row">
            <div class="form_changePW">
              <div
                class="text-content d-flex justify-content-center heading-form-reset-password"
              >
                {{ $t('general.reset_password') }}
              </div>

              <div class="email">
                <div class="text-password d-flex">
                  {{ $t('login_page.password') }}
                  <p>*</p>
                </div>
                <img
                  class="ic_lock"
                  src="../assets/images/users/ic_lock.svg"
                  alt=""
                />
                <div class="line"></div>
                <input
                  id="password"
                  v-model="password"
                  :type="isHidePassword ? 'password' : 'text'"
                  class="input-password"
                  maxlength="32"
                  @input="$v.password.$touch()"
                  @blur="$v.password.$touch()"
                  @keydown.enter.prevent="resetPassword"
                />
                <img
                  v-if="isHidePassword"
                  class="ic_eyes"
                  src="../assets/images/users/ic_eyes.svg"
                  alt=""
                  @click="showPassword()"
                />
                <img
                  v-else
                  class="ic_eyes"
                  src="../assets/images/ic_eyes_show.svg"
                  alt=""
                  @click="showPassword()"
                />
              </div>
              <div v-if="$v.password.$error">
                <div v-if="!$v.password.required" class="error">
                  {{ $t('error_text.required') }}
                </div>
                <div v-if="!$v.password.minLength || !$v.password.maxLength" class="error">
                  {{ $t('error_text.is_not_password_format') }}
                </div>
              </div>
              <div class="password">
                <div class="text-password d-flex">
                  {{ $t('reset_password.confirm_password') }}
                  <p>*</p>
                </div>
                <img
                  class="ic_lock"
                  src="../assets/images/users/ic_lock.svg"
                  alt=""
                />
                <div class="line"></div>
                <input
                  id="passwordConfirm"
                  v-model.trim="$v.password_confirm.$model"
                  :type="isHideConfirmPassword ? 'password' : 'text'"
                  class="input-password"
                  @input="$v.password_confirm.$touch()"
                  @blur="$v.password_confirm.$touch()"
                  @keydown.enter.prevent="resetPassword"
                />
                <img
                  v-if="isHideConfirmPassword"
                  class="ic_eyes"
                  src="../assets/images/users/ic_eyes.svg"
                  alt=""
                  @click="showConfirmPassword()"
                />
                <img
                  v-else
                  class="ic_eyes"
                  src="../assets/images/ic_eyes_show.svg"
                  alt=""
                  @click="showConfirmPassword()"
                />
              </div>
              <div v-if="$v.password_confirm.$error">
                <div v-if="!$v.password_confirm.required" class="error">
                  {{ $t('error_text.required') }}
                </div>
                <div v-if="!$v.password_confirm.sameAsPassword && $v.password_confirm.required" class="error">
                  {{ $t('reset_password.confirm_password_does_not_match') }}
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <button type="submit" class="confirm">{{ $t('reset_password.confirm') }}</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, sameAs, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
  name: 'ResetPassword',
  mixins: [validationMixin],
    layout: 'external',
  middleware: ['redirectToHomeIfIsAuthenticated'],

  data() {
    return {
      email: this.$route.query.email ?? '',
      token: this.$route.query.token ?? '',
      password: '',
      password_confirm: '',
      isHidePassword: true,
      isHideConfirmPassword: true,
    }
  },

  validations: {
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(32)
    },
    password_confirm: {
      required,
      sameAsPassword: sameAs('password'),
    },
  },

  head() {
    return { title: `${ this.$t('general.reset_password') }` }
  },

  methods: {
    async resetPassword() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        try {
          await this.$repositories.accounts
            .resetPassword({
              email: this.email,
              token: this.token,
              password: this.password,
            })
            .then((res) => {
              if (res.status === 200) {
                this.$toast.success(this.$t('reset_password.success'))
                this.$router.push(this.localePath('/login', this.$i18n.locale));
              }
            })
        } catch (e) {
          this.message = '';
          this.error = e.response.data.message;
        }
      }
    },

    showPassword() {
      this.isHidePassword = !this.isHidePassword
    },

    showConfirmPassword() {
      this.isHideConfirmPassword = !this.isHideConfirmPassword
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../styles/pages/users/forgot-password.scss';
</style>
