import api from "@/api/api.ts";

export const authService = {
  async login(payload: { username: string; password: string }) {
    const response = await api.post("/auth/login", payload)
    return response.data;
  },
};

export default authService;
