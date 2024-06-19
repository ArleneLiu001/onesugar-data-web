<template>
  <div class="fee-rules">
    <div class="fee-box">
      <div class="flex fee-info feerule-title">
        <div class="item-title">达成条件</div>
        <div class="item-fee">缴费金额(元) </div>
      </div>
      <div class="flex fee-info" v-for="(item, index) in levelList" :key="index">
        <div class="item-title">{{ item.orderAmountDesc }}</div>
        <div v-if="item.chargeLevel && item.chargeLevel.length">
          <div class="item-fee">
            <div v-if="item.chargeLevel.filter((item) => item.yearCharge).length > 0">
              <div v-for="(cate, i) in item.chargeLevel" :key="i">
                <div v-if="cate.category === 'trade-app'">贸易版：{{ baseUtils.formatThousands(cate.yearCharge, 0, 1) }}/年</div>
                <div v-if="cate.category === 'make-app'">制造版：{{ baseUtils.formatThousands(cate.yearCharge, 0, 1) }}/年</div>
              </div>
            </div>
            <div v-else>0</div>
          </div>
        </div>
        <div v-else class="item-fee">0</div>
      </div>
    </div>
    <p class="sale-detail">年销售额：截止到上月结束，最近12个月的总销售额 </p>
    <p class="sale-detail">缴费金额 = 年销售额对应的缴费金额/12个月 </p>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, onMounted, getCurrentInstance } from 'vue'
import baseUtils from '@/utils/baseUtils'

export default defineComponent({
  props: {
    levelList: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const {
      proxy: { apis }
    } = getCurrentInstance()
    const state = reactive({})
    onMounted(() => {})
    return {
      baseUtils,
      ...toRefs(state)
    }
  }
})
</script>
<style lang="scss" scoped>
.fee-rules {
  color: #323233;
  padding: 4px 0;
  width: 448px;
  .fee-box {
    border: 1px solid #e9eaeb;
    .fee-info {
      border-bottom: 1px solid #e9eaeb;
      align-items: center;
      &.feerule-title {
        background: #f8f9fa;
        .item-fee {
          border-left: none;
        }
      }
      .item-title {
        width: 48%;
        padding: 9px 16px;
      }
      .item-fee {
        padding: 9px 16px;
        border-left: 1px solid #e9eaeb;
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
  .sale-detail {
    margin-top: 8px;
    color: #969699;
  }
}
</style>

