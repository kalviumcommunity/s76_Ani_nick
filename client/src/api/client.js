import axios from "axios";
import { auth } from "../firebase/config";

/**
 * Central axios instance.
 * Every request automatically attaches the current user's Firebase ID token
 * as an Authorization header — no need to add it manually in each component.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://s76-ani-nick-1.onrender.com/api",
});

// Request interceptor: attach the Firebase ID token before every request
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
