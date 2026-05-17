<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { RouterLink } from 'vue-router'
  import UserCard from '@/components/UserCard.vue'
  import type { User } from '@/types/user'

  const users = ref<User[]>([])
  const loading = ref<boolean>(true)

  onMounted(async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    users.value = await response.json()
    loading.value = false
  })
</script>

<template>
  <div class="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-8 sm:px-6 lg:px-8 mx-auto max-w-6xl">
    <div class="mb-4">
      <h1 class="text-3xl font-bold tracking-tight text-slate-900">Все пользователи</h1>
      <p v-if="!loading" class="mt-2 text-slate-500">
        Найдено: {{ users.length }}
      </p>
    </div>

    <p v-if="loading" class="text-slate-500">Загрузка...</p>

    <ul
      v-else
      class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
    >
      <RouterLink v-for="user in users" :key="user.id" :to="`/user/${user.id}`">
        <UserCard :user="user" />
      </RouterLink>
    </ul>
  </div>
</template>
