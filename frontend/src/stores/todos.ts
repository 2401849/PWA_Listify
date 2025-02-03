import {defineStore} from "pinia";
import {ref} from "vue";
import {todoService} from "@/api/todo.service.ts";
import type {TodoItem} from '@/types/todo.types.ts'

export const useTodosStore = defineStore("todos", () => {
  const items = ref<TodoItem[]>([]);

  const fetchTodos = async () => {
    items.value = await todoService.getTodos()
    items.value.forEach(todo => {
      todo.dueDate = new Date(todo.dueDate);
    });
    items.value.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  }

  const addTodo = async (newItem: TodoItem) => {
    const itemAdded = await todoService.addTodo(newItem)
    items.value.push({...itemAdded});
    items.value.forEach(todo => {
      todo.dueDate = new Date(todo.dueDate);
    });
    items.value.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  };

  const editTodo = async (updatedItem: TodoItem) => {
    const id = updatedItem._id;
    await todoService.editTodo(id, updatedItem);
    const todo = items.value.find(item => item._id === id);
    Object.assign(todo!, updatedItem)
    items.value.forEach(todo => {
      todo.dueDate = new Date(todo.dueDate);
    });
    items.value.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  };

  const deleteTodo = async (deleteItem: TodoItem) => {
    const id = deleteItem._id;
    const response = await todoService.deleteTodo(id)
    items.value = items.value.filter(item => item._id !== id);
    return response
  }

  const deleteComplete = async () => {
    const response = await todoService.deleteAllCompleted()
    items.value = items.value.filter(item => !item.isCompleted);
    return response
  }

  return {items, fetchTodos, addTodo, editTodo, deleteTodo, deleteComplete};
});
