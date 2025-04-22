export default function AdminDashboardPage() {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-5xl font-extrabold mb-10 text-center">Admin Dashboard</h1>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Scan Student ID</h2>
        <input type="text" className="border p-2 rounded w-full" placeholder="Enter or scan student CUET ID" />
        <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Validate</button>
      </section>
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