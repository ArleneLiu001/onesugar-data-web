<template>
  <ul class="pay-tabs">
    <li class="pay-tabs-item" @click="emit('change', item.type)" v-for="(item, index) in tabList" :class="{ active: active === item.type }" :key="item.type">
      <img v-if="!item.hideImg" :src="item.payImg" />
      <span>{{ item.name }}</span>
    </li>
  </ul>
</template>
<script>
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
  props: {
    tabList: {
      type: Array,
      default: () => []
    },
    active: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    return {
      emit,
      ...toRefs(props)
    }
  }
})
</script>
