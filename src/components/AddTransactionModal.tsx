import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle } from 'lucide-react';

const CATEGORIES = [
  { id: 'food', label: '🍔 Food' },
  { id: 'transport', label: '🚗 Transport' },
  { id: 'shopping', label: '🛍️ Shopping' },
  { id: 'entertainment', label: '🎬 Entertainment' },
  { id: 'bills', label: '📄 Bills' },
  { id: 'health', label: '🏥 Health' },
  { id: 'education', label: '📚 Education' },
  { id: 'salary', label: '💰 Salary' },
  { id: 'freelance', label: '💻 Freelance' },
  { id: 'other', label: '📦 Other' },
];

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (title: string, amount: number, type: 'INCOME' | 'EXPENSE', category: string) => void;
}

const AddTransactionModal: React.FC<ModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'INCOME' | 'EXPENSE'>('EXPENSE');
  const [category, setCategory] = useState('food');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;
    onAdd(title, Number(amount), type, category);
    setTitle('');
    setAmount('');
    setCategory('food');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-[#0F0F0F] border border-white/10 w-full max-w-md rounded-[3rem] p-10 shadow-2xl"
          >
            <h2 className="text-3xl font-black mb-8 text-white">New Entry</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex p-1.5 bg-white/5 rounded-2xl border border-white/5">
                {(['EXPENSE', 'INCOME'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all ${
                      type === t ? 'bg-white text-black' : 'text-white/30'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 outline-none focus:border-blue-500/50 transition-all text-white placeholder-white/30"
              />

              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount (₹)"
                className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 outline-none focus:border-emerald-500/50 transition-all font-bold text-xl text-white placeholder-white/30"
              />

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 mt-2 outline-none appearance-none cursor-pointer text-white"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-[#0F0F0F] text-white">
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 py-5 rounded-2xl font-black text-white hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <PlusCircle size={20} /> Save Entry
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddTransactionModal;