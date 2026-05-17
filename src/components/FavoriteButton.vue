<script setup lang="ts">
  import { computed } from 'vue'
  import { useFavoritesStore } from '@/stores/favorites'
  import type { User } from '@/types/user'

  const props = defineProps<{
    user: User
  }>()

  const favoritesStore = useFavoritesStore()

  const isFavorite = computed(() => favoritesStore.isFavorite(props.user.id))

  function toggle(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
    favoritesStore.toggleFavorite(props.user)
  }
</script>

<template>
  <button
    type="button"
    class="flex size-8 cursor-pointer items-center justify-center rounded-full transition-colors"
    :class="isFavorite ? 'bg-rose-500/20 text-rose-400' : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-rose-300'"
    :aria-label="isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'"
    :aria-pressed="isFavorite"
    @click="toggle"
  >
    <svg
      class="size-5"
      :fill="isFavorite ? 'currentColor' : 'none'"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  </button>
</template>
