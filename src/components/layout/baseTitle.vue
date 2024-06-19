<template>
  <div class="base-title-box" :class="!subTitle ? 'no-border-bottom' : ''">
    <span class="base-title-box-title bold" :class="!subTitle ? 'font16 left-border ' : 'font14'">{{ title }}</span>
    <slot />
  </div>
</template>

<script>
import { defineComponent, toRefs } from 'vue'
export default defineComponent({
  props: {
    title: String,
    subTitle: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    return {
      ...toRefs(props)
    }
  }
})
</script>
