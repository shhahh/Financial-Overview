import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet, PiggyBank } from 'lucide-react';

interface Props { title: string; amount: number; type: 'balance' | 'income' | 'expense' | 'savings'; }

const StatCard: React.FC<Props> = ({ title, amount, type }) => {
  const config = {
    balance: { icon: Wallet, color: "text-blue-400", bg: "from-blue-500/10", border: "border-blue-500/20" },
    income: { icon: TrendingUp, color: "text-emerald-400", bg: "from-emerald-500/10", border: "border-emerald-500/20" },
    expense: { icon: TrendingDown, color: "text-rose-400", bg: "from-rose-500/10", border: "border-rose-500/20" },
    savings: { icon: PiggyBank, color: "text-amber-400", bg: "from-amber-500/10", border: "border-amber-500/20" }
  };
  const { icon: Icon, color, bg, border } = config[type];
  return (
    <motion.div whileHover={{ y: -5 }} className={`p-7 rounded-[2.5rem] border bg-gradient-to-br ${bg} to-transparent ${border} backdrop-blur-xl`}>
      <div className={`p-3 w-fit rounded-2xl bg-white/5 border border-white/10 mb-6 ${color}`}><Icon size={24} /></div>
      <p className="text-sm font-medium text-white/40 mb-1">{title}</p>
      <h3 className="text-3xl font-black">₹{amount.toLocaleString('en-IN')}</h3>
    </motion.div>
  );
};
export default StatCard;