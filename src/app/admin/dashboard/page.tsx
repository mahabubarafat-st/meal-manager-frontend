"use client";
import React, { useState } from 'react';
import Image from 'next/image';

type Recharge = { date: string; amount: number };
type Student = {
  id: string;
  name: string;
  token: number;
  pin: string;
  email: string;
  room: string;
  mealsTaken: number;
  tokensLeft: number;
  rechargeHistory: Recharge[];
};

const students: Student[] = [
  {
    id: '1703037',
    name: 'Arafat Rahman',
    token: 60,
    pin: '4321',
    email: 'arafat@cuet.ac.bd',
    room: 'B-201',
    mealsTaken: 120,
    tokensLeft: 8,
    rechargeHistory: [
      { date: '2025-04-01', amount: 1000 },
      { date: '2025-03-15', amount: 800 },
      { date: '2025-02-20', amount: 1200 },
    ],
  },
  {
    id: '1703042',
    name: 'Nusrat Jahan',
    token: 45,
    pin: '5678',
    email: 'nusrat@cuet.ac.bd',
    room: 'G-105',
    mealsTaken: 98,
    tokensLeft: 12,
    rechargeHistory: [
      { date: '2025-04-10', amount: 900 },
      { date: '2025-03-20', amount: 1100 },
    ],
  },
  {
    id: '1703055',
    name: 'Tanvir Hasan',
    token: 72,
    pin: '8765',
    email: 'tanvir@cuet.ac.bd',
    room: 'C-303',
    mealsTaken: 134,
    tokensLeft: 5,
    rechargeHistory: [
      { date: '2025-04-05', amount: 1500 },
      { date: '2025-03-12', amount: 700 },
    ],
  },
];

const MENU_OPTIONS = [
  { name: "Rice", img: "/rice.jpeg" },
  { name: "Khichuri", img: "/khichuri.jpg" },
  { name: "Dal", img: "/dal.png" },
  { name: "Chicken Curry", img: "/chiken.jpg" },
  { name: "Fish Curry", img: "/fish.jpeg" },
  { name: "Egg Fry", img: "/dimvaji.jpg" },
  { name: "Vorta", img: "/vorta-platter.jpg" },
];

export default function AdminDashboardPage() {
  const [inputId, setInputId] = useState('');
  const [student, setStudent] = useState<Student | null>(null);
  const [sidebarMode, setSidebarMode] = useState<null | 'view' | 'update'>(null);
  const [notFound, setNotFound] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string[]>([]);
  const [finalMenu, setFinalMenu] = useState<string[]>([]);
  const [updateForm, setUpdateForm] = useState<Student | undefined>(undefined);

  const handleValidate = () => {
    const found = students.find(s => s.id === inputId);
    if (found) {
      setStudent(found);
      setNotFound(false);
    } else {
      setStudent(null);
      setNotFound(true);
    }
  };

  const handleDelete = () => {
    setStudent(null);
  };

  const handleView = () => {
    setSidebarMode('view');
  };

  const handleUpdate = () => {
    if (student) setUpdateForm({ ...student });
    setSidebarMode('update');
  };

  const closeSidebar = () => setSidebarMode(null);

  const handleUpdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!updateForm) return;
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!updateForm) return;
    setStudent({ ...updateForm });
    setSidebarMode(null);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow relative">
      <h1 className="text-5xl font-extrabold mb-10 text-center">Admin Dashboard</h1>
      {/* Student search/view/update */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Scan Student ID</h2>
        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="Enter or scan student CUET ID"
          value={inputId}
          onChange={e => setInputId(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleValidate(); } }}
        />
        <button
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleValidate}
        >
          Search
        </button>
      </section>
      {student && (
        <section className="mb-6">
          <div className="bg-gray-100 rounded p-4 flex items-center justify-between shadow">
            <div>
              <div className="font-bold text-lg">{student.name}</div>
              <div className="text-gray-600 text-sm">ID: {student.id}</div>
            </div>
            <div className="flex gap-2">
              <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={handleView}>View</button>
              <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={handleUpdate}>Update</button>
              <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </section>
      )}
      {notFound && (
        <section className="mb-6">
          <div className="bg-red-100 rounded p-4 flex items-center justify-between shadow">
            <div className="font-bold text-lg text-red-700">Student not found</div>
            <div className="text-gray-600 text-sm">No student with ID: {inputId}</div>
          </div>
        </section>
      )}
      {/* Sidebar Drawer */}
      {sidebarMode && student && (
        <div className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-white shadow-lg z-50 transition-transform duration-300" style={{transform: 'translateX(0)'}}>
          <button className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700" onClick={closeSidebar}>&times;</button>
          <div className="p-8 pt-12">
            {sidebarMode === 'view' && (
              <>
                <h3 className="text-xl font-bold mb-2">Student Info</h3>
                <div className="mb-2"><b>ID:</b> {student.id}</div>
                <div className="mb-2"><b>Name:</b> {student.name}</div>
                <div className="mb-2"><b>Meals Taken:</b> {student.mealsTaken}</div>
                <div className="mb-2"><b>Tokens Left:</b> {student.tokensLeft}</div>
                <div className="mb-2"><b>Recharge History:</b>
                  <ul className="list-disc ml-6">
                    {student.rechargeHistory.map((r: Recharge, i: number) => (
                      <li key={i}>{r.date}: ৳{r.amount}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
            {sidebarMode === 'update' && updateForm && (
              <>
                <h3 className="text-xl font-bold mb-4">Update Student Info</h3>
                <form onSubmit={handleUpdateSubmit} className="space-y-3">
                  <div className="mb-2"><b>Tokens Left</b> </div>
                  <input name="token" value={updateForm.token} onChange={handleUpdateChange} className="border p-2 rounded w-full" placeholder="Token Number" />
                  <div className="mb-2"><b>Pin:</b> </div>
                  <input name="pin" value={updateForm.pin} onChange={handleUpdateChange} className="border p-2 rounded w-full" placeholder="PIN" />
                  <div className="mb-2"><b>Email:</b> </div>
                  <input name="email" value={updateForm.email} onChange={handleUpdateChange} className="border p-2 rounded w-full" placeholder="Email" />
                  <div className="mb-2"><b>Name:</b> </div>
                  <input name="name" value={updateForm.name} onChange={handleUpdateChange} className="border p-2 rounded w-full" placeholder="Name" />
                  <div className="mb-2"><b>Room No:</b> </div>
                  <input name="room" value={updateForm.room} onChange={handleUpdateChange} className="border p-2 rounded w-full" placeholder="Room Number" />
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Save</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
      {/* Meal and Money Stats */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2"> Money Statics</h2>
        <div className="text-gray-700">Excess Money: ৳ 10000</div>
        <div className="text-gray-700">Total Expenditure: ৳ 420420</div>
      </section>
      <section>
        <h2 className="text-lg font-semibold mb-2">Meal Statistics</h2>
        <div className="text-gray-700">Border: 600</div>
        <div className="text-gray-700">Total Meals Served: 1246</div>
      </section>
      {/* Menu selection section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Today&apos;s Menu Selection</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {MENU_OPTIONS.map(option => (
            <label
              key={option.name}
              className={`cursor-pointer border rounded p-2 flex flex-col items-center gap-2 ${
                selectedMenu.includes(option.name)
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              <Image
                src={option.img}
                alt={option.name}
                width={64}
                height={64}
                className="object-cover rounded bg-gray-200"
              />
              <span>{option.name}</span>
              <input
                type="checkbox"
                checked={selectedMenu.includes(option.name)}
                onChange={e => {
                  if (e.target.checked) {
                    setSelectedMenu([...selectedMenu, option.name]);
                  } else {
                    setSelectedMenu(selectedMenu.filter(n => n !== option.name));
                  }
                }}
                className="mt-1"
              />
            </label>
          ))}
        </div>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => setFinalMenu(selectedMenu)}
          disabled={selectedMenu.length === 0}
        >
          Select Menu
        </button>
      </div>
      {/* Show selected menu */}
      {finalMenu.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Today&apos;s Final Menu:</h3>
          <ul className="list-disc pl-6">
            {finalMenu.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}