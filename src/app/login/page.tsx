import React from 'react';

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Student Login</h1>
      <form className="flex flex-col gap-4">
        <label htmlFor="studentId" className="font-medium">CUET ID</label>
        <input id="studentId" name="studentId" type="text" className="border p-2 rounded" placeholder="Enter your CUET ID" />
        <button type="submit" className="bg-green-600 text-white py-2 rounded hover:bg-green-700">Login</button>
      </form>
    </div>
  );
}