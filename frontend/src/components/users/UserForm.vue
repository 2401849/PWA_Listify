<template>
  <v-card class="pa-4" elevation="8">
    <v-card-title class="text-h5">Edit User Password</v-card-title>

    <v-card-text>
      <v-card class="pa-4" elevation="4">
        <v-card-title class="text-h6 font-weight-bold">{{ form.name }}</v-card-title>
        <v-card-text>
          <v-row class="align-center">
            <v-col cols="12">
              <v-chip class="pa-2" color="primary" variant="outlined">
                <v-icon start class="mr-2">mdi-account</v-icon>
                <span class="font-weight-medium">{{ form.username }}</span>
              </v-chip>
            </v-col>
          </v-row>

          <v-row class="align-center mt-2">
            <v-col cols="12">
              <v-chip class="pa-2" color="secondary" variant="outlined">
                <v-icon start class="mr-2">mdi-email</v-icon>
                <span class="font-weight-medium">{{ form.email }}</span>
              </v-chip>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <v-form @submit.prevent="submitForm">
        <v-text-field
          v-model="form.password"
          label="New Password"
          placeholder="Enter new password"
          type="password"
          variant="outlined"
          class="mt-4"
        ></v-text-field>

        <v-btn type="submit" color="primary" block class="mt-2">Update</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    modelValue: Object,
  },
  emits: ["update:modelValue", "submit"],
  setup(props, { emit }) {
    const form = ref({
      _id: props.modelValue?._id,
      name: props.modelValue?.name,
      username: props.modelValue?.username,
      email: props.modelValue?.email,
      password: "",
    });

    const submitForm = async () => {
      if (form.value.password !== "") {
        emit("submit", { ...form.value, password: form.value.password });
      }
    };

    return {
      form,
      submitForm,
    };
  },
});
</script>
