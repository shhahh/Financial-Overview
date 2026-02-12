import { useState, useMemo } from 'react';
import type { Transaction, FinancialSummary } from '../types/finance';

export const useFinance = () => {
  // 1. Memory: Transactions ki list yahan save hogi
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // 2. Logic: Har baar jab list badlegi, ye totals calculate karega
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

  // 3. Action: Naya data add karne ka function
  const addTransaction = (title: string, amount: number, type: 'INCOME' | 'EXPENSE') => {
    const newT: Transaction = {
      id: Math.random().toString(), // Simple ID for now
      title,
      amount,
      type,
      date: new Date()
    };
    setTransactions([newT, ...transactions]);
  };

  return { transactions, summary, addTransaction };
};