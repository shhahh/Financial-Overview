import React, { useState } from 'react';
import { useFinance } from './hooks/useFinance';
import AddTransactionModal from './components/AddTransactionModal';
import StatCard from './components/StatCard';
import LoginPage from './components/LoginPage';
import DashboardChart from './components/DashboardChart';
import { Plus, Search, Clock } from 'lucide-react';

import { cn } from './utils/cn';

const App = () => {
  const { transactions, summary, addTransaction, setSearchQuery, setFilterType, filterType } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) return <LoginPage onLogin={() => setIsLoggedIn(true)} />;

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <header className="max-w-7xl mx-auto px-6 py-10 flex justify-between items-center">
        <h1 className="text-3xl font-black tracking-tight uppercase">Artha <span className="text-emerald-500 text-xs block tracking-[0.4em]">Shah + Gemini</span></h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-white text-black px-8 py-3 rounded-2xl font-black flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-white/10">
          <Plus size={20} /> New Entry
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="Balance" amount={summary.totalBalance} type="balance" />
          <StatCard title="Income" amount={summary.totalIncome} type="income" />
          <StatCard title="Expense" amount={summary.totalExpense} type="expense" />
          <StatCard title="Savings" amount={Math.round(summary.savingsRate)} type="savings" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-white/[0.02] border border-white/5 rounded-[3rem] p-8">
            <h2 className="text-xl font-bold mb-6">Performance Analytics</h2>
            <DashboardChart transactions={transactions} />
          </div>

          <div className="lg:col-span-4 bg-white/[0.02] border border-white/5 rounded-[3rem] p-8 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Timeline</h2>
              <div className="flex gap-1">
                {['ALL', 'INCOME', 'EXPENSE'].map(f => (
                  <button key={f} onClick={() => setFilterType(f as any)} className={cn("px-2 py-1 rounded-md text-[8px] font-black", filterType === f ? "bg-white text-black" : "bg-white/5 text-white/40")}>{f}</button>
                ))}
              </div>
            </div>
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
              <input onChange={e => setSearchQuery(e.target.value)} placeholder="Search..." className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-12 text-sm outline-none" />
            </div>
            <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2">
              {transactions.map(t => (
                <div key={t.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
                  <div><p className="font-bold text-sm">{t.title}</p><p className="text-[10px] text-white/20 font-bold uppercase">{t.category}</p></div>
                  <span className={`font-black ${t.type === 'INCOME' ? 'text-emerald-400' : 'text-rose-400'}`}>{t.type === 'INCOME' ? '+' : '-'}₹{t.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={addTransaction} />
    </div>
  );
};
export default App;