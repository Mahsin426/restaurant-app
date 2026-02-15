import { useState, useEffect } from "react";
import Head from "next/head";

export default function Home() {
  const [restaurantName, setRestaurantName] = useState("Vat Ghor Hotel");
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const totalIncome = income.reduce((sum, i) => sum + Number(i), 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e), 0);
  const netProfit = totalIncome - totalExpenses;

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100"}`}>
      <Head>
        <title>{restaurantName} Dashboard</title>
      </Head>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{restaurantName}</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Toggle Theme
        </button>
      </div>

      {/* Add Income */}
      <div className="mb-6">
        <input
          type="number"
          placeholder="Add Income"
          className="p-2 border rounded mr-2 text-black"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setIncome([...income, e.target.value]);
              e.target.value = "";
            }
          }}
        />
      </div>

      {/* Add Expense */}
      <div className="mb-6">
        <input
          type="number"
          placeholder="Add Expense"
          className="p-2 border rounded mr-2 text-black"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setExpenses([...expenses, e.target.value]);
              e.target.value = "";
            }
          }}
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-gray-500">Total Income</h2>
          <p className="text-2xl font-bold text-green-600">₹{totalIncome}</p>
        </div>

        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-gray-500">Total Expenses</h2>
          <p className="text-2xl font-bold text-red-600">₹{totalExpenses}</p>
        </div>

        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-gray-500">Net Profit</h2>
          <p className={`text-2xl font-bold ${netProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
            ₹{netProfit}
          </p>
        </div>
      </div>
    </div>
  );
}
