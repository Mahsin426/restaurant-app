import { useState, useEffect } from "react";
import Head from "next/head";

export default function Home() {
  const [restaurantName, setRestaurantName] = useState("Vat Ghor Hotel");
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  // Load from localStorage
  useEffect(() => {
    const savedIncome = localStorage.getItem("income");
    const savedExpenses = localStorage.getItem("expenses");

    if (savedIncome) setIncome(JSON.parse(savedIncome));
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("income", JSON.stringify(income));
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [income, expenses]);

  const addTransaction = () => {
    if (!amount) return;

    const newItem = {
      id: Date.now(),
      amount: Number(amount),
      date: new Date().toLocaleDateString(),
    };

    if (type === "income") {
      setIncome([newItem, ...income]);
    } else {
      setExpenses([newItem, ...expenses]);
    }

    setAmount("");
  };

  const deleteItem = (id, transactionType) => {
    if (transactionType === "income") {
      setIncome(income.filter((item) => item.id !== id));
    } else {
      setExpenses(expenses.filter((item) => item.id !== id));
    }
  };

  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const netProfit = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Head>
        <title>{restaurantName} - হিসাব</title>
      </Head>

      <h1 className="text-3xl font-bold mb-6">{restaurantName} হিসাব</h1>

      {/* Add Transaction */}
      <div className="bg-white p-4 rounded shadow mb-6 flex flex-col md:flex-row gap-3">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          type="number"
          placeholder="টাকার পরিমাণ লিখুন"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 border rounded flex-1"
        />

        <button
          onClick={addTransaction}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          যোগ করুন
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500">মোট আয়</h2>
          <p className="text-2xl font-bold text-green-600">৳{totalIncome}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500">মোট খরচ</h2>
          <p className="text-2xl font-bold text-red-600">৳{totalExpenses}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-500">লাভ / ক্ষতি</h2>
          <p
            className={`text-2xl font-bold ${
              netProfit >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ৳{netProfit}
          </p>
        </div>
      </div>

      {/* Income List */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-bold mb-3 text-green-600">Income List</h2>
        {income.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b py-2"
          >
            <span>৳{item.amount} ({item.date})</span>
            <button
              onClick={() => deleteItem(item.id, "income")}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Expense List */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-3 text-red-600">Expense List</h2>
        {expenses.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b py-2"
          >
            <span>৳{item.amount} ({item.date})</span>
            <button
              onClick={() => deleteItem(item.id, "expense")}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
