import {defineStore} from "pinia";
import {ref} from "vue";
import {userService} from "@/api/user.service.ts";
import type {CreateUser, UpdateUser, Users} from '@/types/users.types.ts'


export const useUsersStore = defineStore("users", () => {
  const users = ref<Users[]>([]);

  const fetchUsers = async () => {
    users.value = await userService.getUsers();
  }

  const addUser = async (user: CreateUser) => {
    const itemAdded = await userService.addUser(user)
    users.value.push({...itemAdded});
  };

  const editUser = async (updatedUser: Users) => {
    const id = updatedUser._id
    await userService.editUser(id, updatedUser);
    const todo = users.value.find(user => user._id === id);
    Object.assign(todo!, updatedUser)
  };

  const deleteUser = async (deletedUser: Users) => {
    const id = deletedUser._id
    const response = await userService.deleteUser(id)
    users.value = users.value.filter(user => user._id !== id);
    return response
  }

  const deleteComplete = async () => {
    const response = await userService.deleteAll()
    users.value = []
    return response
  }

  return {users, fetchUsers, addUser, editUser, deleteUser, deleteComplete};
});
