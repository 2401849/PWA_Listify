import type {ModityTodoItem, TodoItem} from '@/types/todo.types.ts'
import api from "@/api/api.ts";


export const todoService = {
  async getTodos(): Promise<TodoItem[]> {
    const response = await api.get("/todos");
    return response.data;
  },

  async addTodo(payload: ModityTodoItem) {
    const response = await api.post("/todos", payload);
    return response.data;
  },

  async editTodo(id: string, payload: ModityTodoItem) {
    const response = await api.patch(`/todos/${id}`, payload);
    return response.data;
  },

  async deleteTodo(id: string) {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  },

  async deleteAllCompleted() {
    const response = await api.delete("/todos");
    return response.data;
  },
};


export default todoService;
