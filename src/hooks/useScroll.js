
import { onMounted, onUnmounted, ref } from 'vue'
export default function () {
  const scrollTop = ref(0)

  function onScroll() {
    scrollTop.value =
      document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
  }
  onMounted(() => {
    window.addEventListener('scroll', onScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return {
    scrollTop
  }

}