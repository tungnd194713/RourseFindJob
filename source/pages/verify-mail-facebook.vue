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
                    <NuxtLink :to="localePath('/', $i18n.locale)"><img src="../assets/images/logo.svg" alt="" class="logo-unauth"/></NuxtLink>
                </div>
                <div class="form_forgot">
                    <div v-if="$i18n.locale == 'vi'" class="text-content w-100 d-flex justify-content-center">
                        Gửi mail xác nhận <br /> đăng nhập Facebook
                    </div>
                    <div v-else class="text-content w-100 d-flex justify-content-center">
                        Facebookの登録確認メール
                    </div>
                    <div class="textforgot"
                         :class="{
                            'font-vi': $i18n.locale === 'vi',
                            'font-ja': $i18n.locale === 'ja'
                          }"
                    >
                        {{ $t('verify.note') }}
                    </div>
                    <div class="mt-3 mb-4">
                        <img
                                class="email-green"
                                src="../assets/images/users/ic_mail_green.svg"
                                alt=""
                        />
                        <div v-if="message" class="alert alert-success" role="alert">
                            {{ $t(message) }}
                        </div>
                        <div v-if="error" class="alert alert-danger" role="alert">
                            {{ $t(error) }}
                        </div>
                    </div>

                    <div class="email mb-2">
                        <div class="text-email d-flex">{{ $t('signup_page.username') }}
                            <p>*</p>
                        </div>
                        <div class="position-relative">
                            <img class="mail-icon" src="../assets/images/ic_user.svg" alt="">
                            <div class="line"></div>
                            <input
                                    id="name"
                                    v-model="$v.name.$model"
                                    type="text"
                                    class="input-email"
                                    disabled
                                    @input="$v.name.$touch()"
                                    @blur="$v.name.$touch()"
                                    @keydown.enter.prevent="sendVerifyMail"
                            >
                        </div>

                        <div v-if="$v.name.$error">
                            <div v-if="!$v.name.required" class="error">
                                {{ $t('error_text.required') }}
                            </div>
                        </div>
                    </div>

                    <div class="email">
                        <div class="text-email d-flex">
                            {{ $t('login_page.mail') }}
                            <p>*</p>
                        </div>
                        <div class="position-relative">
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
                        <!--<NuxtLink class="goBack" :to="'/login'">Quay lại</NuxtLink>-->
                        <button type="submit" class="send mb-3">{{ $t('general.send') }}</button>
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
        data() {
            return {
                name: this.$route.query.name ? this.$route.query.name : '',
                email: this.$route.query.email ? this.$route.query.email : '',
                facebook_id: this.$route.query.id ? this.$route.query.id : '',
                message: '',
                error: ''
            }
        },

        validations: {
            name: {
                required
            },
            email: {
                required,
                email,
            }
        },

        head() {
            return {title: `${ this.$t('general.verify_mail_fb') }`}
        },

        watch: {
            email (value) {
                if (!value) {
                    this.message = ''
                    this.error = ''
                }
            }
        },

        methods: {
            async sendVerifyMail() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    try {
                        await this.$repositories.accounts.sendVerificationMailFacebook({
                            name: this.name,
                            email: this.email,
                            facebook_id: this.facebook_id
                        })
                            .then((res) => {
                                const data = this.$handleResponse(res);
                                this.message = data.message;
                                this.error = data.errorMsg;
                                this.getMessage(this.error);
                                this.getMessage(this.message);
                            });
                    } catch (e) {
                        this.message = '';
                        this.error = e.response.data.message;
                    }
                }
            },

            getMessage(message) {
                if (message === 'The given data was invalid.') {
                    this.error = 'error_text.incorrect_format'
                }
                if (message === 'Too Many Attempts.') {
                    this.error = 'error_text.please_wait_try_again'
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../styles/pages/users/verify-mail-facebook.scss';
</style>
