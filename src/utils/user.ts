import type { UserAddress } from '@/types/user'

export const AVATAR_COLORS = [
  'from-violet-500 to-purple-600',
  'from-sky-500 to-blue-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',
] as const

export function getUserInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function getUserAvatarColor(userId: number): string {
  return AVATAR_COLORS[userId % AVATAR_COLORS.length] ?? AVATAR_COLORS[0]
}

export function formatUserAddress(address: UserAddress): string {
  const { street, suite, city, zipcode } = address
  return `${street}, ${suite}, ${city} ${zipcode}`
}

export function getWebsiteUrl(website: string): string {
  return website.startsWith('http') ? website : `https://${website}`
}
