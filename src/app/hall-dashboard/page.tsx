"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { api } from "@/lib/utils";

const TING_SOUND = "/ting.mp3";
const BUZZ_SOUND = "/buzz.mp3";
const WARNING_SOUND = "/ting.mp3";
const MEAL_LOCK_HOURS = 6;
const MENU_OPTIONS = [
  { name: "Rice", img: "/rice.jpeg" },
  { name: "Khichuri", img: "/khichuri.jpg" },
  { name: "Dal", img: "/dal.png" },
  { name: "Chicken Curry", img: "/chiken.jpg" },
  { name: "Fish Curry", img: "/fish.jpeg" },
  { name: "Egg Fry", img: "/dimvaji.jpg" },
  { name: "Vorta", img: "/vorta-platter.jpg" },
];

interface MealCard {
  studentId: string;
  name: string;
  tokensLeft: number;
  time: string;
  warning?: boolean;
  danger?: boolean;
  message?: string;
}

export default function HallDashboardPage() {
  const [studentId, setStudentId] = useState("");
  const [cards, setCards] = useState<MealCard[]>([]);
  const [count, setCount] = useState(0);
  const [finalMenu, setFinalMenu] = useState<string[]>([]);
  const [showMenuSidebar, setShowMenuSidebar] = useState(false);
  const [lastMealTimes, setLastMealTimes] = useState<{ [id: string]: number }>({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const menu = localStorage.getItem('finalMenu');
      if (menu) setFinalMenu(JSON.parse(menu));
    }
  }, []);

  // Fetch today's meal history with pagination
  async function fetchMealHistory(pageNum: number) {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const today = new Date().toISOString().slice(0, 10);
      const res = await fetch(`${apiUrl}/api/meal-history?date=${today}&page=${pageNum}&limit=10`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCards(
        data.mealHistories.map((entry: any) => ({
          studentId: entry.cuetId,
          name: entry.student?.name || "Unknown",
          tokensLeft: entry.student?.tokens ?? 0,
          time: new Date(entry.date).toLocaleTimeString(),
        }))
      );
      setCount(data.totalCount || 0);
      setPage(pageNum);
      setTotalPages(data.totalPages || 1);
    } catch {
      // fallback error
      setCards([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchMealHistory(1);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!studentId) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const now = new Date();
      const hour = now.getHours();
      const mealType = (hour >= 12 && hour < 15) ? "Lunch" : "Dinner";
      const res = await fetch(`${apiUrl}/api/meal-history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cuetId: studentId,
          meal: mealType
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        // Handle errorType from backend
        setCards([
          {
            studentId,
            name: data?.student?.name || "Unknown",
            tokensLeft: data?.student?.tokens ?? 0,
            time: new Date().toLocaleTimeString(),
            warning: data.errorType === 'warning',
            danger: data.errorType === 'danger',
            message: data.message,
          },
          ...cards,
        ]);
        setStudentId("");
        const audio = new Audio(data.errorType === 'danger' ? BUZZ_SOUND : WARNING_SOUND);
        audio.play();
        setLoading(false);
        return;
      }
      // On success, use backend response to make the card
      setCards([
        {
          studentId: data.student.cuetId,
          name: data.student.name,
          tokensLeft: data.student.tokens,
          time: new Date(data.date).toLocaleTimeString(),
        },
        ...cards,
      ]);
      fetchMealHistory(1);
      setStudentId("");
      const audio = new Audio(TING_SOUND);
      audio.play();
    } catch {
      setCards([
        {
          studentId,
          name: "Error",
          tokensLeft: 0,
          time: new Date().toLocaleTimeString(),
          danger: true,
          message: "Network error. Please try again.",
        },
        ...cards,
      ]);
      setStudentId("");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-5xl font-extrabold mb-10 text-center">Hall Dining Dashboard</h1>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:gap-8 gap-2">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="number"
            inputMode="numeric"
            pattern="\\d+"
            className="border p-2 rounded w-48"
            placeholder="Enter Student ID"
            value={studentId}
            onChange={e => setStudentId(e.target.value.replace(/[^0-9]/g, ""))}
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
        </form>
        <div className="text-lg font-semibold text-green-700">Meals taken today: <span className="font-bold">{count}</span></div>
      </div>
      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="text-center text-blue-600 font-semibold">Loading...</div>
        ) : (
          cards.map((card, idx) => (
            card.danger ? (
              <div key={idx} className="bg-red-100 border border-red-400 text-red-800 rounded shadow p-4 flex flex-col md:flex-row md:items-center md:gap-8 gap-2">
                <div className="flex-1">
                  <div className="font-bold text-red-700">Student ID: {card.studentId}</div>
                  <div className="text-gray-800">Name: {card.name}</div>
                  <div className="font-semibold">{card.message || 'Has tried to take a meal, but has no token left.'}</div>
                  <div className="text-gray-600 text-sm">Token left: {card.tokensLeft}</div>
                </div>
                <div className="text-xs text-gray-500">{card.time}</div>
              </div>
            ) : card.warning ? (
              <div key={idx} className="bg-yellow-100 border border-yellow-400 text-yellow-800 rounded shadow p-4 flex flex-col md:flex-row md:items-center md:gap-8 gap-2">
                <div className="flex-1">
                  <div className="font-bold text-yellow-700">Student ID: {card.studentId}</div>
                  <div className="text-gray-800">Name: {card.name}</div>
                  <div className="font-semibold">{card.message || 'You have taken one meal already. Wait another 6 hours for the next meal.'}</div>
                  <div className="text-gray-600 text-sm">Token left: {card.tokensLeft}</div>
                </div>
                <div className="text-xs text-gray-500">{card.time}</div>
              </div>
            ) : (
              <div key={idx} className="bg-white rounded shadow p-4 border border-slate-200 flex flex-col md:flex-row md:items-center md:gap-8 gap-2">
                <div className="flex-1">
                  <div className="font-bold text-blue-700">Student ID: {card.studentId}</div>
                  <div className="text-gray-800">Name: {card.name}</div>
                  <div className="text-green-700 font-semibold">Has taken a meal.</div>
                  <div className="text-gray-600 text-sm">Token left: {card.tokensLeft}</div>
                </div>
                <div className="text-xs text-gray-500">{card.time}</div>
              </div>
            )
          ))
        )}
      </div>
      {/* Pagination controls */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          disabled={page <= 1}
          onClick={() => fetchMealHistory(page - 1)}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
        >
          Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          disabled={page >= totalPages}
          onClick={() => fetchMealHistory(page + 1)}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
        >
          Next
        </button>
      </div>
      <button
        className="fixed top-1/2 right-0 z-40 bg-blue-600 text-white px-4 py-2 rounded-l hover:bg-blue-700 transition"
        style={{ transform: 'translateY(-50%)' }}
        onClick={() => setShowMenuSidebar(true)}
      >
        Show Today&apos;s Menu
      </button>
      {/* Sidebar for Today&apos;s Menu */}
      {showMenuSidebar && (
        <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transition-transform duration-300 flex flex-col">
          <button
            className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700"
            onClick={() => setShowMenuSidebar(false)}
            aria-label="Close menu sidebar"
          >
            &times;
          </button>
          <div className="p-8 pt-12 flex-1 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-center">Today&apos;s Menu</h2>
            <div className="flex flex-col gap-4 items-center">
              {finalMenu.length === 0 ? (
                <span className="text-gray-500">No menu selected yet.</span>
              ) : (
                finalMenu.map(item => {
                  const menu = MENU_OPTIONS.find(m => m.name === item);
                  return menu ? (
                    <div key={menu.name} className="flex flex-col items-center">
                      <Image src={menu.img} alt={menu.name} width={64} height={64} className="rounded object-cover mb-1" />
                      <span className="font-semibold text-lg">{menu.name}</span>
                    </div>
                  ) : null;
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
