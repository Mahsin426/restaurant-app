import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { LayoutDashboard, Wallet, Users, PieChart, TrendingUp, TrendingDown, Download, Trash2, Plus, Minus } from 'lucide-react';
import Header from '../components/ui/Header';
import Button from '../components/ui/Button';

// Utility functions inline for simplicity on mobile
const generateId = () => Date.now().toString();

export default function Home() {
  // --- STATE ---
  const [restaurantName, setRestaurantName] = useState('Vat Ghor Hotel Restaurant');
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [staff, setStaff] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoaded, setIsLoaded] = useState(false);

  // Forms State
  const [showForm, setShowForm] = useState(null); // 'income' or 'expense'
  const [formData, setFormData] = useState({ amount: '', category: '', notes: '' });

  // --- EFFECT: Load Data from LocalStorage ---
  useEffect(() => {
    const savedName = localStorage.getItem('restaurant_name');
    const savedIncome = localStorage.getItem('income_records');
    const savedExpenses = localStorage.getItem('expense_records');
    const savedStaff = localStorage.getItem('staff_records');
    const savedMode = localStorage.getItem('dark_mode');

    if (savedName) setRestaurantName(savedName);
    if (savedIncome) setIncome(JSON.parse(savedIncome));
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
    if (savedStaff) setStaff(JSON.parse(savedStaff));
    if (savedMode) setDarkMode(JSON.parse(savedMode));
    
    setIsLoaded(true);
  }, []);

  // --- EFFECT: Save Data to LocalStorage ---
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('restaurant_name', restaurantName);
      localStorage.setItem('income_records', JSON.stringify(income));
      localStorage.setItem('expense_records', JSON.stringify(expenses));
      localStorage.setItem('staff_records', JSON.stringify(staff));
      localStorage.setItem('dark_mode', JSON.stringify(darkMode));
      
      if (darkMode) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    }
  }, [restaurantName, income, expenses, staff, darkMode, isLoaded]);

  // --- CALCULATIONS ---
  const totalIncome = income.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0) + 
                        staff.filter(s => s.paid).reduce((sum, s) => sum + parseFloat(s.salary || 0), 0);
  const netProfit = totalIncome - totalExpenses;

  // --- HANDLERS ---
  const handleAddTransaction = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: generateId(),
      date: new Date().toISOString(),
      amount: parseFloat(formData.amount),
      category: formData.category,
      notes: formData.notes
    };

    if (showForm === 'income') setIncome([newTransaction, ...income]);
    else setExpenses([newTransaction, ...expenses]);

    setFormData({ amount: '', category: '', notes: '' });
    setShowForm(null);
  };

  const deleteTransaction = (id, type) => {
    if (!confirm('Delete this record?')) return;
    if (type === 'income') setIncome(income.filter(i => i.id !== id));
    else setExpenses(expenses.filter(e => e.id !== id));
  };

  if (!isLoaded) return <div className="p-10 text-center">Loading App...</div>;

  return (
    <div className={`min-h-screen pb-20 transition-colors duration-300 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Head>
        <title>{restaurantName} - Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header 
        restaurantName={restaurantName} 
        setRestaurantName={setRestaurantName}
        darkMode={darkMode}
        toggleTheme={() => setDarkMode(!darkMode)}
      />

      <main className="container mx-auto px-4 py-6">
        {/* TAB NAVIGATION */}
        <div className="flex overflow-x-auto gap-2 mb-6 pb-2 scrollbar-hide">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
            { id: 'transactions', icon: Wallet, label: 'Transactions' },
            { id: 'staff', icon: Users, label: 'Staff' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                ${activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'}`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* --- DASHBOARD VIEW --- */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fade-in">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setShowForm('income')}
                className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg flex items-center justify-center gap-2 font-bold active:scale-95 transition-transform"
              >
                <Plus className="w-5 h-5" /> Add Income
              </button>
              <button 
                onClick={() => setShowForm('expense')}
                className="p-4 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl shadow-lg flex items-center justify-center gap-2 font-bold active:scale-95 transition-transform"
              >
                <Minus className="w-5 h-5" /> Add Expense
              </button>
            </div>

            {/* Financial Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-green-100 dark:border-green-900/30 shadow-sm">
                <div className="flex items-center gap-2 text-green-600 mb-2">
                  <TrendingUp className="w-5 h-5" /> <span className="font-medium">Total Income</span>
                </div>
                <p className="text-2xl font-bold">৳{totalIncome.toLocaleString()}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-red-100 dark:border-red-900/30 shadow-sm">
                <div className="flex items-center gap-2 text-red-600 mb-2">
                  <TrendingDown className="w-5 h-5" /> <span className="font-medium">Total Expenses</span>
                </div>
                <p className="text-2xl font-bold">৳{totalExpenses.toLocaleString()}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-blue-100 dark:border-blue-900/30 shadow-sm">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <Wallet className="w-5 h-5" /> <span className="font-medium">Net Profit</span>
                </div>
                <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ৳{netProfit.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* --- TRANSACTIONS VIEW --- */}
        {activeTab === 'transactions' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <h3 className="p-4 font-bold border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800">Recent Activity</h3>
              <div className="divide-y dark:divide-gray-700">
                {[...income.map(i => ({...i, type: 'income'})), ...expenses.map(e => ({...e, type: 'expense'}))]
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map(item => (
                  <div key={item.id} className="p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{item.category}</p>
                      <p className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()} • {item.notes}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`font-bold ${item.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {item.type === 'income' ? '+' : '-'}৳{item.amount}
                      </span>
                      <button onClick={() => deleteTransaction(item.id, item.type)} className="text-gray-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {income.length + expenses.length === 0 && (
                  <div className="p-8 text-center text-gray-500">No transactions yet.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- MODAL FORM --- */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-sm p-6 shadow-2xl animate-scale-in">
              <h2 className="text-xl font-bold mb-4 capitalize">Add {showForm}</h2>
              <form onSubmit={handleAddTransaction} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Amount (৳)</label>
                  <input 
                    type="number" 
                    required
                    className="w-full p-3 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-900"
                    value={formData.amount}
                    onChange={e => setFormData({...formData, amount: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                  <select 
                    required
                    className="w-full p-3 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-900"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="">Select...</option>
                    {showForm === 'income' ? (
                      <>
                        <option value="Dine-in">Dine-in</option>
                        <option value="Takeaway">Takeaway</option>
                        <option value="Online">Online Order</option>
                      </>
                    ) : (
                      <>
                        <option value="Ingredients">Ingredients (Bazar)</option>
                        <option value="Rent">Rent</option>
                        <option value="Utilities">Utilities (Gas/Electric)</option>
                        <option value="Salary">Staff Salary</option>
                        <option value="Misc">Misc</option>
                      </>
                    )}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Notes</label>
                  <input 
                    className="w-full p-3 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-900"
                    value={formData.notes}
                    onChange={e => setFormData({...formData, notes: e.target.value})}
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="secondary" onClick={() => setShowForm(null)} className="flex-1">Cancel</Button>
                  <Button type="submit" variant={showForm === 'income' ? 'success' : 'danger'} className="flex-1">Save</Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
