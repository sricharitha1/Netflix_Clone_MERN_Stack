import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

// ✅ Set backend API base URL and enable cookies
axios.defaults.baseURL = "http://localhost:9000";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
	user: null,
	isSigningUp: false,
	isCheckingAuth: true,
	isLoggingOut: false,
	isLoggingIn: false,

	// ✅ SIGNUP
	signup: async (credentials) => {
		set({ isSigningUp: true });
		try {
			const response = await axios.post("/api/v1/auth/signup", credentials);
			set({ user: response.data.user, isSigningUp: false });
			toast.success("Account created successfully");
		} catch (error) {
			console.error("Signup error:", error);
			toast.error(error.response?.data?.message || "Signup failed");
			set({ isSigningUp: false, user: null });
		}
	},

	// ✅ LOGIN
	login: async (credentials) => {
		set({ isLoggingIn: true });
		try {
			const response = await axios.post("/api/v1/auth/login", credentials);
			set({ user: response.data.user, isLoggingIn: false });
			toast.success("Login successful");
		} catch (error) {
			console.error("Login error:", error);
			toast.error(error.response?.data?.message || "Login failed");
			set({ isLoggingIn: false, user: null });
		}
	},

	// ✅ LOGOUT
	logout: async () => {
		set({ isLoggingOut: true });
		try {
			await axios.post("/api/v1/auth/logout");
			set({ user: null, isLoggingOut: false });
			toast.success("Logged out successfully");
		} catch (error) {
			console.error("Logout error:", error);
			toast.error(error.response?.data?.message || "Logout failed");
			set({ isLoggingOut: false });
		}
	},

	// ✅ AUTH CHECK (on app load)
	authCheck: async () => {
		set({ isCheckingAuth: true });
		try {
			const response = await axios.get("/api/v1/auth/authCheck");
			set({ user: response.data.user, isCheckingAuth: false });
		} catch (error) {
			console.warn("Auth check failed:", error);
			set({ isCheckingAuth: false, user: null });
		}
	},
}));
