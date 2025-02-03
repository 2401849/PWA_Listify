<template>
  <v-container class="fill-height">

    <v-card class="mx-auto pa-12 pb-8" elevation="8" width="500" max-width="500" rounded="lg">
      <v-card-text>
        <a
          class="text-blue text-decoration-none"
          href="/"
          rel="noopener noreferrer"
        >
          <v-icon icon="mdi-chevron-left"></v-icon>
          Login
        </a>
      </v-card-text>
      <v-card-text class="text-center">
        <h1>Sign Up for Listify</h1>
      </v-card-text>
      <v-form @submit.prevent="registerForm">
        <div class="text-subtitle-1 text-medium-emphasis">Your details</div>
        <v-text-field
          density="compact"
          placeholder="Your Name"
          prepend-inner-icon="mdi-account-edit"
          variant="outlined"
          v-model="form.name"
          @blur="validator.name.$touch()"
          :error-messages="nameErrors"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Your contact</div>
        <v-text-field
          type="email"
          density="compact"
          placeholder="E-mail"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="form.email"
          @blur="validator.email.$touch()"
          :error-messages="emailErrors"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Account</div>
        <v-text-field
          density="compact"
          placeholder="Username"
          prepend-inner-icon="mdi-account"
          variant="outlined"
          v-model="form.username"
          @blur="validator.username.$touch()"
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
          @blur="validator.password.$touch()"
          @click:append-inner="togglePassword"
          :error-messages="passwordErrors"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Confirm Password
        </div>
        <v-text-field
          :append-inner-icon="confirmPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="confirmPasswordVisible ? 'text' : 'password'"
          density="compact"
          placeholder="Confirm your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          v-model="form.passwordConfirm"
          @click:append-inner="toggleConfirmPassword"
          @update:modelValue="validator.passwordConfirm.$validate()"
          :error-messages="confirmPasswordErrors"
        ></v-text-field>

        <v-btn
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          block
          type="submit"
          :disabled="!validator.$anyDirty || validator.$invalid"
        >
          Register
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>


<script lang="ts">
import { email, minLength, required, sameAs } from "@vuelidate/validators";
import { computed, defineComponent, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { useUsersStore } from "@/stores/users.ts";
import router from "@/router";
import Swal from "sweetalert2";

export default defineComponent({
  setup() {
    const usersStore = useUsersStore();
    const passwordVisible = ref(false);
    const confirmPasswordVisible = ref(false);

    const form = ref({
      name: "",
      email: "",
      username: "",
      password: "",
      passwordConfirm: "",
    });

    const customMessages = {
      required: "This field is required.",
      minLength: (min: number) => `Must be at least ${min} characters long.`,
      email: "Please enter a valid e-mail address.",
      sameAs: "Passwords do not match.",
    };

    const rules = {
      name: { required, minLength: minLength(3) },
      email: { required, email },
      username: { required, minLength: minLength(3) },
      password: { required, minLength: minLength(8) },
      passwordConfirm: {
        required,
        sameAsPassword: sameAs(computed(() => form.value.password)),
      },
    };

    const validator = useVuelidate(rules, form);

    const togglePassword = () => {
      passwordVisible.value = !passwordVisible.value;
    };

    const toggleConfirmPassword = () => {
      confirmPasswordVisible.value = !confirmPasswordVisible.value;
    };
    const formatErrors = (errors: any[], field: string, minLengthValue?: number) => {
      return errors.map(e => {
        if (e.$validator === "required") return customMessages.required;
        if (e.$validator === "minLength") return customMessages.minLength(minLengthValue!);
        if (e.$validator === "email") return customMessages.email;
        if (e.$validator === "sameAsPassword") return customMessages.sameAs;
        return e.$message;
      });
    };

    const nameErrors = computed(() => formatErrors(validator.value.name.$errors, "name", 3));
    const emailErrors = computed(() => formatErrors(validator.value.email.$errors, "email"));
    const usernameErrors = computed(() => formatErrors(validator.value.username.$errors, "username", 3));
    const passwordErrors = computed(() => formatErrors(validator.value.password.$errors, "password", 8));
    const confirmPasswordErrors = computed(() => formatErrors(validator.value.passwordConfirm.$errors, "passwordConfirm"));

    const registerForm = async () => {
      validator.value.$touch();
      const isValid = await validator.value.$validate();
      if (!isValid) return;

      const user = {
        name: form.value.name,
        email: form.value.email,
        username: form.value.username,
        password: form.value.password,
      };

      await usersStore
        .addUser(user)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: `User added successfully!`,
            showConfirmButton: false,
            timer: 1500,
          });
          router.push("/");
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
          });
        });
    };
    const navigateBack = () => {
      router.push("/");
    }

    return {
      form,
      passwordVisible,
      confirmPasswordVisible,
      togglePassword,
      toggleConfirmPassword,
      validator,
      registerForm,
      nameErrors,
      emailErrors,
      usernameErrors,
      passwordErrors,
      confirmPasswordErrors,
      navigateBack
    };
  },
});
</script>
