<template>
    <div>
        <!-- Messenger Plugin chat Code -->
        <div id="fb-root"></div>

        <!-- Your Plugin chat code -->
        <div id="fb-customer-chat" class="fb-customerchat">
        </div>
    </div>
</template>

<script>

    export default {
        name: 'FbCustomerChat',

        props: {
            pageId: {
                type: String,
                required: true,
            },
        },

        head () {
            return {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                    'X-Requested-With': 'XMLHttpRequest'
                },
                script: [
                    {
                        src: "/customer-fb.js",
                        ssr: false,
                        body: true
                    },
                ]
            }
        },

        computed: {},

        methods: {},
    }
</script>
