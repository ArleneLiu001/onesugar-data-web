<template>
  <a-pagination class="tar" show-size-changer :page-size-options="pageSizeOptions" v-model:current="pageNumber" v-model:pageSize="pageSize" :total="total" :show-total="(total) => `共 ${total} 条`" @showSizeChange="onShowSizeChange" @change="handelChange">
    <template #buildOptionText="props">
      <span>每页{{ props.value }}条</span>
    </template>
  </a-pagination>
</template>

<script>
import { ref, defineComponent, watch, toRefs } from 'vue'
export default defineComponent({
  name: 'PaginationComponent',
  props: {
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageNumber: {
      type: Number,
      default: 1
    }
  },
  setup(props, { emit }) {
    const pageSizeOptions = ref(['10', '20', '30', '50'])
    const { pageNumber, pageSize, total } = toRefs(props)
    watch(
      () => total,
      () => {}
    )
    function onShowSizeChange(page, pageSize) {
      pageNumber.value = 1
      emit('on-change', { current: 1, pageSize })
    }
    function handelChange(current, pageSize) {
      emit('on-change', { current, pageSize })
    }
    return {
      pageSizeOptions,
      pageNumber,
      pageSize,
      total,
      onShowSizeChange,
      handelChange
    }
  }
})
</script>