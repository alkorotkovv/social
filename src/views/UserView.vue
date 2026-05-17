<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import type { User } from '@/types/user'
import FavoriteButton from '@/components/FavoriteButton.vue'
import { useGoBack } from '@/composables/useGoBack'
import {
  formatUserAddress,
  getUserAvatarColor,
  getUserInitials,
  getWebsiteUrl,
} from '@/utils/user'

const route = useRoute()
const id = route.params.id as string
const { goBack } = useGoBack()

const user = ref<User | null>(null)
const loading = ref(true)

const avatarColor = computed(() =>
  user.value ? getUserAvatarColor(user.value.id) : getUserAvatarColor(0),
)

const websiteUrl = computed(() =>
  user.value?.website ? getWebsiteUrl(user.value.website) : '',
)

const formattedAddress = computed(() =>
  user.value ? formatUserAddress(user.value.address) : '',
)

onMounted(async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
  if (response.ok) {
    user.value = await response.json()
  }
  loading.value = false
})
</script>

<template>
  <div class="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-6xl">
      <button
        type="button"
        class="inline-flex cursor-pointer items-center gap-1 text-sm text-slate-500 transition-colors hover:text-slate-800"
        @click="goBack"
      >
        <svg class="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Назад
      </button>

      <p v-if="loading" class="mt-8 text-slate-500">Загрузка...</p>

      <p v-else-if="!user" class="mt-8 text-slate-500">Пользователь не найден</p>

      <article
        v-else
        class="mt-6 overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm"
      >
        <header class="relative bg-gradient-to-br from-slate-800 to-slate-900 px-6 py-10 text-center">
          <FavoriteButton :user="user" class="absolute right-4 top-4" />
          <div
            class="mx-auto flex size-24 items-center justify-center rounded-2xl bg-gradient-to-br text-3xl font-bold text-white shadow-lg ring-4 ring-white/10"
            :class="avatarColor"
          >
            {{ getUserInitials(user.name) }}
          </div>
          <h1 class="mt-5 text-2xl font-bold tracking-tight text-white">
            {{ user.name }}
          </h1>
          <p class="mt-1 text-slate-300">@{{ user.username }}</p>
        </header>

        <section>
          <h2 class="border-b border-slate-100 bg-slate-50 px-6 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Контакты
          </h2>
          <dl class="divide-y divide-slate-100">
            <div class="grid gap-1 px-6 py-4 sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium text-slate-500">Email</dt>
              <dd class="text-sm text-slate-900 sm:col-span-2">
                <a :href="`mailto:${user.email}`" class="transition-colors hover:text-violet-600">
                  {{ user.email }}
                </a>
              </dd>
            </div>
            <div class="grid gap-1 px-6 py-4 sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium text-slate-500">Телефон</dt>
              <dd class="text-sm text-slate-900 sm:col-span-2">
                <a
                  :href="`tel:${user.phone}`"
                  class="transition-colors hover:text-violet-600"
                >
                  {{ user.phone }}
                </a>
              </dd>
            </div>
            <div class="grid gap-1 px-6 py-4 sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium text-slate-500">Сайт</dt>
              <dd class="text-sm text-slate-900 sm:col-span-2">
                <a
                  :href="websiteUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="transition-colors hover:text-violet-600"
                >
                  {{ user.website }}
                </a>
              </dd>
            </div>
          </dl>
        </section>

        <section>
          <h2 class="border-b border-slate-100 bg-slate-50 px-6 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Адрес
          </h2>
          <dl class="divide-y divide-slate-100">
            <div class="grid gap-1 px-6 py-4 sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium text-slate-500">Полный адрес</dt>
              <dd class="text-sm text-slate-900 sm:col-span-2">{{ formattedAddress }}</dd>
            </div>
            <div class="grid gap-1 px-6 py-4 sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium text-slate-500">Улица</dt>
              <dd class="text-sm text-slate-900 sm:col-span-2">{{ user.address.street }}</dd>
            </div>
            <div class="grid gap-1 px-6 py-4 sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium text-slate-500">Офис</dt>
              <dd class="text-sm text-slate-900 sm:col-span-2">{{ user.address.suite }}</dd>
            </div>
            <div class="grid gap-1 px-6 py-4 sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium text-slate-500">Город</dt>
              <dd class="text-sm text-slate-900 sm:col-span-2">{{ user.address.city }}</dd>
            </div>
            <div class="grid gap-1 px-6 py-4 sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium text-slate-500">Индекс</dt>
              <dd class="text-sm text-slate-900 sm:col-span-2">{{ user.address.zipcode }}</dd>
            </div>
            <div class="grid gap-1 px-6 py-4 sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium text-slate-500">Координаты</dt>
              <dd class="text-sm text-slate-900 sm:col-span-2">
                {{ user.address.geo.lat }}, {{ user.address.geo.lng }}
              </dd>
            </div>
          </dl>
        </section>

        <section>
          <h2 class="border-b border-slate-100 bg-slate-50 px-6 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Компания
          </h2>
          <dl class="divide-y divide-slate-100">
            <div class="grid gap-1 px-6 py-4 sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium text-slate-500">Название</dt>
              <dd class="text-sm font-medium text-slate-900 sm:col-span-2">{{ user.company.name }}</dd>
            </div>
            <div class="grid gap-1 px-6 py-4 sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium text-slate-500">Слоган</dt>
              <dd class="text-sm italic text-slate-700 sm:col-span-2">{{ user.company.catchPhrase }}</dd>
            </div>
            <div class="grid gap-1 px-6 py-4 sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium text-slate-500">Направление</dt>
              <dd class="text-sm text-slate-900 sm:col-span-2">{{ user.company.bs }}</dd>
            </div>
          </dl>
        </section>
      </article>
    </div>
  </div>
</template>
