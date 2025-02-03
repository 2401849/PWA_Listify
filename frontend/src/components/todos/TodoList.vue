<template>
  <template v-if="items.length > 0">
    <TodoItem
      v-for="item in items"
      :key="item._id"
      :item="item"
      @open-form="handleOpenForm"
      @delete-item="handleDelete"
      @toggle-completed="handleToggleCompleted"
    />
  </template>
  <template v-else>
    <p class="no-items">No existing todos!</p>
  </template>
  <v-dialog v-model="isDialogOpen" max-width="500px">
    <TodoForm v-model="formData.item" :isEdit="formData.isEdit" @submit="handleSubmit"/>
  </v-dialog>
</template>

<script lang="ts">
import { computed, onMounted, ref } from "vue";
import { useTodosStore } from "@/stores/todos.ts";
import TodoItem from "@/components/todos/TodoItem.vue";
import TodoForm from "@/components/todos/TodoForm.vue";
import type {TodoItem as Todo} from '@/types/todo.types.ts';
import Swal from "sweetalert2";


export default {
  components: { TodoItem, TodoForm },
  setup() {
    const todoStore = useTodosStore();
    const isDialogOpen = ref(false);
    const formData = ref<{ isEdit: boolean; item: Todo }>({
      isEdit: false,
      item: { _id: "", title: "", dueDate: new Date(), description: "", isCompleted: false },
    });

    const items = computed(() => todoStore.items || []);

    onMounted(async () => {
      await todoStore.fetchTodos();
    });

    const handleOpenForm = ({ isEdit, item }: { isEdit: boolean; item: Todo }) => {
      formData.value = {
        isEdit,
        item: item || { _id: "", title: "", dueDate: Date.now(), description: "", isCompleted: false },
      };
      isDialogOpen.value = true;
    };

    const handleSubmit = async (item: Todo) => {
      await todoStore
        .editTodo(item)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: `Todo updated successfully!`,
            showConfirmButton: false,
            timer: 2500,
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
          });
        });
      isDialogOpen.value = false;
    };

    const handleDelete = async (item: Todo) => {
      await todoStore
        .deleteTodo(item)
        .then((res) => {
          if (res.deletedCount > 0) {
            Swal.fire({
              icon: "success",
              title: `Todo deleted successfully!`,
              showConfirmButton: false,
              timer: 2500,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: `Todo cannot be deleted!`,
              showConfirmButton: true,
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
          });
        });
    };

    const handleToggleCompleted = async (item: Todo) => {
      item.isCompleted = !item.isCompleted;
      await todoStore.editTodo(item);
    };

    return {
      items,
      isDialogOpen,
      formData,
      handleOpenForm,
      handleSubmit,
      handleDelete,
      handleToggleCompleted,
    };
  },
};
</script>

<style>
.no-items {
  font-style: italic;
}
</style>
