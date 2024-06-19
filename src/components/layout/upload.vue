<template>
  <div class="clearfix"
       style="position: relative">
    <a-upload withCredentials
              :disabled="disabled"
              :accept="accept || '*'"
              list-type="picture-card"
              v-model:file-list="copyFileList"
              :remove="handelRemove"
              :before-upload="beforeUpload"
              :custom-request="customRequestHandel"
              @preview="handlePreview">
      <div v-if="copyFileList.length < number">
        <PlusOutlined class="font20 sub-text" />
        <div>上传凭证</div>
      </div>
    </a-upload>
    <slot></slot>
    <a-modal :visible="previewVisible"
             :footer="null"
             @cancel="handleCancel">
      <img style="width: 100%"
           :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, getCurrentInstance, toRaw, watch } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { resMsg, resDeal } from '@/utils/mixins'
export default defineComponent({
  components: {
    PlusOutlined
  },
  props: {
    number: {
      type: Number,
      default: 1
    },
    accept: {
      type: String,
      default: '*'
    },
    size: {
      type: Number,
      default: 10
    },
    fileList: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['on-change'],
  setup (props, { emit }) {
    const {
      proxy: { apis, config }
    } = getCurrentInstance()
    const { number, accept, size, fileList } = toRefs(props)
    const state = reactive({
      previewImage: '',
      previewVisible: false,
      fileListCode: [],
      copyFileList: []
    })

    watch(
      fileList,
      () => {
        state.copyFileList = []
        if (fileList.value.length) {
          fileList.value.forEach((item) => {
            state.copyFileList.push(Object.assign(item, { uid: item.code }))
          })
        }
        state.fileListCode = fileList.value.map((item) => item.code)
      },
      { immediate: true }
    )

    const handleCancel = () => {
      state.previewVisible = false
    }
    const handlePreview = async (file) => {
      if (!file.url && !file.preview) {
        file.preview = file.originFileObj.url
      }
      state.previewImage = file.url || file.preview
      state.previewVisible = true
    }

    // 删除图片
    const handelRemove = (file) => {
      if (file.code && file.uid) {
        state.fileListCode = state.fileListCode.filter((code) => code !== file.code)
      } else if (file.originFileObj && file.originFileObj.url) {
        state.fileListCode = state.fileListCode.filter((code) => code !== file.originFileObj.uid)
      }
      emit('on-change', { file, fileListCode: toRaw(state.fileListCode) })
    }

    const beforeUpload = (file) => {
      return new Promise((resolve, reject) => {
        const isAccept = accept.value === '*' || accept.value.indexOf(file.type.toLowerCase()) > -1
        if (!isAccept || !file.type) {
          resMsg(`选择文件类型不正确`, 'warning')
          reject(new Error('请上传正确的文件格式'))
        }
        const isSize = file.size / 1024 / 1024 < size.value
        if (!isSize) {
          resMsg(`选择文件不能大于${size.value}M`, 'warning')
          reject(new Error('文件过大'))
        }
        if (isAccept && isSize) {
          resolve()
        }
      })
    }

    const customRequestHandel = ({ file, onSuccess, onError }) => {
      let param = new FormData()
      let fileType = 'FILE'
      param.append('stream', file)
      param.append('name', file.name)
      param.append('contentType', file.type)
      param.append('fileType', fileType)
      param.append('appCode', config.appCode)
      apis.file.upload(param).then((res) => {
        resDeal(
          res,
          (data) => {
            onSuccess()
            file.url = data.file.url
            file.uid = data.file.code
            state.fileListCode.push(data.file.code)
            emit('on-change', { file: data.file, fileListCode: toRaw(state.fileListCode) })
          },
          () => {
            onError()
          }
        )
      })
    }
    return {
      accept,
      number,
      handleCancel,
      handelRemove,
      handlePreview,
      beforeUpload,
      customRequestHandel,
      ...toRefs(state)
    }
  }
})
</script>