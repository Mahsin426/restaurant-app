import React, { useState, useEffect } from "react";
import Head from "next/head";

export default function Home() {
  // --- STATE ---
  const [restaurantName, setRestaurantName] = useState("ভাত ঘর হোটেল রেস্টুরেন্ট এন্ড মিষ্টান্ন");
  const [income, setIncome] = useState([]); // Array of numbers
  const [expenses, setExpenses] = useState([]); // Array of numbers
  const [darkMode, setDarkMode] = useState(false);

  // --- CALCULATIONS ---
  const totalIncome = income.reduce((sum, val) => sum + Number(val), 0);
  const totalExpenses = expenses.reduce((sum, val) => sum + Number(val), 0);
  const netProfit = totalIncome - totalExpenses;

  // --- HANDLERS ---
  const handleIncomeSubmit = (e) => {
    if (e.key === "Enter" && e.target.value) {
      setIncome([...income, Number(e.target.value)]);
      e.target.value = ""; // Clear input
    }
  };

  const handleExpenseSubmit = (e) => {
    if (e.key === "Enter" && e.target.value) {
      setExpenses([...expenses, Number(e.target.value)]);
      e.target.value = ""; // Clear input
    }
  };

  return (
    <div className={`min-h-screen p-4 md:p-8 transition-colors duration-300 font-sans ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <Head>
        <title>{restaurantName} - দৈনিক হিসাব</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-green-700 dark:text-green-400 mb-1">
            {restaurantName}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">দৈনিক হিসাব নিকাশ ড্যাশবোর্ড</p>
        </div>
        
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-4 py-2 rounded-full font-medium text-sm transition-all border ${
            darkMode 
              ? "bg-gray-700 hover:bg-gray-600 text-yellow-300 border-gray-600" 
              : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200"
          }`}
        >
          {darkMode ? "☀️ লাইট মোড" : "🌙 ডার্ক মোড"}
        </button>
      </header>

      {/* --- INPUT SECTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Income Input */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border-l-4 border-green-500">
          <label className="block text-sm font-bold mb-2 text-green-600 uppercase tracking-wide">
            টাকা জমা দিন (Income)
          </label>
          <input
            type="number"
            placeholder="পরিমাণ লিখুন এবং Enter চাপুন..."
            className="w-full p-4 rounded-xl border bg-gray-50 dark:bg-gray-900 dark:border-gray-700 text-lg outline-none focus:ring-2 focus:ring-green-500 transition-all placeholder-gray-400"
            onKeyDown={handleIncomeSubmit}
          />
        </div>

        {/* Expense Input */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border-l-4 border-red-500">
          <label className="block text-sm font-bold mb-2 text-red-600 uppercase tracking-wide">
            টাকা খরচ করুন (Expense)
          </label>
          <input
            type="number"
            placeholder="পরিমাণ লিখুন এবং Enter চাপুন..."
            className="w-full p-4 rounded-xl border bg-gray-50 dark:bg-gray-900 dark:border-gray-700 text-lg outline-none focus:ring-2 focus:ring-red-500 transition-all placeholder-gray-400"
            onKeyDown={handleExpenseSubmit}
          />
        </div>
      </div>

      {/* --- SUMMARY CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Income */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-6 rounded-2xl border border-green-200 dark:border-green-800 shadow-sm">
          <h2 className="text-green-800 dark:text-green-300 text-sm font-bold uppercase tracking-wider mb-2">
            মোট আয় (Total Income)
          </h2>
          <p className="text-3xl font-extrabold text-green-700 dark:text-green-400">
            ৳ {totalIncome.toLocaleString()}
          </p>
        </div>

        {/* Total Expense */}
        <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 p-6 rounded-2xl border border-red-200 dark:border-red-800 shadow-sm">
          <h2 className="text-red-800 dark:text-red-300 text-sm font-bold uppercase tracking-wider mb-2">
            মোট ব্যয় (Total Expense)
          </h2>
          <p className="text-3xl font-extrabold text-red-700 dark:text-red-400">
            ৳ {totalExpenses.toLocaleString()}
          </p>
        </div>

        {/* Net Profit */}
        <div className={`bg-gradient-to-br p-6 rounded-2xl border shadow-sm ${
          netProfit >= 0 
            ? "from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-blue-200 dark:border-blue-800" 
            : "from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 border-orange-200 dark:border-orange-800"
        }`}>
          <h2 className={`text-sm font-bold uppercase tracking-wider mb-2 ${netProfit >= 0 ? "text-blue-800 dark:text-blue-300" : "text-orange-800 dark:text-orange-300"}`}>
            নিট লাভ (Net Profit)
          </h2>
          <p className={`text-3xl font-extrabold ${netProfit >= 0 ? "text-blue-700 dark:text-blue-400" : "text-orange-700 dark:text-orange-400"}`}>
            ৳ {netProfit.toLocaleString()}
          </p>
        </div>
      </div>

      {/* --- HISTORY LISTS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Income History */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden h-96 flex flex-col">
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 sticky top-0">
            <h3 className="font-bold text-green-600 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span> আয়ের তালিকা
            </h3>
          </div>
          <div className="overflow-y-auto flex-1 p-4 space-y-2">
            {income.length > 0 ? (
              income.map((amount, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-900/20">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">এন্ট্রি #{idx + 1}</span>
                  <span className="font-bold text-green-700 dark:text-green-400 font-mono">+ ৳{amount}</span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 py-10 text-sm">কোনো আয় যোগ করা হয়নি</p>
            )}
          </div>
        </div>

        {/* Expense History */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden h-96 flex flex-col">
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 sticky top-0">
            <h3 className="font-bold text-red-600 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span> ব্যয়ের তালিকা
            </h3>
          </div>
          <div className="overflow-y-auto flex-1 p-4 space-y-2">
            {expenses.length > 0 ? (
              expenses.map((amount, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/20">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">এন্ট্রি #{idx + 1}</span>
                  <span className="font-bold text-red-700 dark:text-red-400 font-mono">- ৳{amount}</span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 py-10 text-sm">কোনো ব্যয় যোগ করা হয়নি</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
