<script setup lang="ts">
  import { RouterLink } from 'vue-router'
  import { ref, onMounted, computed } from 'vue'
  import type { User } from '@/types/user'
  import UserCard from '@/components/UserCard.vue'
  const search = ref<string>('')
  const loading = ref<boolean>(true)
  const users = ref<User[]>([])
  onMounted(async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    users.value = await response.json()
    loading.value = false
  })

  const filteredUsers = computed(() => {
    return users.value.filter((user: User) => user.name.toLowerCase().includes(search.value.toLowerCase()))
  })

</script>

<template>
  <div class="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-8 sm:px-6 lg:px-8 mx-auto max-w-6xl">
    <div class="mb-4">
      <h1 class="text-3xl font-bold tracking-tight text-slate-900">Поиск пользователей</h1>
      <input type="text" v-model="search" placeholder="Поиск" class="w-full my-2 p-2 border border-slate-300 rounded-md" />
      <p v-if="!loading" class="mt-2 text-slate-500">
        Найдено: {{ filteredUsers.length }}
      </p>
    </div>
    <p v-if="loading" class="text-slate-500">Загрузка...</p>
    <ul
      v-else
      class="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
    >
      <RouterLink v-for="user in filteredUsers" :key="user.id" :to="`/user/${user.id}`">
        <UserCard :user="user" />
      </RouterLink>
    </ul>
  </div>
</template>

<style scoped>
</style>