<script setup lang="ts">
import FavoriteButton from '@/components/FavoriteButton.vue'
import type { User } from '@/types/user'
import { getUserAvatarColor, getUserInitials } from '@/utils/user'

const props = defineProps<{
  user: User
}>()

const avatarColor = getUserAvatarColor(props.user.id)
</script>

<template>
  <article
    class="user-card group flex flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
  >
    <header class="relative flex items-center gap-3 bg-gradient-to-br from-slate-800 to-slate-900 px-4 py-3">
      <FavoriteButton :user="user" class="absolute right-3 top-3" />
      <div
        class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-bold text-white shadow-sm ring-2 ring-white/20"
        :class="avatarColor"
      >
        {{ getUserInitials(user.name) }}
      </div>
      <div class="min-w-0 pr-8">
        <h2 class="truncate text-base font-semibold leading-tight text-white">
          {{ user.name }}
        </h2>
        <p class="truncate text-sm text-slate-300">@{{ user.username }}</p>
      </div>
    </header>

    <ul class="space-y-2 px-4 py-3">
      <li class="flex items-center gap-2.5">
        <span
          class="flex size-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-500"
          aria-hidden="true"
        >
          <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </span>
        <div class="min-w-0 flex-1">
          <p class="text-[11px] font-medium uppercase tracking-wide text-slate-400">Email</p>
          <a
            :href="`mailto:${user.email}`"
            class="block truncate text-sm text-slate-700 transition-colors hover:text-violet-600"
          >
            {{ user.email }}
          </a>
        </div>
      </li>

      <li class="flex items-center gap-2.5">
        <span
          class="flex size-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-500"
          aria-hidden="true"
        >
          <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </span>
        <div class="min-w-0 flex-1">
          <p class="text-[11px] font-medium uppercase tracking-wide text-slate-400">Телефон</p>
          <a
            :href="`tel:${user.phone.replace(/\s/g, '')}`"
            class="block text-sm text-slate-700 transition-colors hover:text-violet-600"
          >
            {{ user.phone }}
          </a>
        </div>
      </li>

      <li class="flex items-center gap-2.5">
        <span
          class="flex size-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-500"
          aria-hidden="true"
        >
          <svg class="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </span>
        <div class="min-w-0 flex-1">
          <p class="text-[11px] font-medium uppercase tracking-wide text-slate-400">Компания</p>
          <p class="truncate text-sm font-medium text-slate-700">{{ user.company.name }}</p>
        </div>
      </li>
    </ul>
  </article>
</template>
