<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import logoUrl from '@/assets/logo.svg'
</script>

<template>
  <header class="bg-gray-800 text-white">
    <div class="mx-auto flex max-w-6xl items-center gap-8 px-4 py-4 sm:px-6 lg:px-8">
      <RouterLink to="/" class="shrink-0 transition-opacity hover:opacity-80" aria-label="На главную">
        <img :src="logoUrl" alt="Vue" class="h-8 w-auto" />
      </RouterLink>
      <nav class="flex gap-4">
        <RouterLink to="/" class="hover:text-gray-300">Главная</RouterLink>
        <RouterLink to="/search" class="hover:text-gray-300">Поиск</RouterLink>
        <RouterLink to="/favorites" class="hover:text-gray-300">Избранное</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
</style>
