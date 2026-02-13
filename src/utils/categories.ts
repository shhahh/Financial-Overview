import { ShoppingBag, Coffee, Home, Briefcase, Car, Smartphone } from 'lucide-react';

export const CATEGORIES = [
  { id: 'salary', label: 'Salary', icon: Briefcase, color: 'text-emerald-400' },
  { id: 'food', label: 'Food & Drinks', icon: Coffee, color: 'text-amber-400' },
  { id: 'rent', label: 'Rent/Home', icon: Home, color: 'text-blue-400' },
  { id: 'shopping', label: 'Shopping', icon: ShoppingBag, color: 'text-rose-400' },
  { id: 'travel', label: 'Travel', icon: Car, color: 'text-indigo-400' },
  { id: 'tech', label: 'Tech/Gadgets', icon: Smartphone, color: 'text-purple-400' },
];