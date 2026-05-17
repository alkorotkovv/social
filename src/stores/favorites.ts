import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/user'

const STORAGE_KEY = 'social-favorites'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<User[]>(loadFavorites())

  const count = computed(() => favorites.value.length)

  function isFavorite(userId: number): boolean {
    return favorites.value.some((user) => user.id === userId)
  }

  function toggleFavorite(user: User): void {
    if (isFavorite(user.id)) {
      removeFavorite(user.id)
    } else {
      favorites.value.push(user)
      saveFavorites()
    }
  }

  function removeFavorite(userId: number): void {
    favorites.value = favorites.value.filter((user) => user.id !== userId)
    saveFavorites()
  }

  function saveFavorites(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites.value))
  }

  return { favorites, count, isFavorite, toggleFavorite, removeFavorite }
})

function loadFavorites(): User[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as User[]) : []
  } catch {
    return []
  }
}
