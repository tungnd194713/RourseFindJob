<template>
    <div class="container"
         :class="{
            'font-vi': $i18n.locale === 'vi',
            'font-ja': $i18n.locale === 'ja'
          }"
    >
        <div class="loader"></div>
        <p>{{ $t('social_callback.please_wait') }}</p>
    </div>
</template>

<script>
    export default {
        // middleware: ['authenticated'],
        name: "FacebookCallback",

        data() {
            return {
                token: this.$route.query.token ? this.$route.query.token : null,
                error: this.$route.query.error ? this.$route.query.error : 1
            }
        },

        head () {
            return {title: `${ this.$t('social_callback.please_wait') }`}
        },

        mounted() {
            this.$auth.setToken('local', 'Bearer ' + this.token);
            this.$auth.setStrategy('local');

            this.$auth.fetchUser().then(() => {
                return this.$router.push(this.localePath('/', this.$i18n.locale));
            }).catch((e) => {
                this.$auth.logout();
                if (this.$route.query.origin === 'login') {
                    return this.$router.push(this.localePath('/login?error=' + this.error, this.$i18n.locale));
                } else {
                    return this.$router.push(this.localePath('/register?error=1', this.$i18n.locale));
                }

            });
        }
    }
</script>

<style lang="scss" scoped>
    @import '../styles/pages/auth/social-callback.scss';
</style>
