// Line 1: Hum raw transactions ko chart ke format mein badlenge
import type { Transaction } from '../types/finance';

export const prepareChartData = (transactions: Transaction[]) => {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split('T')[0];
  }).reverse();

  // Har din ke liye income aur expense calculate karo
  return last7Days.map(date => {
    const dayTransactions = transactions.filter(t => 
      new Date(t.date).toISOString().split('T')[0] === date
    );

    return {
      name: new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
      income: dayTransactions.filter(t => t.type === 'INCOME').reduce((sum, t) => sum + t.amount, 0),
      expense: dayTransactions.filter(t => t.type === 'EXPENSE').reduce((sum, t) => sum + t.amount, 0),
    };
  });
};