export default function HomePage() {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Balance</h2>
        <div className="text-3xl font-bold text-green-700">৳ 0.00</div>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Meal History</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>No meals found.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-lg font-semibold mb-2">Statistics</h2>
        <div className="text-gray-700">Average meals/week: 0</div>
        <div className="text-gray-700">Average meals/month: 0</div>
      </section>
      <div className="mt-8">
        <a href="/recharge" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Recharge Balance</a>
      </div>
    </div>
  );
}