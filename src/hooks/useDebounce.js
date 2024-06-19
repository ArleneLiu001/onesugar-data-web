import {
  ref
} from 'vue'
export default function (fn, delay) {
  const timer = ref(null)
  const cancel = () => timer.value && clearInterval(timer.value)

  const run = (...args) => {
    cancel()
    timer.value = setInterval(() => fn(...args), delay)
  }

  return {
    run,
    cancel
  }
}