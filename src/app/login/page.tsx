"use client";
import React, { useState } from 'react';
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

export default function LoginPage() {
  const [studentId, setStudentId] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cuetId: studentId, pin }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Invalid CUET ID or PIN');
        setLoading(false);
        return;
      }
      // Save token and student info to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('studentId', data.student.cuetId);
      localStorage.setItem('id', data.student.id);
      localStorage.setItem('studentName', data.student.name);
      showToast("Login successful!");
      setTimeout(() => {
        router.push("/home");
      }, 1200);
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-5xl font-extrabold mb-10 text-center">Student Login</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label htmlFor="studentId" className="font-medium">CUET ID</label>
        <input
          id="studentId"
          name="studentId"
          type="number"
          inputMode="numeric"
          pattern="\\d+"
          className="border p-2 rounded"
          placeholder="Enter your CUET ID"
          value={studentId}
          onChange={e => {
            // Only allow numbers
            const val = e.target.value.replace(/[^0-9]/g, "");
            setStudentId(val);
          }}
          required
        />
        <label htmlFor="pin" className="font-medium">PIN</label>
        <input
          id="pin"
          name="pin"
          type="password"
          inputMode="numeric"
          maxLength={6}
          minLength={6}
          className="border p-2 rounded"
          placeholder="6-digit PIN"
          value={pin}
          onChange={e => {
            // Only allow numbers
            const val = e.target.value.replace(/[^0-9]/g, "");
            setPin(val);
          }}
          required
        />
        <button type="submit" className="bg-green-600 text-white py-2 rounded hover:bg-green-700" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      </form>
    </div>
  );
}