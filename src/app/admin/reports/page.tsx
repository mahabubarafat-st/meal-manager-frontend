import React from 'react';

export default function AdminReportsPage() {
  // Dummy data
  const budget = 960000;
  const spent = 372500;
  const remaining = budget - spent;
  const mealsMonthly = [
    { month: "Apr", count: 20000 },
    { month: "Mar", count: 22500 },
    { month: "Feb", count: 28020 },
    { month: "Jan", count: 12050 },
    { month: "Dec", count: 25000 },
    { month: "Nov", count: 28000 },
    { month: "Oct", count: 22500 },
    { month: "Sep", count: 18000 },
    { month: "Aug", count: 19500 },
    { month: "Jul", count: 22500 },
    { month: "June", count: 18000 },
  ];
  const mealsDaily = [
    { day: "Mon", count: 480 },
    { day: "Tue", count: 520 },
    { day: "Wed", count: 500 },
    { day: "Thu", count: 470 },
    { day: "Fri", count: 550 },
    { day: "Sat", count: 400 },
    { day: "Sun", count: 380 },
    { day: "Mon", count: 480 },
    { day: "Tue", count: 520 },
    { day: "Wed", count: 500 },
    { day: "Thu", count: 470 },
    { day: "Fri", count: 550 },
    { day: "Sat", count: 400 },
    { day: "Sun", count: 380 },
    { day: "Sun", count: 380 },
  ];
  const avgMealPerDay = (mealsDaily.reduce((a, b) => a + b.count, 0) / mealsDaily.length).toFixed(1);
  // Dummy data for meals taken today
  const mealsToday = 530;

  // Find max values for scaling
  const maxMonthly = Math.max(...mealsMonthly.map(m => m.count));
  const maxDaily = Math.max(...mealsDaily.map(d => d.count));

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-5xl font-extrabold mb-10 text-center">Admin Reports</h1>
      <section className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
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
        <div className="bg-yellow-100 rounded p-6 flex flex-col items-center shadow-sm">
          <span className="text-lg text-gray-600">Meals Taken Today</span>
          <span className="text-2xl font-bold text-yellow-700">{mealsToday}</span>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Meals Taken Monthly</h2>
        <div className="flex gap-2 items-end h-64 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {mealsMonthly.map((m, idx) => (
            <div key={idx} className="flex flex-col items-center w-14 min-w-[3.5rem]">
              <div
                className="bg-blue-500 rounded-t w-8 transition-all"
                style={{ height: `${(m.count / maxMonthly) * 220}px` }}
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
        <div className="flex gap-1 items-end h-40 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {mealsDaily.map((d, idx) => (
            <div key={idx} className="flex flex-col items-center w-10 min-w-[2.5rem]">
              <div
                className="bg-green-500 rounded-t w-6 transition-all"
                style={{ height: `${(d.count / maxDaily) * 120}px` }}
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