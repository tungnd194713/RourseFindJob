<template>
    <div></div>
</template>

<script>

    export default {
        name: 'PageView',

        props: {
            pathPage: {
                type: String,
                required: true,
            },
        },

        computed: {},

        mounted() {
            const self = this;
                setTimeout(function () {
                    if (self.pathPage === self.$nuxt.context.route.path) {
                        if (self.pathPage.indexOf("/ja") === 0){
                            if (self.pathPage === "/ja") {
                                self.pageViews("/")
                            }else {
                                self.pageViews(self.pathPage.substring(3))
                            }
                        } else {
                            self.pageViews(self.pathPage)
                        }
                    }
                }, 5000)

        },

        methods: {
            async pageViews(rotuerPath) {
                try {
                    await this.$repositories.pageviews
                        .postPageViews({
                            path: rotuerPath,
                        })
                        .then((res) => {

                        })
                } catch (e) {

                }
            },
        }
    }
</script>
