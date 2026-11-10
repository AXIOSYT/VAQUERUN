import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function localImage(path: string): string {
  if (!path) return ''
  if (/^https?:\/\//.test(path) || path.startsWith('data:')) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\/?public\//, '').replace(/^\//, '')}`
}

export function whatsAppLink(numberOrUrl: string): string {
  if (!numberOrUrl) return ''
  if (/^https?:\/\//.test(numberOrUrl)) return numberOrUrl
  const digits = numberOrUrl.replace(/\D/g, '')
  return digits ? `https://wa.me/${digits}` : ''
}
