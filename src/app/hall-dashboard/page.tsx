"use client";
import { useState, useEffect } from "react";
import { api } from "@/lib/utils";

const TING_SOUND = "/ting.mp3";

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
          <div key={idx} className="bg-white rounded shadow p-4 border border-slate-200 flex flex-col md:flex-row md:items-center md:gap-8 gap-2">
            <div className="flex-1">
              <div className="font-bold text-blue-700">Student ID: {card.studentId}</div>
              <div className="text-gray-800">Name: {card.name}</div>
              <div className="text-green-700 font-semibold">Has taken a meal.</div>
              <div className="text-gray-600 text-sm">Token left: {card.tokensLeft}</div>
            </div>
            <div className="text-xs text-gray-500">{card.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
