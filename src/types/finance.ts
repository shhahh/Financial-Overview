export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  date: Date;
}

export interface FinancialSummary {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  savingsRate: number;
}