<template>
  <a-form ref="formRef" :model="form" :rules="rules" class="form-box" :labelCol="{ span: options.labelCol }" :wrapperCol="{ span: options.wrapperCol }">
    <slot name="header" :row="form"></slot>
    <template v-for="item in formList">
      <template v-if="item.type === 'slotTitle'" :key="item.slot">
        <slot :name="item.slot" />
      </template>
      <template v-if="item.isHide ? item.isHide.every((item) => !!form[item]) : true">
        <template v-if="item.type === 'textarea'">
          <a-form-item :label="item.label" :name="item.key" :key="item.key" :ref="item.key">
            <a-input v-model:value="form[item.key]" type="textarea" :rows="4" :maxlength="item.maxlength" :placeholder="item.placeholder || '请输入'" />
          </a-form-item>
        </template>
        <template v-if="item.type === 'input'">
          <a-form-item :label="item.label" :name="item.key" :key="item.key">
            <a-input
              :style="{ width: `calc(100% - ${item.afterWidth + 10}px)` }"
              v-model:value.trim="form[item.key]"
              :disabled="item.disabled"
              :readonly="form[item.readonly]"
              :placeholder="item.placeholder || '请输入'"
              :maxlength="item.maxlength"
              @change="handleChange(item)"
            />
            <p v-if="item.title" class="font12 sub-text" style="line-height: 25px">{{ item.title }}</p>
            <span v-if="item.afterText" :style="{ position: 'absolute', top: '4px', right: `-${item.afterWidth + 10 || 0}px` }">{{ item.afterText }}</span>
          </a-form-item>
        </template>
        <template v-if="item.type === 'date' || item.type === 'daterange'">
          <a-form-item :label="item.label" :name="item.key" :key="item.key">
            <a-date-picker
              style="width: 100%"
              :editable="editableDate"
              :value="form[item.key]"
              :options="optionsDate"
              split-panels
              :type="item.type"
              placeholder="请选择"
              :format="item.format || 'yyyy/MM/dd'"
              @on-change="(e) => selectDatePicker(e, item)"
            ></a-date-picker>
          </a-form-item>
        </template>
        <template v-if="item.type === 'switch'">
          <a-form-item :label="item.label" :name="item.key" :key="item.key">
            <span class="u-mr10" v-if="item.option && item.option.open">{{ item.option.open }}</span>
            <a-switch v-model:checked="form[item.key]" :size="item.size"> </a-switch>
            <span class="u-ml10" v-if="item.option && item.option.close">{{ item.option.close }}</span>
          </a-form-item>
        </template>
        <template v-if="item.type === 'radio'">
          <a-form-item :label="item.label" :name="item.key" :key="item.key" :class="item.className">
            <a-radio-group v-model:value="form[item.key]" :defaultValue="item.defaultValue" :options="item.selectArr"> </a-radio-group>
          </a-form-item>
        </template>
        <template v-if="item.type === 'checkbox' && item.options && item.options.selectArr">
          <a-form-item :label="item.label" :name="item.key" :key="item.key">
            <a-checkbox-group v-model="form[item.key]">
              <a-checkbox :label="option[item.options.key]" v-for="option in item.options.selectArr" :key="option[item.options.key]">{{ option[item.options.label] }}</a-checkbox>
            </a-checkbox-group>
          </a-form-item>
        </template>
        <template v-if="item.type === 'checkboxGroup' && item.options && item.options.selectArr">
          <a-form-item :label="item.label" :name="item.key" :key="item.key">
            <a-checkbox-group v-model="form[item.key]" class="form-box-checkbox-group">
              <div v-for="(option, index) in item.options.selectArr" :key="index" class="form-box-checkbox-group-item">
                <div>{{ option.name }}</div>
                <a-checkbox :label="child[item.options.key]" v-for="child in option.children" :key="child[item.options.key]">{{ child[item.options.label] }}</a-checkbox>
              </div>
            </a-checkbox-group>
          </a-form-item>
        </template>
        <template v-if="item.type === 'select' && item.options && item.options.selectArr">
          <a-form-item :label="item.label" :name="item.key" :key="item.key">
            <a-select v-model:value="form[item.key]" :placeholder="item.placeholder || '请选择'">
              <a-select-option :value="option.value" v-for="option in item.options.selectArr" :key="option.value">{{ option.label }}</a-select-option>
            </a-select>
            <p v-if="item.title" class="font12 sub-text" style="line-height: 25px">{{ item.title }}</p>
          </a-form-item>
        </template>
        <template v-if="item.type === 'upload'">
          <a-form-item :label="item.label" :name="item.key" :key="item.key">
            <Upload :size="item.size" ref="formUploadRef" :number="item.number" :accept="item.accept || '*'" :fileList="getFileList(item)" @on-change="(e) => handelUpload(e, item.key)">
              <span v-if="item.title" class="font12" style="position: absolute; left: 0; bottom: -14px; width: max-content; display: inline-block; color: #969699">{{ item.title }}</span>
            </Upload>
          </a-form-item>
        </template>
      </template>
    </template>
    <slot :row="form" name="default"></slot>
  </a-form>
</template>

<script>
import { defineComponent, reactive, toRefs, ref, toRaw, watch, getCurrentInstance, nextTick } from 'vue'
import Upload from './upload.vue'
export default defineComponent({
  name: 'FormLayout',
  components: {
    Upload
  },
  props: {
    options: {
      type: Object,
      default: () => {
        return { labelCol: 3, wrapperCol: 10 }
      }
    },
    form: {
      type: Object,
      default: () => {
        return {}
      }
    },
    formList: {
      type: Array,
      default: () => {
        return []
      }
    },
    rules: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: ['on-change', 'on-submit'],
  setup(props, { emit }) {
    const {
      proxy: { $refs }
    } = getCurrentInstance()
    const { options, form, formList, rules } = toRefs(props)
    const formRef = ref()
    const formUploadRef = ref()
    const stats = reactive({
      editableDate: false,
      optionsDate: {
        // shortcuts: [
        //   {
        //     text: '近30天',
        //     value() {
        //       const end = new Date()
        //       const start = new Date()
        //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        //       return [start, end]
        //     }
        //   },
        //   {
        //     text: '近90天',
        //     value() {
        //       const end = new Date()
        //       const start = new Date()
        //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        //       return [start, end]
        //     }
        //   },
        //   {
        //     text: '近180天',
        //     value() {
        //       const end = new Date()
        //       const start = new Date()
        //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
        //       return [start, end]
        //     }
        //   }
        // ]
      }
    })

    watch(
      () => form,
      () => {}
    )

    function selectDatePicker(e, item) {
      if (item.type === 'date') {
        form[item.key] = e.replace(/\//g, '-')
      }
      if (item.type === 'daterange') {
        form.fromDate = e[0].replace(/\//g, '-')
        form.endDate = e[1].replace(/\//g, '-')
      }
      emit('select-change', form)
    }

    function handelUpload(e, key) {
      form.value[key] = e.fileListCode
    }

    function getFileList(item) {
      if (!item) return
      let arr = []
      if (item.fileType && typeof toRaw(form.value[item.fileType]) === 'object') {
        arr.push({
          name: form.value[item.fileType].name,
          code: form.value[item.fileType].code,
          url: form.value[item.fileType].url
        })
      } else if (item.fileType && typeof toRaw(form.value[item.fileType]) === 'array') {
        form.value[item.fileType].map((item) => {
          arr.push({
            code: item.code,
            name: item.name,
            url: item.url
          })
        })
      }
      return arr
    }

    function handleChange(item) {
      if (item.mode === 'number') {
        form.value[item.key] = form.value[item.key].replace(/[^\.\d]/g, '')
        if (item.pointNum && form.value[item.key] && form.value[item.key].indexOf('.') > -1) {
          form.value[item.key] = form.value[item.key].substring(0, form.value[item.key].indexOf('.') + item.pointNum + 1)
        }
      }
      let curObj = {}
      curObj[item.key] = form.value[item.key]
      formRef.value.validateFields([item.key]).then(
        () => {
          emit('on-change', Object.assign(curObj, { err: false }))
        },
        () => {
          emit('on-change', Object.assign(curObj, { err: true }))
        }
      )
    }

    function handleSubmit() {
      formRef.value.validate().then(() => {
        emit('on-submit', toRaw(form.value))
      })
    }

    function handleReset() {
      formRef.value.resetFields()
      if (formUploadRef.value && formUploadRef.value.copyFileList) {
        formUploadRef.value.copyFileList = []
      }
      getFileList()
    }
    return {
      emit,
      options,
      form,
      formList,
      rules,
      ...toRefs(stats),
      formRef,
      formUploadRef,
      getFileList,
      handelUpload,
      selectDatePicker,
      handleSubmit,
      handleReset,
      handleChange
    }
  }
})
</script>
