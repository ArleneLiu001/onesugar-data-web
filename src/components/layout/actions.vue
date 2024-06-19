<template>
  <div class="base-actions">
    <slot name="before"></slot>

    <div v-for="select in selectList" :key="select.key" class="u-mb10">
      <div class="base-actions-list">
        <div class="action-btns-label" :style="{ width: `${select.width}px` }">{{ select.name }}</div>
        <div v-if="select.type === 'checkbox' && select.options" class="action-btns-list">
          <a-checkbox v-if="select.showAll" v-model:checked="selectAll[select.key]" @change="handleChangeAll('checkbox', select)" class="mr-8">全部</a-checkbox>
          <a-checkbox-group v-model:value="selectObj[select.key]" :options="select.options" @change="handleChange('checkbox', select)"> </a-checkbox-group>
        </div>
        <!-- <div class="action-btns-list" v-if="select.inputType === 'radio' && select.items">
          <Radio v-model="selectAll[select.key]" @on-change="handleChangeAll('radio', select)" style="padding: 5px 0">全部</Radio>
          <RadioGroup v-model="selectObj[select.key]" @on-change="handleChange('radio', select)">
            <Radio v-for="radio in select.items" :key="radio.val" :label="radio.val" style="padding: 5px 0">{{ radio.text }}</Radio>
          </RadioGroup>
        </div>
        <template v-if="select.inputType === 'date' || select.inputType === 'daterange'">
          <DatePicker style="width: 220px" :editable="editableDate" split-panels :value="select.defaultDate" :type="select.inputType" placeholder="请选择" :format="select.format || 'yyyy/MM/dd'" @on-change="(e) => selectDatePicker(e, select)"></DatePicker>
        </template>
        <template v-if="select.inputType === 'select'">
          <Select v-model="selectObj[select.key]" class="action-btns-list" @on-change="handleChange('select', select)">
            <Option value="" v-if="!select.hideAll">全部</Option>
            <Option v-for="option in select.items" :key="option.val" :value="option.val">{{ option.text }}</Option>
          </Select>
        </template> -->
      </div>
    </div>

    <div class="base-actions-btns">
      <template v-for="item in btnList" :key="item.event">
        <a-button v-if="!Object.keys(item).includes('showBtn') || (Object.keys(item).includes('showBtn') && item.showBtn)" :size="item.size" :disabled="item.disabled" v-text="item.label" :value="item.label" @click="item.event"></a-button>
      </template>
    </div>

    <slot name="default" />
    <div class="base-actions-search" :class="config.searchClass" v-if="showSearch">
      <a-input-search size="small" v-model:value="keywords" :placeholder="placeholder" enter-button style="width: 200px" @search="handleSearch"> </a-input-search>
    </div>
    <slot name="after"></slot>
  </div>
</template>

<script>
import { defineComponent, toRefs, reactive, toRaw, watch } from 'vue'
export default defineComponent({
  props: {
    btnList: Array,
    placeholder: String,
    showSearch: Boolean,
    selectList: Array,
    defaultSelect: {
      type: Object,
      default: {}
    },
    config: {
      type: Object,
      default: {}
    }
  },
  emits: ['check', 'search', 'select'],
  setup(props, { emit }) {
    const { defaultSelect } = toRefs(props)
    const state = reactive({
      keywords: '',
      selectAll: {},
      selectObj: {}
    })

    watch(
      () => defaultSelect,
      () => {
        state.selectObj = defaultSelect
      },
      {
        immediate: true
      }
    )
    function handleSearch() {
      emit('search', { keywords: state.keywords })
    }

    function init() {
      state.selectList.forEach((item) => {
        if (item.type === 'radio') {
          state.selectAll[item.key] = true
        }
      })
    }

    function selectDatePicker(e, select) {
      if (select.type === 'date') {
        state.selectObj[select.key] = e
      }
      if (select.type === 'daterange') {
        state.selectObj.fromDate = e[0].replace(/\//g, '-')
        state.selectObj.endDate = e[1].replace(/\//g, '-')
      }
      emit('select', toRaw(state.selectObj))
    }

    function handleChangeAll(type, select) {
      if (type === 'checkbox') {
        if (state.selectAll[select.key]) {
          state.selectObj[select.key] = select.options.map((item) => item.value)
        } else {
          state.selectObj[select.key] = []
        }
      }
      if (type === 'radio' && state.selectAll[select.key]) {
        state.selectObj[select.key] = null
      }
      emit('select', toRaw(state.selectObj))
    }
    function handleChange(type, select) {
      if (type === 'checkbox') {
        state.selectAll[select.key] = state.selectObj[select.key].length === select.options.length
      }
      if (type === 'radio' && !!state.selectObj[select.key]) {
        state.selectAll[select.key] = false
      }
      emit('select', toRaw(state.selectObj))
    }

    return {
      ...toRefs(state),
      ...toRefs(props),
      handleSearch,
      handleChange,
      handleChangeAll
    }
  }
})
</script>