<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import UserCard from '@/components/UserCard.vue'
import { useFavoritesStore } from '@/stores/favorites'

const favoritesStore = useFavoritesStore()
const { favorites } = storeToRefs(favoritesStore)
</script>

<template>
  <div class="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-8 sm:px-6 lg:px-8 mx-auto max-w-6xl">
    <div class="mb-8">
      <h1 class="text-3xl font-bold tracking-tight text-slate-900">Избранные пользователи</h1>
      <p class="mt-2 text-slate-500">
        <template v-if="favorites.length">Сохранено: {{ favorites.length }}</template>
        <template v-else>Добавляйте пользователей, нажимая на сердечко в карточке</template>
      </p>
    </div>

    <p v-if="favorites.length === 0" class="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-slate-500">
      Пока никого нет в избранном
    </p>

    <ul
      v-else
      class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
    >
      <li v-for="user in favorites" :key="user.id">
        <RouterLink :to="`/user/${user.id}`">
          <UserCard :user="user" />
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
