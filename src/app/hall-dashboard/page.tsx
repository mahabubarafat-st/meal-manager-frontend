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
}

export default function HallDashboardPage() {
  const [studentId, setStudentId] = useState("");
  const [cards, setCards] = useState<MealCard[]>([]);
  const [count, setCount] = useState(0);
  const [finalMenu, setFinalMenu] = useState<string[]>([]);
  const [showMenuSidebar, setShowMenuSidebar] = useState(false);
  const [lastMealTimes, setLastMealTimes] = useState<{ [id: string]: number }>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const menu = localStorage.getItem('finalMenu');
      if (menu) setFinalMenu(JSON.parse(menu));
    }
  }, []);

  // Dummy name/token generator
  function getStudentInfo(id: string) {
    // In real app, fetch from backend
    const names = ["John Doe", "Jane Smith", "Alice Rahman", "Bob Hasan", "Sara Akter", "Imran Khan", "Mitu Das"];
    const idx = parseInt(id.slice(-1)) % names.length;
    return {
      name: names[idx],
      tokensLeft: 30 - (cards.length % 31),
    };
  }

  // Add backend integration for student info
  async function fetchStudentInfo(id: string) {
    try {
      const res = await api.get(`/students/${id}`);
      return {
        name: res.data.name,
        tokensLeft: res.data.tokensLeft,
      };
    } catch {
      // fallback to dummy data
      return getStudentInfo(id);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!studentId) return;
    // Special validation for student with id 170101 and zero tokens
    if (studentId === "170101") {
      setCards([
        {
          studentId,
          name: "Free Khor",
          tokensLeft: 0,
          time: new Date().toLocaleTimeString(),
        },
        ...cards,
      ]);
      setCount(count + 1);
      setStudentId("");
      // Play buzz sound
      const audio = new Audio(BUZZ_SOUND);
      audio.play();
      return;
    }
    // 6-hour lock validation for any student
    const now = Date.now();
    const lastTime = lastMealTimes[studentId];
    if (lastTime && now - lastTime < MEAL_LOCK_HOURS * 60 * 60 * 1000) {
      setCards([
        {
          studentId,
          name: "John Doe",
          tokensLeft: 30,
          time: new Date().toLocaleTimeString(),
          warning: true,
        } as any,
        ...cards,
      ]);
      setStudentId("");
      // Play warning sound
      const audio = new Audio(WARNING_SOUND);
      audio.play();
      return;
    } else {
      // Update last meal time
      setLastMealTimes(prev => ({ ...prev, [studentId]: now }));
    }
    const info = await fetchStudentInfo(studentId);
    setCards([
      {
        studentId,
        name: info.name,
        tokensLeft: info.tokensLeft,
        time: new Date().toLocaleTimeString(),
      },
      ...cards,
    ]);
    setCount(count + 1);
    setStudentId("");
    // Play ting sound
    const audio = new Audio(TING_SOUND);
    audio.play();
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
        {cards.map((card, idx) => (
          card.tokensLeft === 0 && card.studentId === "170101" ? (
            <div key={idx} className="bg-red-100 border border-red-400 text-red-800 rounded shadow p-4 flex flex-col md:flex-row md:items-center md:gap-8 gap-2">
              <div className="flex-1">
                <div className="font-bold text-red-700">Student ID: {card.studentId}</div>
                <div className="text-gray-800">Name: {card.name}</div>
                <div className="font-semibold">Has tried to take a meal, but has <span className="text-red-700 font-bold">no token left</span>.</div>
                <div className="text-gray-600 text-sm">Token left: {card.tokensLeft}</div>
              </div>
              <div className="text-xs text-gray-500">{card.time}</div>
            </div>
          ) : (card as any).warning ? (
            <div key={idx} className="bg-yellow-100 border border-yellow-400 text-yellow-800 rounded shadow p-4 flex flex-col md:flex-row md:items-center md:gap-8 gap-2">
              <div className="flex-1">
                <div className="font-bold text-yellow-700">Student ID: {card.studentId}</div>
                <div className="text-gray-800">Name: {card.name}</div>
                <div className="font-semibold">You have taken one meal already. <span className="text-yellow-700 font-bold">Wait another 6 hours for the next meal.</span></div>
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
        ))}
      </div>
      <button
        className="fixed top-1/2 right-0 z-40 bg-blue-600 text-white px-4 py-2 rounded-l hover:bg-blue-700 transition"
        style={{ transform: 'translateY(-50%)' }}
        onClick={() => setShowMenuSidebar(true)}
      >
        Show Today's Menu
      </button>
      {/* Sidebar for Today's Menu */}
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
            <h2 className="text-2xl font-bold mb-4 text-center">Today's Menu</h2>
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
