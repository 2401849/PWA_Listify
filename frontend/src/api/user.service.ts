import type {CreateUser, UpdateUser} from '@/types/users.types.ts'
import api from "@/api/api.ts";


export const userService = {
  async getUsers() {
    const response = await api.get('/users');
    return response.data;
  },

  async addUser(payload: CreateUser) {
    const response = await api.post('/users', payload);
    return response.data;
  },

  async editUser(id: string, payload: UpdateUser) {
    const response = await api.patch(`/users/${id}`, payload);
    return response.data;
  },

  async deleteUser(id: string) {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  async deleteAll() {
    const response = await api.delete('/users');
    return response.data;
  }
};

export default userService;
