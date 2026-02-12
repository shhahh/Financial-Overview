import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Ye function complex Tailwind classes ko merge karne ke kaam aata hai
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}