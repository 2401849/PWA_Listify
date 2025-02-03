<template>
  <v-card>
    <v-card-title>{{ isEdit ? "Edit Item" : "Add Item" }}</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="submitForm">
        <v-text-field
          v-model="form.title"
          label="Name"
          required
          :error-messages="validator.title.$errors.map(e => unref(e.$message))"
        ></v-text-field>

        <v-menu
          v-model="fromDateMenu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ props }">
            <v-text-field
              v-model="formattedDueDate"
              label="Due Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="props"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="form.dueDate"
            locale="en-in"
            no-title
            @update:modelValue="updateDueDate"
          ></v-date-picker>
        </v-menu>

        <v-textarea
          v-model="form.description"
          label="Description"
          :error-messages="validator.title.$errors.map(e => unref(e.$message))"
        ></v-textarea>

        <v-btn type="submit">{{ isEdit ? "Update" : "Add" }}</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, unref, ref, watch } from "vue";
import { format } from "date-fns";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default defineComponent({
  props: {
    modelValue: Object,
    isEdit: Boolean,
  },
  emits: ["update:modelValue", "submit"],
  setup(props, { emit }) {
    const form = ref({
      _id: props.isEdit && props.modelValue?._id ? props.modelValue._id : null,
      title: props.modelValue?.title || "",
      dueDate: props.modelValue?.dueDate ? new Date(props.modelValue.dueDate) : new Date(),
      description: props.modelValue?.description || "",
    });

    const rules = {
      title: { required },
      dueDate: { required },
      description: { required },
    };

    const validator = useVuelidate(rules, form);
    const fromDateMenu = ref(false);

    const formattedDueDate = computed(() => format(new Date(form.value.dueDate), "yyyy-MM-dd"));

    const updateDueDate = (date: Date) => {
      form.value.dueDate = date;
      fromDateMenu.value = false;
    };

    const submitForm = async () => {
      const isValid = await validator.value.$validate();
      if (!isValid) return;

      const formData = { ...form.value };
      if (!props.isEdit) delete formData._id; // Remove _id when creating a new item

      emit("submit", formData);
    };

    watch(
      () => props.modelValue,
      (newValue) => {
        if (newValue) {
          form.value = {
            _id: props.isEdit && newValue._id ? newValue._id : null,
            title: newValue.title || "",
            dueDate: newValue.dueDate ? new Date(newValue.dueDate) : new Date(),
            description: newValue.description || "",
          };
        }
      },
      { deep: true, immediate: true }
    );

    return {
      validator,
      form,
      fromDateMenu,
      formattedDueDate,
      updateDueDate,
      submitForm,
      unref
    };
  },
});
</script>
