<template>
  <main class="container-maintain min-height-auto"
        :class="{
            'font-vi': $i18n.locale === 'vi',
            'font-ja': $i18n.locale === 'ja'
          }"
  >
    <div class="container">
      <div class="inner-container">
        <div class="row mx-0 my-0">
          <div class="col-md-12 col-lg-6 form-img box-shadow">
            <img
              src="../assets/images/users/draft/form-img.png"
              alt=""
            />
          </div>
          <div class="col-md-12 col-lg-6 form-inp box-shadow">
            <div class="form-title">
              <h1 class="fw-bold">{{ $t('general.contact') }}</h1>
              <h3>{{ $t('contact_page.note') }}</h3>
            </div>
            <form class="form-content" @submit.prevent="submit">
              <div
                v-if="message === 201"
                class="valid-feedback error text-center"
              >
                {{ $t('contact_page.success') }}
              </div>
              <div class="form-item">
                <label for="users-name">{{ $t('contact_page.full_name') }} <span class="text-danger">*</span></label>
                <div class="input-item">
                  <div class="input-img">
                    <img
                      src="../assets/images/users/draft/form-name.svg"
                      alt=""
                    />
                  </div>
                  <div class="input-inp">
                    <input
                      id="ex1"
                      v-model.trim="contact.name"
                      type="text"
                      name="users-name"
                      @input="$v.contact.name.$touch()"
                      @blur="$v.contact.name.$touch()"
                    />
                  </div>
                </div>
                <div v-if="$v.contact.name.$error">
                  <div
                    v-if="!$v.contact.name.required"
                    class="invalid-feedback error"
                  >
                    {{ $t('error_text.required') }}
                  </div>
                  <div
                    v-if="!$v.contact.name.maxLength"
                    class="invalid-feedback error"
                  >
                    {{ $t('error_text.less_than_50_characters') }}
                  </div>
                </div>
              </div>
              <div class="form-item">
                <label for="users-mail">{{ $t('login_page.mail') }} <span class="text-danger">*</span></label>
                <div class="input-item">
                  <div class="input-img">
                    <img
                      src="../assets/images/users/draft/form-mail.svg"
                      alt=""
                    />
                  </div>
                  <div class="input-inp">
                    <input
                      v-model="contact.email"
                      type="text"
                      name="users-email"
                      @input="$v.contact.email.$touch()"
                      @blur="$v.contact.email.$touch()"
                    />
                  </div>
                </div>
                <div v-if="$v.contact.email.$error">
                  <div
                    v-if="!$v.contact.email.required"
                    class="invalid-feedback error"
                  >
                    {{ $t('error_text.required') }}
                  </div>

                  <div
                    v-if="!$v.contact.email.email"
                    class="invalid-feedback error"
                  >
                    {{ $t('error_text.is_not_email_format') }}
                  </div>

                  <div
                    v-if="!$v.contact.email.maxLength"
                    class="invalid-feedback error"
                  >
                    {{ $t('error_text.less_than_50_characters') }}
                  </div>
                </div>
              </div>
              <div class="form-item">
                <label for="users-phone">{{ $t('contact_page.phone') }} </label>
                <div class="input-item">
                  <div class="input-img">
                    <img
                      src="../assets/images/users/draft/form-tele.svg"
                      alt=""
                    />
                  </div>
                  <div class="input-inp">
                    <input
                      v-model.trim="contact.phone"
                      type="text"
                      name="users-phone"
                      @input="$v.contact.phone.$touch()"
                      @blur="$v.contact.phone.$touch()"
                    />
                  </div>
                </div>
                <div v-if="$v.contact.phone.$error">
                  <div
                    v-if="!$v.contact.phone.maxLength || !$v.contact.phone.minLength"
                    class="invalid-feedback error"
                  >{{ $t('error_text.less_than_9_13_characters_new') }}
                  </div>
                  <div
                    v-if="!$v.contact.phone.isHalfWidth"
                    class="invalid-feedback error"
                  >{{ $t('error_text.in_valid_num_half_width') }}
                  </div>
                </div>
              </div>
              <div class="form-item">
                <label for="users-addr"
                >{{ $t('contact_page.contact_content') }} <span class="text-danger"
                >*</span
                ></label
                >
                <div class="input-item">
                                  <textarea
                                    v-model.trim="contact.content"
                                    name="contact-content"
                                    rows="3"
                                    @input="$v.contact.content.$touch()"
                                    @blur="$v.contact.content.$touch()"
                                  ></textarea>
                </div>
                <div v-if="$v.contact.content.$error">
                  <div
                    v-if="!$v.contact.content.required"
                    class="invalid-feedback error"
                  >
                    {{ $t('error_text.required') }}
                  </div>
                  <div
                    v-if="!$v.contact.content.maxLength"
                    class="invalid-feedback error"
                  >
                    {{ $t('error_text.less_than_1000_characters') }}
                  </div>
                </div>
              </div>
              <div class="submit-container">
                <button class="submit" type="submit">
                  {{ $t('contact_page.sent') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import 'bootstrap/dist/css/bootstrap.css'
import { required, email, maxLength, minLength, helpers } from 'vuelidate/lib/validators'

const regex = /^[0-9]+$/
const numbers = helpers.regex('numbers', /^[0-9]*$/)
// const spaceAlpha = helpers.regex('isNameValid',/^[a-z_ ]*$/i)

export default {
    name: 'ContactForm',
    layout: 'authUnrequired',
    data() {
        return {
            contact: {
              name: this.isAuthenticated ? this.loggedInUser.name : '',
              email: this.isAuthenticated ? this.loggedInUser.email : ''
            },
            errors: [],
            message: '',
        }
    },
    head() {
        return { title: `${ this.$t('general.contact') }` }
    },

    validations: {
        contact: {
            name: {
                required,
                maxLength: maxLength(50),
            },
            email: {
                required,
                email,
                maxLength: maxLength(50),
            },
            phone: {
                isHalfWidth(value) {
                  if (value) {
                    return value.match(regex) != null
                  }
                  return true
                },
                minLength: minLength(9),
                maxLength: maxLength(13),
                numbers,
            },
            content: {
                required,
                maxLength: maxLength(1000)
            },
        },
    },
    computed: {
      ...mapGetters(['loggedInUser', 'isAuthenticated']),
    },
    created() {
      if (this.isAuthenticated) {
        this.contact.name = this.loggedInUser.name
        this.contact.email = this.loggedInUser.email
      }
    },
    methods: {
        async submit() {
            this.$v.contact.$touch()
            if (!this.$v.contact.$invalid) {
                try {
                    await this.$repositories.contact
                        .postContact(this.contact)
                        .then((response) => {
                            if (response.status === 201) {
                              this.$toast.success(this.$t('contact_page.success'))
                              this.contact = {}
                              this.$v.$reset()
                            }
                            else {
                              const data = this.$handleResponse(response)
                              this.$toast.error(data.errors.email)
                            }
                        })
                } catch (error) {
                    const data = this.$handleResponse(error)
                    this.errors = data.errors
                    this.$toast.error(this.errors)
                }
            }
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../styles/pages/users/contact-form.scss';
</style>
