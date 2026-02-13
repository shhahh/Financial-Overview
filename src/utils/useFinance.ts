import { useState, useMemo } from 'react';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  date: Date;
}

interface Summary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export const useFinance = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'INCOME' | 'EXPENSE'>('ALL');

  // Summary calculation from ALL transactions (not filtered)
  const summary: Summary = useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === 'INCOME')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.type === 'EXPENSE')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    };
  }, [transactions]);

  // Filtered transactions for display (after search + filter)
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'ALL' || t.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [transactions, searchQuery, filterType]);

  // Add transaction with category
  const addTransaction = (
    title: string,
    amount: number,
    type: 'INCOME' | 'EXPENSE',
    category: string
  ) => {
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      title,
      amount,
      type,
      category,
      date: new Date(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  // Delete transaction
  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return {
    transactions: filteredTransactions,
    allTransactions: transactions,
    summary,
    addTransaction,
    deleteTransaction,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
  };
};