import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface StatCardProps {
  title: string;
  amount: number;
  icon: LucideIcon;
  variant: 'income' | 'expense' | 'balance' | 'savings';
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, amount, icon: Icon, variant }) => {
  const styles = {
    income: "from-emerald-500/20 to-transparent text-emerald-400 border-emerald-500/20",
    expense: "from-rose-500/20 to-transparent text-rose-400 border-rose-500/20",
    balance: "from-blue-500/20 to-transparent text-blue-400 border-blue-500/20",
    savings: "from-amber-500/20 to-transparent text-amber-400 border-amber-500/20",
  };

  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className={cn(
        "relative overflow-hidden p-6 rounded-[2rem] border backdrop-blur-xl bg-white/[0.02] transition-all",
        styles[variant]
      )}
    >
      {/* Decorative Blur Circle */}
      <div className={cn("absolute -right-4 -top-4 w-24 h-24 blur-3xl opacity-20 rounded-full bg-current")} />

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium tracking-wider uppercase opacity-60">{title}</span>
          <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10">
            <Icon size={20} />
          </div>
        </div>
        
        <div>
          <h3 className="text-3xl font-bold tracking-tight text-white">
            <span className="text-lg mr-1 opacity-50">₹</span>
            {amount.toLocaleString('en-IN')}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <div className="h-1 w-12 rounded-full bg-white/10 overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }} 
                 animate={{ width: '60%' }} 
                 className="h-full bg-current" 
               />
            </div>
            <span className="text-[10px] font-bold opacity-40">STABLE</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;