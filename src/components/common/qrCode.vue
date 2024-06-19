<template>
  <QRCodeVue3
    :width="option.width || 100"
    :height="option.height || 100"
    :value="value"
    :qrOptions="{ typeNumber: 4, mode: 'Byte', errorCorrectionLevel: 'L' }"
    :imageOptions="{ hideBackgroundDots: false }"
    :dotsOptions="{
      type: 'Square',
      color: '#333'
    }"
    :backgroundOptions="{ color: '#fff' }"
    :cornersSquareOptions="{ type: undefined, color: '#00' }"
    :cornersDotOptions="{ type: undefined, color: '#000' }"
    :download="false"
    :myclass="option.qrclass"
    :imgclass="option.imgclass"
  />
</template>

<script>
import { defineComponent, toRefs } from 'vue'
import QRCodeVue3 from 'qrcode-vue3'

export default defineComponent({
  name: 'QRCodeVue3Pages',
  components: {
    QRCodeVue3
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    option: {
      type: Object,
      default: {}
    }
  },
  setup(props) {
    return {
      ...toRefs(props)
    }
  }
})
</script>
