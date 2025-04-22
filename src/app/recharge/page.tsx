import React from 'react';

export default function RechargePage() {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Recharge Balance</h1>
      <form className="flex flex-col gap-4">
        <label htmlFor="amount" className="font-medium">Amount</label>
        <input id="amount" name="amount" type="number" className="border p-2 rounded" placeholder="Enter amount" />
        <label htmlFor="paymentMethod" className="font-medium">Payment Method</label>
        <select id="paymentMethod" name="paymentMethod" className="border p-2 rounded">
          <option value="cash">Cash</option>
          <option value="card">Card</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Recharge</button>
      </form>
    </div>
  );
}