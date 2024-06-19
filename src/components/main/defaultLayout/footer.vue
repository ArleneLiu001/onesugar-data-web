<template>
  <div class="main-footer">
    <a href="http://beian.miit.gov.cn" target="_blank">{{ recordNo }}</a>
    <span class="ml-10 title-text">{{ recordEntName }}</span>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { recordNo, recordEntName } from '@/config'
export default defineComponent({
  setup() {
    return {
      recordNo,
      recordEntName
    }
  }
})
</script>