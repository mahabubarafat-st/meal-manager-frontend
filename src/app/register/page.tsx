"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function showToast(message: string) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.className = 'fixed top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50 text-lg font-bold animate-bounce';
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 2000);
}

export default function StudentRegisterPage() {
  const [form, setForm] = useState({
    id: "",
    phone: "",
    email: "",
    pin: "",
    confirmPin: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.id || !form.phone || !form.email || !form.pin || !form.confirmPin) {
      setError("All fields are required.");
      return;
    }
    if (form.pin !== form.confirmPin) {
      setError("PIN and Confirm PIN do not match.");
      return;
    }
    // Here you would send the registration data to the backend
    // For now, just show toast and redirect to home
    showToast("Registration successful!");
    setTimeout(() => {
      router.push("/login");
    }, 1200);
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow mt-10">
      <h1 className="text-3xl font-extrabold mb-6 text-center">Student Registration</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-gray-700 font-semibold">Student ID</label>
        <input
          name="id"
          type="number"
          className="border p-2 rounded w-full"
          placeholder="Student ID"
          value={form.id}
          onChange={handleChange}
        />
        <label className="block text-gray-700 font-semibold">Phone Number</label>
        <input
          name="phone"
          type="tel"
          className="border p-2 rounded w-full"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />
        <label className="block text-gray-700 font-semibold">Email</label>
        <input
          name="email"
          type="email"
          className="border p-2 rounded w-full"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <label className="block text-gray-700 font-semibold">PIN</label>
        <input
          name="pin"
          type="password"
          className="border p-2 rounded w-full"
          placeholder="PIN"
          value={form.pin}
          onChange={handleChange}
        />
        <label className="block text-gray-700 font-semibold">Confirm PIN</label>
        <input
          name="confirmPin"
          type="password"
          className="border p-2 rounded w-full"
          placeholder="Confirm PIN"
          value={form.confirmPin}
          onChange={handleChange}
        />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Register</button>
      </form>
    </div>
  );
}
