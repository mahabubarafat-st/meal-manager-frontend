"use client";
import React, { useState } from 'react';

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

// Dummy student data
const dummyStudent: Student = {
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
};

export default function AdminDashboardPage() {
  const [inputId, setInputId] = useState('');
  const [student, setStudent] = useState<Student | null>(null);
  const [showView, setShowView] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateForm, setUpdateForm] = useState<Student>({ ...dummyStudent });
  const [sidebarMode, setSidebarMode] = useState<null | 'view' | 'update'>(null);

  const handleValidate = () => {
    if (inputId === dummyStudent.id) {
      setStudent(dummyStudent);
    } else {
      setStudent(null);
      alert('Student not found (dummy logic)');
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
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStudent({ ...updateForm });
    setShowUpdate(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow relative">
      <h1 className="text-5xl font-extrabold mb-10 text-center">Admin Dashboard</h1>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Scan Student ID</h2>
        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="Enter or scan student CUET ID"
          value={inputId}
          onChange={e => setInputId(e.target.value)}
        />
        <button
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleValidate}
        >
          Validate
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
            {sidebarMode === 'update' && (
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
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Meal/Budget Tracking</h2>
        <div className="text-gray-700">Total Meals Served: 0</div>
        <div className="text-gray-700">Total Revenue: ৳ 0.00</div>
        <div className="text-gray-700">Total Expenditure: ৳ 0.00</div>
      </section>
      <section>
        <h2 className="text-lg font-semibold mb-2">Meal Statistics</h2>
        <div className="text-gray-700">No statistics available.</div>
      </section>
    </div>
  );
}