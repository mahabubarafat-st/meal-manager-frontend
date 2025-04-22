"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function showToast(message: string) {
    if (typeof window !== "undefined") {
      const toast = document.createElement('div');
      toast.textContent = message;
      toast.className = 'fixed top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50 text-lg font-bold animate-bounce';
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.remove();
      }, 2000);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "arafat@cuet.ac.bd" && password === "cuetcuet") {
      showToast("Welcome admin. Login successful");
      router.push("/admin/reports");
    } else {
      showToast("Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-5xl font-extrabold mb-10 text-center">Admin Login</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label htmlFor="adminEmail" className="font-medium">Email</label>
        <input
          id="adminEmail"
          name="adminEmail"
          type="email"
          className="border p-2 rounded"
          placeholder="Enter admin email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="adminPassword" className="font-medium">Password</label>
        <input
          id="adminPassword"
          name="adminPassword"
          type="password"
          className="border p-2 rounded"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-green-600 text-white py-2 rounded hover:bg-green-700">Login</button>
      </form>
    </div>
  );
}