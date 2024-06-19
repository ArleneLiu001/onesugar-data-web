<template>
  <div class="box-info-list">
    <div class="list-item" :class="{ vertical: vertical }" v-for="item in list" :key="item.key" :style="{ width: `${100 / column}%` }">
      <div class="list-item-label" :class="item.labelClass || labelClass"><span class="red" v-if="item.required">*</span>{{ item.label }}</div>
      <div class="list-item-text" :class="item.textClass || textClass" :style="{ 'margin-left': `${vertical ? 0 : item.width ? item.width : width}px` }">
        <template v-if="!item.slot">
          {{ data[item.key] || '-' }}
        </template>
        <template v-else>
          <slot :name="item.slot" :item="item" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
  name: 'BaseListBox',
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    labelClass: {
      type: String
    },
    textClass: {
      type: String
    },
    width: {
      type: Number,
      default: 100
    },
    column: {
      type: Number,
      default: 2
    },
    vertical: {
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
