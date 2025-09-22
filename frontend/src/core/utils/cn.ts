import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * @utility cn
 * @summary A utility function to merge Tailwind CSS classes conditionally.
 * @description Combines clsx and tailwind-merge to provide a simple and
 * powerful way to construct className strings without style conflicts.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
