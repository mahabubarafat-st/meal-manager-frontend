import React from 'react';

export default function AdminReportsPage() {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Admin Reports</h1>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Financial Reports</h2>
        <div className="text-gray-700">No financial reports available.</div>
      </section>
      <section>
        <h2 className="text-lg font-semibold mb-2">Meal History</h2>
        <div className="text-gray-700">No meal history available.</div>
      </section>
    </div>
  );
}