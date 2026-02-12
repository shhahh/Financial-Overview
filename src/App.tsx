import React, { useState } from 'react';
import { useFinance } from './hooks/useFinance';
import AddTransactionModal from './components/AddTransactionModal';
import StatCard from './components/StatCard';
import LoginPage from './components/LoginPage';
import { Plus, Search, LayoutGrid, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const App = () => {
  const { transactions, summary, addTransaction } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // If not logged in, show Login Page
  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen relative pb-20 bg-black text-white">
      <div className="glow-bg" />

      {/* --- HEADER --- */}
      <header className="max-w-7xl mx-auto px-6 py-10 flex justify-between items-center">
        <div>
          <p className="text-[10px] font-black text-emerald-500 tracking-[0.4em] uppercase mb-1">
            Portfolio v2.0
          </p>
          <h1 className="text-3xl font-black tracking-tight">Financial Overview</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex bg-white/5 border border-white/10 rounded-2xl px-4 py-2 items-center gap-3">
            <Search size={18} className="text-white/20" />
            <input
              placeholder="Search assets..."
              className="bg-transparent border-none outline-none text-sm w-40 text-white placeholder-white/30"
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white text-black px-6 py-3 rounded-[1.2rem] font-black flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-white/10"
          >
            <Plus size={20} /> <span className="hidden sm:block">Transaction</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6">
        {/* --- STATS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="Main Balance" amount={summary.totalBalance} type="balance" />
          <StatCard title="Total Income" amount={summary.totalIncome} type="income" />
          <StatCard title="Monthly Expenses" amount={summary.totalExpense} type="expense" />
          <StatCard title="Savings Rate" amount={Math.round(summary.savingsRate)} type="savings" />
        </div>

        {/* Financial Health Meter */}
        <motion.div
          className="mb-12 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-8 relative overflow-hidden flex flex-col justify-between"
          whileHover={{ scale: 1.02 }}
        >
          <div className="z-10">
            <h3 className="text-white/60 text-xs font-black uppercase tracking-widest mb-1">
              Financial Pulse
            </h3>
            <h2 className="text-3xl font-bold">
              {summary.savingsRate >= 50
                ? 'Excellent'
                : summary.savingsRate >= 25
                ? 'Good'
                : summary.savingsRate >= 0
                ? 'Needs Work'
                : 'Critical'}
            </h2>
          </div>

          <div className="mt-8 z-10">
            <div className="flex justify-between text-[10px] font-black uppercase mb-2">
              <span>Safe Zone</span>
              <span>{Math.round(summary.savingsRate)}% Saved</span>
            </div>
            <div className="h-3 w-full bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(0, Math.min(100, summary.savingsRate))}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)] rounded-full"
              />
            </div>
            <p className="mt-4 text-[10px] text-white/60 font-medium leading-relaxed">
              {summary.savingsRate >= 40
                ? 'You are spending less than 40% of your income. Your financial stability is higher than 85% of users.'
                : 'Try to increase your savings rate to improve financial health.'}
            </p>
          </div>

          {/* Decorative Circle */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        </motion.div>

        {/* --- DASHBOARD CONTENT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Chart Section */}
          <div className="lg:col-span-8 bg-white/[0.02] border border-white/5 rounded-[3rem] p-10">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                <LayoutGrid className="text-blue-400" size={20} />
                <h2 className="text-xl font-bold">Performance Analytics</h2>
              </div>
              <div className="flex gap-2 bg-black/40 p-1 rounded-xl">
                {['1W', '1M', '1Y'].map((t) => (
                  <button
                    key={t}
                    className="px-4 py-1.5 rounded-lg text-[10px] font-black hover:bg-white/5 transition-all text-white/40"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[300px] border border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full border-4 border-white/5 border-t-blue-500 animate-spin" />
              <p className="text-white/20 text-xs font-medium tracking-widest uppercase">
                Syncing Real-time Data...
              </p>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="lg:col-span-4 bg-white/[0.02] border border-white/5 rounded-[3rem] p-8">
            <div className="flex items-center gap-3 mb-8">
              <Clock className="text-emerald-400" size={20} />
              <h2 className="text-xl font-bold">Timeline</h2>
            </div>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {transactions.length === 0 ? (
                <p className="text-white/20 text-center py-20 text-sm italic">
                  Waiting for first entry...
                </p>
              ) : (
                transactions.map((t, idx) => (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={t.id}
                    className="p-5 rounded-3xl bg-white/5 border border-white/5 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-bold text-sm">{t.title}</p>
                      <p className="text-[10px] font-black text-white/20 uppercase">
                        {new Date(t.date).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                        })}
                      </p>
                    </div>
                    <span
                      className={`font-black ${
                        t.type === 'INCOME' ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {t.type === 'INCOME' ? '+' : '-'}₹{t.amount.toLocaleString()}
                    </span>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addTransaction}
      />
    </div>
  );
};

export default App;