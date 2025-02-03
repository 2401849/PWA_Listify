import api from "@/api/api.ts";

export const authService = {
  async login(payload: { username: string; password: string }) {
    const response = await api.post("/auth/login", payload)
    return response.data;
  }, async refreshToken(refreshToken: string) {
    try {
      const response = await api.post(`/auth/refresh`, {refreshToken});
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default authService;
