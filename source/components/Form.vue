<template>
  <ValidationObserver ref="form">
    <form @submit.prevent="onSubmit" class="form">
      <ValidationProvider
        name="E-mail"
        v-slot="{ errors }"
        rules="required|email"
      >
        <input v-model="email" type="email"/> <br/>
        <span>{{ errors[0] }}</span><br/>
      </ValidationProvider>

      <ValidationProvider
        name="First Name"
        v-slot="{ errors }"
        rules="required|alpha"
      >
        <input v-model="firstName" type="text"/><br/>
        <span>{{ errors[0] }}</span><br/>
      </ValidationProvider>

      <ValidationProvider
        name="Last Name"
        v-slot="{ errors }"
        rules="required|alpha"
      >
        <input v-model="lastName" type="text"  class="col-lg-12" /><br/>
        <span>{{ errors[0] }}</span><br/>
      </ValidationProvider>

      <button type="submit"  class="col-lg-12">Submit</button>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data: () => ({
    firstName: '',
    lastName: '',
    email: '',
  }),
  methods: {
    onSubmit() {
      this.$refs.form.validate().then((success) => {
        if (!success) {
          return
        }

        alert('Form has been submitted!')

        // Resetting Values
        this.firstName = this.lastName = this.email = ''

        // Wait until the models are updated in the UI
        this.$nextTick(() => {
          this.$refs.form.reset()
        })
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.form {
    width: 300px;
    margin: auto;
    margin-top: 30px;
}
</style>