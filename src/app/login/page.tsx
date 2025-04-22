"use client";
import React, { useState } from 'react';
import { api, setAuth } from "@/lib/utils";
import { useRouter } from "next/navigation";

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
      // Replace with your backend endpoint
      const res = await api.post("/auth/student/login", { studentId, pin });
      setAuth(res.data.token, "student");
      router.push("/home");
    } catch (err:any) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Student Login</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label htmlFor="studentId" className="font-medium">CUET ID</label>
        <input
          id="studentId"
          name="studentId"
          type="text"
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
          pattern="\\d{6}"
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