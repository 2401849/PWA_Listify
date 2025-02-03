<script lang="ts">

export default {
  props: {
    user: {
      type: Object, required: true
    }
  }, methods: {
    openForm() {
      this.$emit('open-form', this.user);
    }, deleteItem() {
      this.$emit('delete-user', this.user);
    }
  }
};
</script>

<template>
  <v-row :key="user._id">
    <v-col cols="12">
      <v-card>
        <v-card-title>
          {{ user.name }}
          <v-checkbox label="Is administrator"
                      class="checkbox-top-right rounded-checkbox"
                      :model-value="user.isAdmin"
                      @change="$emit('toggle-admin', user)"
          ></v-checkbox>
        </v-card-title>
        <v-card-subtitle>
          {{ user.email }}
        </v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon="mdi-pencil" @click="openForm"></v-btn>
          <v-btn icon="mdi-trash-can" @click="deleteItem"></v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<style>

.checkbox-top-right {
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 50%;
}
</style>
