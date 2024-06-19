<template>
  <div class="mask-bg">
    <div class="fee-confirm">
      <div class="notice-box">
        <template v-if="mode === 'offline'">
          <p class="tks">感谢您的信任与支持！</p>
          <p class="notice-info">核对款项后，我们将在第一时间为您充值</p>
        </template>
         <template v-else>
          <p class="tks">充值成功！</p>
          <p class="notice-info">感谢您的信任与支持！</p>
        </template>
        <p class="notice-info">如有疑问请联系：{{ appConfig.hotline }}</p>
        <div class="notice-btn" @click="emit('confirm')">我知道了</div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed, toRefs } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'feeConfirmBox',
  props: {
    mode: {
      type: String,
      default: 'offline'
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    return {
      emit,
      ...toRefs(props),
      appConfig: computed(() => store.state.options.appConfig)
    }
  }
})
</script>
