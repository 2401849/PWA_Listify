<template>
  <v-container class="d-flex pa-0" style="text-align: center">
    <v-container>
      <v-btn
        color="#5865f2"
        variant="outlined"
        prepend-icon="mdi-archive-plus-outline"
        @click="handleOpenForm"
      >
        Create New
      </v-btn>
    </v-container>
    <v-container>
      <v-btn
        color="#5865f2"
        variant="flat"
        prepend-icon="mdi-delete-outline"
        @click="handleDeleteComplete"
      >
        Delete Done
      </v-btn>
    </v-container>
  </v-container>
  <v-dialog v-model="isDialogOpen" max-width="500px">
    <TodoForm v-model="formData.item" :isEdit="formData.isEdit" @submit="handleSubmit" />
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import TodoForm from '@/components/todos/TodoForm.vue'
import { useTodosStore } from '@/stores/todos.ts'
import Swal from 'sweetalert2'
import type {TodoItem} from "@/types/todo.types.ts";

export default defineComponent({
  components: { TodoForm },
  setup() {
    const todoStore = useTodosStore()

    const isDialogOpen = ref(false)
    const formData = ref({ isEdit: false, item: {} })

    const handleOpenForm = () => {
      isDialogOpen.value = true
    }

    const handleSubmit = async (newItem: TodoItem) => {
      await todoStore
        .addTodo(newItem)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: `Todo added successfully!`,
            showConfirmButton: false,
            timer: 1500,
          })
          isDialogOpen.value = false
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
          })
        })
    }
    const handleDeleteComplete = async () => {
      if (todoStore.items.length === 0) {
        await Swal.fire({
          icon: 'info',
          title: 'No items found!',
          showConfirmButton: false,
          timer: 1500,
        })
        return
      }
      await todoStore
        .deleteComplete()
        .then((res) => {
          if (res.deletedCount > 0) {
            Swal.fire({
              icon: 'success',
              title: `Todos have been deleted successfully!`,
              showConfirmButton: false,
              timer: 2500,
            })
          } else {
            Swal.fire({
              icon: 'info',
              title: 'No items to be deleted!',
              showConfirmButton: false,
              timer: 1500,
            })
            return
          }
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
      isDialogOpen,
      formData,
      handleOpenForm,
      handleSubmit,
      handleDeleteComplete,
    }
  },
})
</script>
