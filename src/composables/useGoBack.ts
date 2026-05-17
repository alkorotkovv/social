import { useRouter } from 'vue-router'

export function useGoBack(fallback = '/') {
  const router = useRouter()

  function goBack() {
    if (window.history.state?.back != null) {
      router.back()
    } else {
      router.push(fallback)
    }
  }

  return { goBack }
}
