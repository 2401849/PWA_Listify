<template>
  <v-container class="fill-height">
    <v-card class="mx-auto pa-12 pb-8" elevation="8" width="500" max-width="500" rounded="lg">
      <v-card-text class="text-center">
        <h1>Welcome to Listify</h1>
      </v-card-text>
      <v-form @submit.prevent="loginForm">
        <div class="text-subtitle-1 text-medium-emphasis">Account</div>

        <v-text-field
          density="compact"
          placeholder="Username"
          prepend-inner-icon="mdi-account"
          variant="outlined"
          v-model="form.username"
          :error-messages="usernameErrors"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Password
        </div>

        <v-text-field
          :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="passwordVisible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          v-model="form.password"
          @click:append-inner="togglePassword"
          :error-messages="passwordErrors"
        ></v-text-field>

        <v-btn class="mb-8" color="blue" size="large" variant="tonal" block type="submit">
          Log In
        </v-btn>

        <v-card-text class="text-center">
          <a class="text-blue text-decoration-none" href="/register" rel="noopener noreferrer">
            Sign up now
            <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text>
      </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { required } from '@vuelidate/validators'
import { computed, defineComponent, ref, unref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import router from '@/router'
import Swal from 'sweetalert2'
import { useUserAuthStore } from '@/stores/auth.ts'

export default defineComponent({
  setup() {
    const authStore = useUserAuthStore()
    const passwordVisible = ref(false)

    const form = ref({
      username: '',
      password: '',
    })

    const rules = {
      username: { required },
      password: { required },
    }

    const validator = useVuelidate(rules, form)

    const togglePassword = () => {
      passwordVisible.value = !passwordVisible.value
    }

    const usernameErrors = computed(() => validator.value.username.$errors.map((e) => unref(e.$message)))
    const passwordErrors = computed(() => validator.value.password.$errors.map((e) => unref(e.$message)))

    const loginForm = async () => {
      validator.value.$touch()
      const isValid = await validator.value.$validate()
      if (!isValid) return

      await authStore
        .login(form.value)
        .then(() => {
          router.push('/dashboard')
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
          })
        })
    }

    return {
      form,
      passwordVisible,
      togglePassword,
      validator,
      loginForm,
      usernameErrors,
      passwordErrors,
    }
  },
})
</script>
