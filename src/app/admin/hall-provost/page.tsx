"use client"

import React, { useState } from "react";

interface ReportEntry {
  studentId: string;
  name: string;
  type: "warning" | "invalid";
  time: string;
  reason: string;
}

const hardcodedReports: ReportEntry[] = [
  {
    studentId: "170101",
    name: "Free Khor",
    type: "invalid",
    time: "09:15:23",
    reason: "No token left, tried to take meal",
  },
  {
    studentId: "170102",
    name: "Jane Smith",
    type: "warning",
    time: "10:45:12",
    reason: "Tried to take meal before 6-hour lock expired",
  },
  {
    studentId: "170103",
    name: "Imran Khan",
    type: "invalid",
    time: "12:30:45",
    reason: "No token left, tried to take meal",
  },
  {
    studentId: "170104",
    name: "Sara Akter",
    type: "invalid",
    time: "13:05:10",
    reason: "Tried to take meal before 6-hour lock expired",
  },
];

export default function HallProvostDashboard() {
  const [selectedDate, setSelectedDate] = useState<string>("2025-04-25");
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState<ReportEntry[]>([]);
  const [searched, setSearched] = useState(false);

  function handleSearch() {
    setLoading(true);
    setSearched(true);
    setReports([]);
    setTimeout(() => {
      // Randomly select 1-4 reports for demo
      const count = Math.floor(Math.random() * hardcodedReports.length) + 1;
      const shuffled = [...hardcodedReports].sort(() => 0.5 - Math.random());
      setReports(shuffled.slice(0, count));
      setLoading(false);
    }, 1000);
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center">Hall Provost Dashboard</h1>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:gap-8 gap-2">
        <label className="font-semibold">Select Date: </label>
        <input
          type="date"
          className="border p-2 rounded"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2 md:mt-0"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="flex flex-col gap-4 min-h-[120px]">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
            <span className="ml-4 text-blue-700 font-semibold">Loading...</span>
          </div>
        ) : searched ? (
          reports.length === 0 ? (
            <div className="text-gray-500 text-center">No reports for this date.</div>
          ) : (
            reports.map((entry, idx) => (
              <div
                key={idx}
                className={`p-4 rounded shadow flex flex-col md:flex-row md:items-center md:gap-8 gap-2 border ${
                  entry.type === "invalid"
                    ? "bg-red-100 border-red-400 text-red-800"
                    : "bg-yellow-100 border-yellow-400 text-yellow-800"
                }`}
              >
                <div className="flex-1">
                  <div className="font-bold">
                    Student ID: {entry.studentId}
                  </div>
                  <div>Name: {entry.name}</div>
                  <div className="font-semibold">{entry.reason}</div>
                </div>
                <div className="text-xs text-gray-500">{entry.time}</div>
              </div>
            ))
          )
        ) : null}
      </div>
    </div>
  );
}
