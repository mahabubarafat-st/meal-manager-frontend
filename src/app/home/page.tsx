export default function HomePage() {
  // Fake data
  const balance = 1250.75;
  const mealHistory = [
    { date: "2025-04-21", meal: "Lunch", amount: 40 },
    { date: "2025-04-21", meal: "Dinner", amount: 40 },
    // { date: "2025-04-19", meal: "Breakfast", amount: 40 },
    { date: "2025-04-19", meal: "Lunch", amount: 40 },
    { date: "2025-04-19", meal: "Dinner", amount: 40 },
  ];
  const stats = {
    week: 10,
    month: 42,
    favoriteMeal: "Lunch",
    lastRecharge: "2025-04-15",
    totalSpent: 1200,
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-5xl font-extrabold mb-10 text-center">Home</h1>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Token Balance</h2>
        <div className="text-3xl font-bold text-green-700">৳ {balance.toFixed(2)}</div>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Meal History</h2>
        <ul className="divide-y divide-gray-200 bg-slate-50 rounded">
          {mealHistory.map((item, idx) => (
            <li key={idx} className="flex justify-between items-center py-2 px-2">
              <span className="font-medium text-gray-800">{item.meal}</span>
              <span className="text-gray-500 text-sm">{item.date}</span>
              <span className="text-blue-700 font-semibold">৳ {item.amount}</span>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-lg font-semibold mb-2">Statistics</h2>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="bg-green-100 rounded p-4 flex flex-col items-center shadow-sm">
            <span className="text-2xl font-bold text-green-700">{stats.week}</span>
            <span className="text-gray-600 text-sm">Meals this week</span>
          </div>
          <div className="bg-blue-100 rounded p-4 flex flex-col items-center shadow-sm">
            <span className="text-2xl font-bold text-blue-700">{stats.month}</span>
            <span className="text-gray-600 text-sm">Meals this month</span>
          </div>
          {/* <div className="bg-yellow-100 rounded p-4 flex flex-col items-center shadow-sm col-span-2">
            <span className="text-lg font-semibold text-yellow-700">Favorite: {stats.favoriteMeal}</span>
          </div> */}
          <div className="bg-purple-100 rounded p-4 flex flex-col items-center shadow-sm">
            <span className="text-lg font-bold text-purple-700">৳ {stats.totalSpent}</span>
            <span className="text-gray-600 text-sm">Total Spent</span>
          </div>
          <div className="bg-pink-100 rounded p-4 flex flex-col items-center shadow-sm">
            <span className="text-lg font-bold text-pink-700">{stats.lastRecharge}</span>
            <span className="text-gray-600 text-sm">Last Recharge</span>
          </div>
        </div>
      </section>
      <div className="mt-8">
        <a href="/recharge" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Recharge Balance</a>
      </div>
    </div>
  );
}