import React, { useState, useEffect } from "react";
import Head from "next/head";

export default function Home() {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // --- CALCULATIONS ---
  const totalIncome = income.reduce((sum, val) => sum + Number(val), 0);
  const totalExpenses = expenses.reduce((sum, val) => sum + Number(val), 0);
  const netProfit = totalIncome - totalExpenses;

  // --- HANDLERS ---
  const handleIncomeSubmit = (e) => {
    if (e.key === "Enter" && e.target.value) {
      setIncome([...income, Number(e.target.value)]);
      e.target.value = "";
    }
  };

  const handleExpenseSubmit = (e) => {
    if (e.key === "Enter" && e.target.value) {
      setExpenses([...expenses, Number(e.target.value)]);
      e.target.value = "";
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 font-sans ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <Head>
        <title>ভাত ঘর হোটেল - দৈনিক হিসাব</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow container mx-auto p-4 md:p-8">
        
        {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-green-700 dark:text-green-400 mb-1">
              ভাত ঘর হোটেল রেস্টুরেন্ট এন্ড মিষ্টান্ন
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">স্বত্বাধিকারী: রহমান সিং | এম রহমান প্লাজা, মাইজদী কোর্ট, নোয়াখালী</p>
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

        {/* --- SUMMARY CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-2xl border border-green-200 dark:border-green-800 shadow-sm text-center">
            <h2 className="text-green-800 dark:text-green-300 text-xs font-bold uppercase tracking-wider mb-2">মোট আয়</h2>
            <p className="text-3xl font-extrabold text-green-700 dark:text-green-400">৳ {totalIncome.toLocaleString()}</p>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-6 rounded-2xl border border-red-200 dark:border-red-800 shadow-sm text-center">
            <h2 className="text-red-800 dark:text-red-300 text-xs font-bold uppercase tracking-wider mb-2">মোট ব্যয়</h2>
            <p className="text-3xl font-extrabold text-red-700 dark:text-red-400">৳ {totalExpenses.toLocaleString()}</p>
          </div>

          <div className={`bg-gradient-to-br p-6 rounded-2xl border shadow-sm text-center ${
            netProfit >= 0 
              ? "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800" 
              : "from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800"
          }`}>
            <h2 className={`text-xs font-bold uppercase tracking-wider mb-2 ${netProfit >= 0 ? "text-blue-800 dark:text-blue-300" : "text-orange-800 dark:text-orange-300"}`}>নিট লাভ</h2>
            <p className={`text-3xl font-extrabold ${netProfit >= 0 ? "text-blue-700 dark:text-blue-400" : "text-orange-700 dark:text-orange-400"}`}>
              ৳ {netProfit.toLocaleString()}
            </p>
          </div>
        </div>

        {/* --- INPUT SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border-l-4 border-green-500">
            <label className="block text-sm font-bold mb-2 text-green-600 uppercase">টাকা জমা দিন (Income)</label>
            <input
              type="number"
              placeholder="পরিমাণ লিখুন এবং Enter চাপুন..."
              className="w-full p-4 rounded-xl border bg-gray-50 dark:bg-gray-900 dark:border-gray-700 text-lg outline-none focus:ring-2 focus:ring-green-500 transition-all placeholder-gray-400"
              onKeyDown={handleIncomeSubmit}
            />
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border-l-4 border-red-500">
            <label className="block text-sm font-bold mb-2 text-red-600 uppercase">টাকা খরচ করুন (Expense)</label>
            <input
              type="number"
              placeholder="পরিমাণ লিখুন এবং Enter চাপুন..."
              className="w-full p-4 rounded-xl border bg-gray-50 dark:bg-gray-900 dark:border-gray-700 text-lg outline-none focus:ring-2 focus:ring-red-500 transition-all placeholder-gray-400"
              onKeyDown={handleExpenseSubmit}
            />
          </div>
        </div>

        {/* --- HISTORY LISTS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden h-64 flex flex-col">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 sticky top-0">
              <h3 className="font-bold text-green-600">আয়ের তালিকা</h3>
            </div>
            <div className="overflow-y-auto flex-1 p-4 space-y-2">
              {income.map((amount, idx) => (
                <div key={idx} className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/10 rounded border border-green-100 dark:border-green-900/20 text-sm">
                  <span className="text-gray-500">#{idx + 1}</span>
                  <span className="font-bold text-green-700 dark:text-green-400 font-mono">+ ৳{amount}</span>
                </div>
              ))}
              {income.length === 0 && <p className="text-center text-gray-400 py-10 text-xs">কোনো তথ্য নেই</p>}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden h-64 flex flex-col">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 sticky top-0">
              <h3 className="font-bold text-red-600">ব্যয়ের তালিকা</h3>
            </div>
            <div className="overflow-y-auto flex-1 p-4 space-y-2">
              {expenses.map((amount, idx) => (
                <div key={idx} className="flex justify-between items-center p-2 bg-red-50 dark:bg-red-900/10 rounded border border-red-100 dark:border-red-900/20 text-sm">
                  <span className="text-gray-500">#{idx + 1}</span>
                  <span className="font-bold text-red-700 dark:text-red-400 font-mono">- ৳{amount}</span>
                </div>
              ))}
              {expenses.length === 0 && <p className="text-center text-gray-400 py-10 text-xs">কোনো তথ্য নেই</p>}
            </div>
          </div>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 mt-8">
        <div className="container mx-auto px-4 text-center space-y-2">
          <p className="font-bold text-gray-700 dark:text-gray-300">যোগাযোগ:</p>
          <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
            <p>📍 এম রহমান প্লাজা, পুরাতন বাস স্ট্যান্ড, মাইজদী কোর্ট, নোয়াখালী</p>
            <p>📞 ০১৩৩৬-৬১৩৪৮১ | ✉️ vatghorhotelonline@gmail.com</p>
            <p>🌐 <a href="https://vatghorhotelonline.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">vatghorhotelonline.com</a></p>
          </div>
          <p className="text-xs text-gray-400 mt-4">© {new Date().getFullYear()} ভাত ঘর হোটেল। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </footer>
    </div>
  );
}
