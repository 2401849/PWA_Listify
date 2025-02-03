<template>
  <template v-if="users.length > 0">
    <UserItem
      v-for="user in users"
      :key="user._id"
      :user="user"
      @open-form="handleOpenForm"
      @delete-user="handleDelete"
      @toggle-admin="handleToggleIsAdmin"
    />
  </template>
  <template v-else>
    <p class="no-items">No existing users!</p>
  </template>
  <v-dialog v-model="isDialogOpen" max-width="500px">
    <UserForm v-model="formData.user" @submit="handleSubmit"/>
  </v-dialog>
</template>

<script lang="ts">
import {computed, onMounted, ref} from "vue";
import {useUsersStore} from "@/stores/users.ts";
import UserItem from "@/components/users/UserItem.vue";
import Swal from "sweetalert2";
import UserForm from "@/components/users/UserForm.vue";
import {useUserAuthStore} from "@/stores/auth.ts";
import type {Users} from "@/types/users.types.ts";

export default {
  components: {UserItem, UserForm}, setup() {
    const userStore = useUsersStore();
    const authStore = useUserAuthStore()

    const isDialogOpen = ref(false);
    const formData = ref<{ user: Users }>({});

    const users = computed(() => {
      return userStore.users.filter(user => user.username !== authStore.username);
    });

    onMounted(async () => {
      await userStore.fetchUsers();
    });

    const handleOpenForm = (user: Users) => {
      formData.value = {user}
      isDialogOpen.value = true;
    };


    const handleSubmit = async (user: Users) => {
      await userStore
        .editUser(user)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: `User updated successfully!`,
            showConfirmButton: false,
            timer: 2500,
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error", title: "Oops...", text: error.message,
          });
        });
      isDialogOpen.value = false;
    };

    const handleDelete = async (user: Users) => {
      await userStore
        .deleteUser(user)
        .then((res) => {
          if (res.deletedCount > 0) {
            Swal.fire({
              icon: "success",
              title: `User deleted successfully!`,
              showConfirmButton: false,
              timer: 2500,
            });
          } else {
            Swal.fire({
              icon: "error", title: `User cannot be deleted!`, showConfirmButton: true,
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error", title: "Oops...", text: error.message,
          });
        });
    };

    const handleToggleIsAdmin = async (user: Users) => {
      user.isAdmin = !user.isAdmin;
      await userStore.editUser(user);
    };

    return {
      users,
      isDialogOpen,
      formData,
      handleOpenForm,
      handleSubmit,
      handleDelete,
      handleToggleIsAdmin,
    };
  },
};
</script>

<style>
.no-items {
  font-style: italic;
}
</style>
