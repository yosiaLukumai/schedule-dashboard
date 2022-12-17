import { defineStore } from "pinia";
import { api } from "src/boot/axios";

export const userStore = defineStore("users", {
  state: () => ({
    user: null,
    authenticated: false,
    allUsers: null,
    usersCount: null,
  }),
  getters: {
    computedAuthenticated: (state) => {
      if (state.user?.authenticated) {
        state.authenticated = true;
      } else {
        return;
      }
    },
  },
  actions: {
    async login(password, email) {
      try {
        const response = await api.post("/user/login", {
          password: password,
          email: email,
        });
        return response.data;
      } catch (error) {
        return { inerror: true, message: "failed to connect" };
      }
    },
    async register(email, password, username, phonenumber) {
      try {
        const response = await api.post("/user/register", {
          password,
          email,
          username,
          phonenumber,
        });
        return response.data;
      } catch (error) {
        return { inerror: true, message: "failed to connect" };
      }
    },
    async resetPassword(password) {
      try {
        console.log("hitting the reset password api");
      } catch (error) {
        return { inerror: true, message: "failed to connect" };
      }
    },
    async updatePassword(password, email) {
      try {
        const response = await api.post("/users/updatePassword", {
          password,
          email,
        });
        return response.data;
      } catch (error) {
        return { inerror: true, message: "failed to connect" };
      }
    },
    async getUsersCount() {
      try {
        const allUsers = await api.get("/user/count/api");
        return allUsers.data;
      } catch (error) {
        return { inerror: true, message: "failed to connect" };
      }
    },
    async getAllUsers() {
      try {
      } catch (error) {}
    },
    async resendVerificationEmail(email) {
      try {
        const sent = await api.post("/user/resend/verification", { email });
        return sent.data;
      } catch (error) {
        return { inerror: true, message: "failed to connect" };
      }
    },
  },
  persist: true,
});
