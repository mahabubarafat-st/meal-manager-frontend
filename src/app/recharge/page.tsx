"use client";
import React, { useState } from 'react';
import Image from "next/image";

const tokenOptions = [
  { days: 7, label: "7 days", amount: 800 },
  { days: 10, label: "10 days", amount: 1000 },
  { days: 15, label: "15 days", amount: 1500 },
  { days: 30, label: "30 days", amount: 2400 },
];
const paymentOptions = [
  { value: "card", label: "Card", logo: "/visa.jpeg" },
  { value: "bkash", label: "Bkash", logo: "/bkash.png" },
  { value: "nagad", label: "Nagad", logo: "/nagad.png" },
  { value: "rocket", label: "Rocket", logo: "/rocket.png" },
];

export default function RechargePage() {
  const [selectedToken, setSelectedToken] = useState(tokenOptions[0]);
  const [paymentMethod, setPaymentMethod] = useState(paymentOptions[0]);
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleRecharge(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // Save balance to localStorage for home page
      const prev = parseFloat(localStorage.getItem("balance") || "0");
      localStorage.setItem("balance", (prev + selectedToken.amount).toString());
    }, 2000);
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-5xl font-extrabold mb-10 text-center">Recharge Balance</h1>
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <svg className="animate-spin h-10 w-10 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
          <span className="text-blue-700 font-medium">Processing your recharge...</span>
        </div>
      ) : success ? (
        <div className="text-green-700 text-lg font-semibold text-center">
          Recharge successful! ৳{selectedToken.amount} added to your balance.
        </div>
      ) : (
        <form className="flex flex-col gap-4" onSubmit={handleRecharge}>
          <label htmlFor="token" className="font-medium">Select Token</label>
          <select
            id="token"
            className="border p-2 rounded"
            value={selectedToken.days}
            onChange={e => {
              const t = tokenOptions.find(t => t.days === parseInt(e.target.value));
              if (t) setSelectedToken(t);
            }}
          >
            {tokenOptions.map(t => (
              <option key={t.days} value={t.days}>{t.label}</option>
            ))}
          </select>
          <div className="flex items-center gap-2">
            <span className="font-medium">Amount to pay:</span>
            <span className="text-xl font-bold text-blue-700">৳{selectedToken.amount}</span>
          </div>
          <label htmlFor="paymentMethod" className="font-medium">Payment Method</label>
          <div className="grid grid-cols-2 gap-2">
            {paymentOptions.map(opt => (
              <button
                type="button"
                key={opt.value}
                className={`flex items-center gap-2 border p-2 rounded hover:bg-blue-50 ${paymentMethod.value === opt.value ? "ring-2 ring-blue-400" : ""}`}
                onClick={() => setPaymentMethod(opt)}
              >
                <Image src={opt.logo} alt={opt.label} width={24} height={24} className="w-6 h-6" />
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
          <label htmlFor="account" className="font-medium mt-2">
            {paymentMethod.value === "card" ? "Card Number" : "Phone Number"}
          </label>
          <input
            id="account"
            name="account"
            type="text"
            className="border p-2 rounded"
            placeholder={paymentMethod.value === "card" ? "Enter card number" : "Enter phone number"}
            value={account}
            onChange={e => setAccount(e.target.value.replace(/[^0-9]/g, ""))}
            required
          />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700" disabled={loading}>
            {loading ? "Processing..." : "Recharge"}
          </button>
        </form>
      )}
    </div>
  );
}