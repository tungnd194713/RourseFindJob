<template>
  <main class="container-maintain min-height-auto">
    <div class="container">
      <div class="body-container">
        <div class="inner-container">
          <div class="account-title">{{ $t('general.account_info') }}</div>
          <div class="account-container">
            <div class="acc-info">
              <label for="acc-name">{{ $t('general.account_info_label') }}</label>
              <input v-model="items.name" type="text" disabled />
            </div>
            <div class="acc-info acc-info-email">
              <label for="email">{{ $t('general.email') }} <span class="text-danger">*</span></label>
              <input
                v-model.trim="dataUser.new_email"
                type="text"
                name="email"
                maxlength="100"
                class="input"
                :class="{
                    invalid:
                      $v.dataUser.new_email.$invalid &&
                      $v.dataUser.new_email.$dirty,
                  }"
                @input="$v.dataUser.new_email.$touch()"
                @blur="$v.dataUser.new_email.$touch()"
              />
            </div>
            <div v-if="$v.dataUser.new_email.$error">
              <div v-if="!$v.dataUser.new_email.required" class="error">
                {{ $t('error_text.required') }}
              </div>
              <div v-if="!$v.dataUser.new_email.email" class="error">
                {{ $t('error_text.is_not_email_format') }}
              </div>
              <div v-if="!$v.dataUser.new_email.maxLength" class="error">
                {{ $t('error_text.less_than_100_characters') }}
              </div>
              <div
                v-if="!$v.dataUser.new_email.notSameAsEmail && $v.dataUser.new_email.required"
                class="error"
              >
                {{ $t('error_text.old_email_confirm_match_new_email') }}
              </div>
            </div>
            <div class="save-mail">
              <button class="btn-save" @click="showConfirmCancelModal()">{{ $t('general.update') }}</button>
            </div>
          </div>
          <div v-if="!isShow" class="btn-container">
            <button class="pass-change" @click="isShow = true">
              <div>{{ $t('account_management.change_password') }}</div>
              <img src="../../assets/images/users/draft/pass-change.svg" alt="" />
            </button>
          </div>
          <transition name="slide">
            <div v-if="isShow" class="pass-container">
              <div class="pass-info">
                <label for="old-pass"
                >{{ $t('account_management.current_password') }}<span class="text-danger"> *</span></label
                >
                <div class="password-input">
                  <img
                    v-if="isShowOldPassword === false"
                    src="../../assets/images/ic_eyes.svg"
                    class="pass-show"
                    alt=""
                    @click="isShowOldPassword = !isShowOldPassword"
                  />
                  <img
                    v-else
                    src="../../assets/images/ic_eyes_show.svg"
                    class="pass-show"
                    alt=""
                    @click="isShowOldPassword = !isShowOldPassword"
                  />
                  <input
                    v-model.trim="$v.data.old_password.$model"
                    :type="isShowOldPassword ? 'text' : 'password'"
                    :class="{
                    invalid:
                      $v.data.old_password.$invalid &&
                      $v.data.old_password.$dirty,
                  }"
                    class="input"
                    :placeholder="$t('account_management.placeholder_current_password')"
                    maxlength="32"
                    @input="changeInput()"
                  />
                </div>
                <div v-if="$v.data.old_password.$error">
                  <div v-if="!$v.data.old_password.required" class="error">
                    {{ $t('error_text.required') }}
                  </div>
                  <div v-if="!$v.data.old_password.minLength" class="error">
                    {{ $t('error_text.is_not_password_format') }}
                  </div>
                  <div v-if="!$v.data.old_password.maxLength" class="error">
                    {{ $t('error_text.is_not_password_format') }}
                  </div>
                </div>
                <div v-if="errors.wrongPassword" class="error">
                  {{ $t('error_text.wrong_current_password') }}
                </div>
              </div>
              <div class="pass-info">
                <label for="new-pass"
                >{{ $t('account_management.new_password') }}<span class="text-danger"> *</span></label
                >
                <div class="password-input">
                  <img
                    v-if="isShowNewPassword === false"
                    src="../../assets/images/ic_eyes.svg"
                    class="pass-show"
                    alt=""
                    @click="isShowNewPassword = !isShowNewPassword"
                  />
                  <img
                    v-else
                    src="../../assets/images/ic_eyes_show.svg"
                    class="pass-show"
                    alt=""
                    @click="isShowNewPassword = !isShowNewPassword"
                  />
                  <input
                    v-model.trim="$v.data.new_password.$model"
                    :type="isShowNewPassword ? 'text' : 'password'"
                    :class="{
                    invalid:
                      $v.data.new_password.$invalid &&
                      $v.data.new_password.$dirty,
                  }"
                    class="input"
                    :placeholder="$t('account_management.placeholder_new_password')"
                    maxlength="32"
                  />
                </div>
                <div v-if="$v.data.new_password.$error">
                  <div v-if="!$v.data.new_password.required" class="error">
                    {{ $t('error_text.required') }}
                  </div>
                  <div v-if="!$v.data.new_password.minLength" class="error">
                    {{ $t('error_text.is_not_password_format') }}
                  </div>
                  <div v-if="!$v.data.new_password.maxLength" class="error">
                    {{ $t('error_text.is_not_password_format') }}
                  </div>
                </div>
              </div>
              <div class="pass-info">
                <label for="confirm-pass"
                >{{ $t('account_management.new_password_confirm') }}<span class="text-danger"> *</span></label
                >
                <div class="password-input">
                  <img
                    v-if="isShowConfirmPassword === false"
                    src="../../assets/images/ic_eyes.svg"
                    class="pass-show"
                    alt=""
                    @click="isShowConfirmPassword = !isShowConfirmPassword"
                  />
                  <img
                    v-else
                    src="../../assets/images/ic_eyes_show.svg"
                    class="pass-show"
                    alt=""
                    @click="isShowConfirmPassword = !isShowConfirmPassword"
                  />
                  <input
                    v-model.trim="$v.data.confirm_password.$model"
                    :type="isShowConfirmPassword ? 'text' : 'password'"
                    :class="{
                    invalid:
                      $v.data.confirm_password.$invalid &&
                      $v.data.confirm_password.$dirty,
                  }"
                    class="input"
                    :placeholder="$t('account_management.placeholder_new_password_confirm')"
                    maxlength="32"
                  />
                </div>
                <div v-if="$v.data.confirm_password.$error">
                  <div v-if="!$v.data.confirm_password.required" class="error">
                    {{ $t('error_text.required') }}
                  </div>
                  <div
                    v-if="!$v.data.confirm_password.sameAsPassword && $v.data.confirm_password.required"
                    class="error"
                  >
                    {{ $t('error_text.new_password_confirm_not_match_new_password') }}
                  </div>
                </div>
              </div>
              <div class="save-container">
                <button class="cancel"  @click="cancelChange()">{{ $t('general.cancel') }}</button>
                <button class="save" @click="changeUserPassword">{{ $t('general.save') }}</button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <button
      ref="showConfirmCancelModalBtn"
      class="d-none"
      data-bs-toggle="modal"
      data-bs-target="#confirmCancelModal"
    />
    <div id="confirmCancelModal" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content box-modal">
          <div class="modal-header border-0">
            <img
              ref="closeConfirmCancelModal"
              class="close-modal"
              data-bs-dismiss="modal"
              aria-label="Close"
              src="../../assets/images/ic_exit.svg"
              alt=""
            >
          </div>
          <div class="modal-body">
            <h3 class="text-center modal-body-text">
              {{ $t('account_management.confirm_change_email') }}
            </h3>
          </div>
          <div class="modal-footer align-items-center d-flex justify-content-center flex-row">
            <button type="button" class="btn btn-secondary-custom rounded-pill w-20 mt-4 mb-4" data-bs-dismiss="modal">{{ $t('general.no') }}</button>
            <button type="button" class="btn btn-danger rounded-pill w-20 btn-p" data-bs-dismiss="modal" @click="changeUserEmail()">{{ $t('general.yes') }}</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import { validationMixin } from 'vuelidate'
import {
  required,
  maxLength,
  minLength,
  sameAs,
  email,
  not,
} from 'vuelidate/lib/validators'

export default {
  name: 'AccountManagement',
  mixins: [validationMixin],
  layout: 'auth',

  data() {
    return {
      items: [],
      errors: [],
      isShow: false,
      isShowOldPassword: false,
      isShowNewPassword: false,
      isShowConfirmPassword: false,
      data: {
        old_password: '',
        new_password: '',
        confirm_password: '',
      },
      dataUser: {
        old_email: '',
        new_email: '',
      },
    }
  },

  validations: {
    data: {
      old_password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(32),
      },
      new_password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(32),
      },
      confirm_password: {
        required,
        sameAsPassword: sameAs('new_password'),
      },
    },
    dataUser: {
      new_email: {
        required,
        email,
        maxLength: maxLength(100),
        notSameAsEmail: not(sameAs('old_email'))
      }
    }
  },

  head() {
    return { title: `${ this.$t('general.account_info') }` }
  },

  computed: {},

  created() {
    this.getUserProfile()
  },

  methods: {
    resetData() {
      this.$v.$reset()
      this.data.old_password = ''
      this.data.new_password = ''
      this.data.confirm_password = ''
    },
    async getUserProfile() {
      const { data } = await this.$repositories.users.getUserProfile()

      this.items = data

      this.dataUser.old_email = data.email;
      this.dataUser.new_email = data.email;
    },
    async changeUserPassword() {
      this.$v.data.$touch()

      if (!this.$v.data.$invalid) {
        try {
          await this.$repositories.users
            .changeUserPassword(this.data)
            .then((res) => {
              const data = this.$handleResponse(res)
              this.errors = data.errors
              if (res.status === 200) {
                this.$toast.success(
                  this.$t('account_management.update_password_success')
                )
              }
              if (data.errorMsg) {
                this.errors.wrongPassword = data.errorMsg
              }
            })
            this.resetData()
        } catch (e) {
          this.errors = e.response.data.errors
        }
      }
    },
    cancelChange() {
      this.resetData()
      this.isShow = false
    },
      changeInput() {
          this.errors.wrongPassword = ''
      },

    showConfirmCancelModal() {
      this.$v.dataUser.$touch()

      if (!this.$v.dataUser.$invalid) {
        this.$refs.showConfirmCancelModalBtn.click()
      }
    },

    async changeUserEmail() {
      this.$v.dataUser.$touch()

      if (!this.$v.dataUser.$invalid) {
        try {
          await this.$repositories.users
            .changeUserEmail(this.dataUser)
            .then((res) => {
              const data = this.$handleResponse(res)
              if (res.status === 200) {
                this.$toast.success(
                  this.$t('account_management.update_mail_success')
                )
                this.logout();
              }
              if (data.errorMsg) {
                this.$toast.error(
                  this.$t(data.errorMsg)
                )
              }
            })
          this.resetData()
        } catch (e) {
          this.$toast.error(
            this.$t(e.response.data.errors)
          )
        }
      }
    },
    async logout() {
      await this.$auth.logout()
      await this.$router.push(this.localePath('/', this.$i18n.locale))
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/pages/users/account-management.scss';
@import '../../styles/components/modal/_confirm_cancel_modal.scss';
</style>
