import React from 'react';

export default function SettingsPage() {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-5xl font-extrabold mb-10 text-center">Settings</h1>
      <form className="flex flex-col gap-4">
        <label htmlFor="email" className="font-medium">Email</label>
        <input id="email" name="email" type="email" className="border p-2 rounded" placeholder="Update your email" />
        <label htmlFor="phone" className="font-medium">Phone</label>
        <input id="phone" name="phone" type="tel" className="border p-2 rounded" placeholder="Update your phone number" />
        <button type="submit" className="bg-green-600 text-white py-2 rounded hover:bg-green-700">Save Changes</button>
      </form>
    </div>
  );
}