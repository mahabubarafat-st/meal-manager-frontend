import React from 'react';

export default function AdminSettingsPage() {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-5xl font-extrabold mb-10 text-center">Admin Settings</h1>
      <form className="flex flex-col gap-4">
        <label htmlFor="mealPlan" className="font-medium">Meal Plan</label>
        <input id="mealPlan" name="mealPlan" type="text" className="border p-2 rounded" placeholder="Update meal plan" />
        <label htmlFor="restrictions" className="font-medium">Restrictions</label>
        <input id="restrictions" name="restrictions" type="text" className="border p-2 rounded" placeholder="Update restrictions" />
        <button type="submit" className="bg-green-600 text-white py-2 rounded hover:bg-green-700">Save Changes</button>
      </form>
    </div>
  );
}