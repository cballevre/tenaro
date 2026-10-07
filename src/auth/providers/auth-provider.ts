import type { AuthProvider } from '@refinedev/core';
import axios from "axios";

const authUrl = `${import.meta.env.VITE_API_URL}/auth`;

const authProvider: AuthProvider = {
  login: async ({ email }) => {

    console.log("email", email);

    if (email) {
      localStorage.setItem("email", email);
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        message: "Login failed",
        name: "Invalid email or password",
      },
    };
  },
  register: async ({ email, password }) => {
    
    if (email && password) {
      await axios.post(`${authUrl}/users/`, {
        email,
        password
      })
      return {
        success: true,
        redirectTo: "/",
      };
    }
    return {
      success: false,
      error: {
        message: "Register failed",
        name: "Invalid email or password",
      },
    };
  },
  updatePassword: async ({ password }) => {
    if (password) {
      //we can update password here
      return {
        success: true,
        redirectTo: "/login",
      };
    }
    return {
      success: false,
      error: {
        message: "Update password failed",
        name: "Invalid password",
      },
    };
  },
  forgotPassword: async ({ email }) => {
    if (email) {
      //we can send email with forgot password link here
      return {
        success: true,
        redirectTo: "/login",
      };
    }
    return {
      success: false,
      error: {
        message: "Forgot password failed",
        name: "Invalid email",
      },
    };
  },
  logout: async () => {
    localStorage.removeItem("email");
    return {
      success: true,
      redirectTo: "/",
    };
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
  check: async () => {
    return localStorage.getItem("email")
      ? { authenticated: true }
      : {
        authenticated: false,
        redirectTo: "/login",
        error: {
          message: "Check failed",
          name: "Not authenticated",
        },
      };
  },
  getPermissions: async () => ["admin"],
  getIdentity: async () => ({
    id: 1,
    name: "Jane Doe",
    avatar:
      "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
  }),
};

export { authProvider };
