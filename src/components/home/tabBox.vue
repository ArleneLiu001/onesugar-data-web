<template>
  <div class="tabbox">
    <ul class="tab-ul">
      <li class="tab-item" @click="emit('change', item.type)" v-for="(item, index) in tabList" :class="{ active: active === item.type }" :key="item.type">{{ item.name }}</li>
    </ul>
  </div>
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
      type: Number,
      default: 0
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
