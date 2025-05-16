import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date))
}

export function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return 0
  return ((current - previous) / previous) * 100
}

export function truncateString(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + "..."
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function generatePaginationArray(
  currentPage: number,
  totalPages: number,
  maxLength: number
): (number | "...")[] {
  if (totalPages <= maxLength) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const sideWidth = Math.floor(maxLength / 2)
  const leftWidth = Math.ceil(maxLength / 2) - 1

  if (currentPage <= leftWidth) {
    return [...Array.from({ length: maxLength - 2 }, (_, i) => i + 1), "...", totalPages]
  }

  if (currentPage >= totalPages - sideWidth) {
    return [1, "...", ...Array.from({ length: maxLength - 2 }, (_, i) => totalPages - maxLength + i + 3)]
  }

  return [
    1,
    "...",
    ...Array.from({ length: maxLength - 4 }, (_, i) => currentPage - Math.floor((maxLength - 4) / 2) + i),
    "...",
    totalPages,
  ]
}
