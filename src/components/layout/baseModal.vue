<template>
  <a-modal v-model:visible="showModal" :title="data.title" @ok="handleModal" @cancel="handleModalClose"  :width="width || 480">
    <slot name="top" />
    <BaseForm ref="baseFormRef" :options="data.formOptions || formOptions" :rules="data.formRules" :form="data.formData" :formList="data.formList" @on-change="handleChange" />
    <slot name="bottom" />
  </a-modal>
</template>

<script>
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { BaseForm } from '@/components/layout'
export default defineComponent({
  name: 'AdvModalBox',
  components: {
    BaseForm
  },
  emits: ['on-change'],
  props: {
    width: {
      type: Number,
      default: 480
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, { emit }) {
    const baseFormRef = ref()
    const state = reactive({
      showModal: false,
      formOptions: { labelCol: 6, wrapperCol: 18 }
    })
    function handleChange(from) {
      emit('on-change', from)
      state.showModal = false
    }

    function handleModal() {
      baseFormRef.value.handleSubmit()
    }

    function handleModalClose(){
      baseFormRef.value.handleReset()
    }

    return {
      ...toRefs(props),
      baseFormRef,
      ...toRefs(state),
      handleModal,
      handleChange,
      handleModalClose
    }
  }
})
</script>