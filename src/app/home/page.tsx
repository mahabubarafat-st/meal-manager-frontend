"use client";
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [balance, setBalance] = useState<number | null>(null);
  const [mealHistory, setMealHistory] = useState<any[]>([]);
  const [stats, setStats] = useState<any | null>(null);
  const [transactionHistory, setTransactionHistory] = useState<any[]>([]);
  const [showTransactions, setShowTransactions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        // Get token and user id from localStorage (or your auth context)
        const token = localStorage.getItem('token');
        const studentId = localStorage.getItem('studentId');
        if (!token || !studentId) {
          setError('Not logged in');
          setLoading(false);
          return;
        }
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${apiUrl}/api/students/${studentId}/home`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setBalance(data.tokens);
        setMealHistory(data.mealHistory || []);
        setStats({ ...data.stats, name: data.name, cuetId: data.cuetId });
        setTransactionHistory(data.transactionHistory || []);
      } catch (e: any) {
        setError(e.message || 'Error loading data');
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('studentId');
    localStorage.removeItem('studentName');
    window.location.href = '/login';
  }

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  // Fallback hardcoded data if backend data is not loaded
  const fallback = {
    balance: 120,
    mealHistory: [
      { date: "2025-04-21", meal: "Lunch", amount: 40 },
      { date: "2025-04-21", meal: "Dinner", amount: 40 },
      { date: "2025-04-19", meal: "Lunch", amount: 40 },
      { date: "2025-04-19", meal: "Dinner", amount: 40 },
    ],
    stats: {
      week: 10,
      month: 42,
      favoriteMeal: "Lunch",
      lastRecharge: "2025-04-15",
      totalSpent: 1200,
      name: "Arafat Rahman",
      cuetId: "17030316",
    },
  };

  const showFallback = error || balance === null;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-5xl font-extrabold mb-10 text-center">Home</h1>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Token Balance</h2>
        <div className="text-3xl font-bold text-green-700"> {showFallback ? fallback.balance : balance}</div>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Student Info</h2>
        <div className="flex flex-col gap-1 text-gray-700">
          <span><b>Name:</b> {showFallback ? fallback.stats.name : stats?.name ?? '-'}</span>
          <span><b>CUET ID:</b> {showFallback ? fallback.stats.cuetId : stats?.cuetId ?? '-'}</span>
        </div>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Meal History</h2>
        <ul className="divide-y divide-gray-200 bg-slate-50 rounded">
          {(showFallback ? fallback.mealHistory : mealHistory).length === 0 && <li className="py-2 px-2 text-gray-500">No meals</li>}
          {(showFallback ? fallback.mealHistory : mealHistory).map((item, idx) => (
            <li key={idx} className="flex justify-between items-center py-2 px-2">
              <span className="font-medium text-gray-800">{item.meal}</span>
              <span className="text-gray-500 text-sm">{item.date ? new Date(item.date).toLocaleString() : ''}</span>
              <span className="text-green-700 font-semibold">৳ {item.amount ?? '-'}</span>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-lg font-semibold mb-2">Statistics</h2>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="bg-green-100 rounded p-4 flex flex-col items-center shadow-sm">
            <span className="text-2xl font-bold text-green-700">{showFallback ? fallback.stats.week : stats?.week ?? '-'}</span>
            <span className="text-gray-600 text-sm">Meals this week</span>
          </div>
          <div className="bg-blue-100 rounded p-4 flex flex-col items-center shadow-sm">
            <span className="text-2xl font-bold text-blue-700">{showFallback ? fallback.stats.month : stats?.month ?? '-'}</span>
            <span className="text-gray-600 text-sm">Meals this month</span>
          </div>
          <div className="bg-purple-100 rounded p-4 flex flex-col items-center shadow-sm">
            <span className="text-lg font-bold text-purple-700">{showFallback ? fallback.stats.favoriteMeal : stats?.favoriteMeal ?? '-'}</span>
            <span className="text-gray-600 text-sm">Favorite Meal</span>
          </div>
          <div className="bg-pink-100 rounded p-4 flex flex-col items-center shadow-sm">
            <span className="text-lg font-bold text-pink-700">{showFallback ? fallback.stats.lastRecharge : stats?.lastRecharge ? new Date(stats.lastRecharge).toLocaleString() : '-'}</span>
            <span className="text-gray-600 text-sm">Last Recharge</span>
          </div>
          <div className="bg-yellow-100 rounded p-4 flex flex-col items-center shadow-sm col-span-2">
            <span className="text-lg font-bold text-yellow-700">৳ {showFallback ? fallback.stats.totalSpent : stats?.totalSpent ?? '-'}</span>
            <span className="text-gray-600 text-sm">Total Spent</span>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
            onClick={() => setShowTransactions((v) => !v)}
          >
            {showTransactions ? 'Hide' : 'Show'} Transaction History
          </button>
        </div>
        {showTransactions && (
          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">Last 6 Transactions</h3>
            <ul className="divide-y divide-gray-200 bg-slate-50 rounded">
              {transactionHistory.length === 0 && <li className="py-2 px-2 text-gray-500">No transactions</li>}
              {transactionHistory.map((item, idx) => (
                <li key={idx} className="flex justify-between items-center py-2 px-2">
                  <span className="font-medium text-gray-800">{item.type === 'charge' ? 'Recharge' : 'Deduct'}</span>
                  <span className="text-gray-500 text-sm">{item.date ? new Date(item.date).toLocaleString() : ''}</span>
                  <span className={item.type === 'charge' ? 'text-green-700 font-semibold' : 'text-red-700 font-semibold'}>
                    {item.type === 'charge' ? '+' : '-'}৳ {item.amount}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
      <div className="mt-8 flex justify-between items-center">
        <a href="/recharge" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Buy Token</a>
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Logout</button>
      </div>
    </div>
  );
}