import { useState, useMemo, useEffect } from 'react';
import type { Transaction, FinancialSummary } from '../types/finance';

export const useFinance = () => {
  // 1. Data State (Memory) - LocalStorage se load karo agar data hai
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('artha_data');
    return saved ? JSON.parse(saved) : [];
  });

  // 2. Search aur Filter States (Powerful Features)
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'INCOME' | 'EXPENSE'>('ALL');

  // LocalStorage mein save karne ke liye
  useEffect(() => {
    localStorage.setItem('artha_data', JSON.stringify(transactions));
  }, [transactions]);

  // 3. Logic: Filtered list taiyar karo (Searching + Filtering)
  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'ALL' || t.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [transactions, searchQuery, filterType]);

  // 4. Logic: Summary Calculation
  const summary = useMemo((): FinancialSummary => {
    let income = 0;
    let expense = 0;

    transactions.forEach(t => {
      if (t.type === 'INCOME') income += t.amount;
      else expense += t.amount;
    });

    return {
      totalIncome: income,
      totalExpense: expense,
      totalBalance: income - expense,
      savingsRate: income > 0 ? ((income - expense) / income) * 100 : 0
    };
  }, [transactions]);

  // 5. Action: Naya data add karne ka function (Ab Category ke saath)
  // Note: Yahan 'category' add kiya hai taaki Modal se sync ho jaye
  const addTransaction = (title: string, amount: number, type: 'INCOME' | 'EXPENSE', category: string) => {
    const newT: Transaction = {
      id: Math.random().toString(36).substr(2, 9), // Better ID
      title,
      amount,
      type,
      category, // Modal se aayi hui category
      date: new Date()
    };
    setTransactions([newT, ...transactions]);
  };

  return { 
    transactions: filteredTransactions, // App.tsx ko filtered list milegi
    summary, 
    addTransaction,
    setSearchQuery,
    setFilterType,
    filterType
  };
};