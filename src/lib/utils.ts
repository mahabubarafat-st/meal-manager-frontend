import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Axios instance for API calls
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000", // Change as needed
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth helpers
export function setAuth(token: string, role: string) {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  delete api.defaults.headers.common["Authorization"];
}

export function getRole() {
  return localStorage.getItem("role");
}

export function getToken() {
  return localStorage.getItem("token");
}

export function isAuthenticated() {
  return !!getToken();
}
