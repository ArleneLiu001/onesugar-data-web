<template>
  <div class="right-contain">
    <div class="title-info">收款方信息</div>
    <div class="account-info">
      <div class="mb-4 line-h"> <span class="a-title">开户名称：</span>{{ bankObj.bankName || '-' }}</div>
      <div class="mb-4 line-h"> <span class="a-title">银行卡号：</span>{{ bankObj.bankAccount || '-' }}</div>
      <div class="mb-4 line-h"> <span class="a-title">开户行：</span>{{ bankObj.bankSub || '-' }}</div>
    </div>
    <div class="title-info mt-24">充值必读</div>
    <div class="mb-4 red line-h">到账金额以收款方实际到账金额为准；</div>
    <div class="mb-4 red line-h">请勿多转、少转和分次转账，否则影响核销进度；</div>
    <div class="mb-4 red line-h">未审核订单将于7日内取消；</div>
    <div class="mb-4 red line-h">如有疑问请致电：{{ appConfig.hotline }}；</div>
  </div>
</template>

<script>
import { defineComponent, toRefs, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  props: {
    bankObj: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const store = useStore()
    return {
      ...toRefs(props),
      appConfig: computed(() => store.state.options.appConfig)
    }
  }
})
</script>
