import React from 'react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold mb-4">Welcome to Meal Manager!</h1>
      <p className="text-lg text-slate-600">Manage your meals, view your profile, and more from the navigation menu.</p>
      <div className="flex justify-center mt-10">
        <a href="/login" className="bg-green-600 text-white px-6 py-3 rounded text-lg font-bold hover:bg-green-700 transition-colors">Student Login</a>
      </div>
    </div>
  );
}