<template>
  <div class="row">
    <div class="col-lg-12">
      <h1 >{{ $t('general.homepage') }}</h1>
      <nuxt-link :to="switchLocalePath('ja')">Japanese</nuxt-link>
      <nuxt-link :to="switchLocalePath('vi')">Vietnamese</nuxt-link>
      <nuxt-link to="/contact">Contact</nuxt-link>
      <a href="javascript:void(0)" @click="loginFB">Login FB</a>

    </div>
    <p v-if="$fetchState.pending">Loading....</p>
    <p v-else-if="$fetchState.error">Error while fetching posts</p>
    <ul v-else class="col-sm-12 col-lg-6">
      <li v-for="(post, index) in posts" :key="index">
        {{ post.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'default',
  head: {
    title: "Example",
    meta: [
      //
      {
        hid: 'description',
        name: 'description',
        content: 'My custom description'
      }
    ]
  },
  data() {
    return {}
  },
  async fetch() {
    const { store, error } = this.$nuxt.context
    try {
      await store.dispatch('post/get_posts')
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch'
      })
    }
  },
  computed: {
    ...mapState({
      posts: (state) => {
        return state.post.posts
      }
    })
  },
  mounted() {

  },
  methods: {
    loginFB() {
       this.$auth.loginWith('facebook').then(res => { })
    }
  }
}
</script>
<style lang="scss">
@import '~/styles/pages/example'
</style>
