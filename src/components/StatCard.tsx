import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet, PiggyBank } from 'lucide-react';

interface Props {
  title: string;
  amount: number;
  type: 'balance' | 'income' | 'expense' | 'savings';
}

const StatCard: React.FC<Props> = ({ title, amount, type }) => {
  const config = {
    balance: { icon: Wallet, color: "text-blue-400", bg: "from-blue-500/10", border: "border-blue-500/20" },
    income: { icon: TrendingUp, color: "text-emerald-400", bg: "from-emerald-500/10", border: "border-emerald-500/20" },
    expense: { icon: TrendingDown, color: "text-rose-400", bg: "from-rose-500/10", border: "border-rose-500/20" },
    savings: { icon: PiggyBank, color: "text-amber-400", bg: "from-amber-500/10", border: "border-amber-500/20" }
  };

  const { icon: Icon, color, bg, border } = config[type];

  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden p-7 rounded-[2.5rem] border backdrop-blur-3xl bg-gradient-to-br ${bg} to-transparent ${border}`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${color}`}>
          <Icon size={24} />
        </div>
        <div className="text-[10px] font-black tracking-[0.2em] text-white/20 uppercase">Artha Live</div>
      </div>
      
      <div>
        <p className="text-sm font-medium text-white/40 mb-1">{title}</p>
        <h3 className="text-3xl font-black tracking-tight">
          <span className="text-lg opacity-40 font-light mr-1">₹</span>
          {amount.toLocaleString('en-IN')}
        </h3>
      </div>
    </motion.div>
  );
};

export default StatCard;