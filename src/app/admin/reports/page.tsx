import React from 'react';

export default function AdminReportsPage() {
  // Dummy data
  const budget = 50000;
  const spent = 37250;
  const remaining = budget - spent;
  const mealsMonthly = [
    { month: "Jan", count: 320 },
    { month: "Feb", count: 280 },
    { month: "Mar", count: 350 },
    { month: "Apr", count: 300 },
  ];
  const mealsDaily = [
    { day: "Mon", count: 48 },
    { day: "Tue", count: 52 },
    { day: "Wed", count: 50 },
    { day: "Thu", count: 47 },
    { day: "Fri", count: 55 },
    { day: "Sat", count: 40 },
    { day: "Sun", count: 38 },
  ];
  const avgMealPerDay = (mealsDaily.reduce((a, b) => a + b.count, 0) / mealsDaily.length).toFixed(1);

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Admin Reports</h1>
      <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 rounded p-6 flex flex-col items-center shadow-sm">
          <span className="text-lg text-gray-600">Overall Budget</span>
          <span className="text-2xl font-bold text-blue-700">৳ {budget.toLocaleString()}</span>
        </div>
        <div className="bg-red-100 rounded p-6 flex flex-col items-center shadow-sm">
          <span className="text-lg text-gray-600">Total Spent</span>
          <span className="text-2xl font-bold text-red-700">৳ {spent.toLocaleString()}</span>
        </div>
        <div className="bg-green-100 rounded p-6 flex flex-col items-center shadow-sm">
          <span className="text-lg text-gray-600">Budget Remaining</span>
          <span className="text-2xl font-bold text-green-700">৳ {remaining.toLocaleString()}</span>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Meals Taken Monthly</h2>
        <div className="flex gap-4 items-end h-40">
          {mealsMonthly.map((m, idx) => (
            <div key={idx} className="flex flex-col items-center w-16">
              <div
                className="bg-blue-500 rounded-t w-8 transition-all"
                style={{ height: `${m.count / 4}px` }}
                title={`${m.count} meals`}
              ></div>
              <span className="mt-2 text-sm text-gray-700">{m.month}</span>
              <span className="text-xs text-blue-700 font-semibold">{m.count}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Meals Taken Daily</h2>
        <div className="flex gap-2 items-end h-32">
          {mealsDaily.map((d, idx) => (
            <div key={idx} className="flex flex-col items-center w-10">
              <div
                className="bg-green-500 rounded-t w-6 transition-all"
                style={{ height: `${d.count * 2}px` }}
                title={`${d.count} meals`}
              ></div>
              <span className="mt-1 text-xs text-gray-700">{d.day}</span>
              <span className="text-xs text-green-700 font-semibold">{d.count}</span>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-lg font-semibold mb-2">Average Meal Intake Per Day</h2>
        <div className="flex items-center gap-4 mt-2">
          <div className="bg-purple-100 rounded p-6 flex flex-col items-center shadow-sm">
            <span className="text-3xl font-bold text-purple-700">{avgMealPerDay}</span>
            <span className="text-gray-600 text-sm">meals/day (this week)</span>
          </div>
        </div>
      </section>
    </div>
  );
}