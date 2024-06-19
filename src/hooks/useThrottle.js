import {
  ref,
  watch
} from 'vue'
export default function (fn, delay) {
  const current = ref({
    fn,
    timer: null
  })
  watch(() => fn, () => {
    current.value.fn = fn
  })

  return function () {
    if (!current.value.timer) {
      current.value.timer = setTimeout(() => {
        current.value.timer = null
      }, delay)
      current.value.fn()
    }
  }
}