import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Fusionne les classes Tailwind proprement en gérant les conflits
 * (ex: 'p-4 p-2' devient 'p-2')
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}