<template>
  <div class="img-modal-preview" v-show="showModal">
    <i v-if="showToggle" class="iconfont icon-round-left icon-img-modal icon-left" @click="handleToggle(false)"></i>
    <i v-if="showToggle" class="iconfont icon-round-right icon-img-modal icon-right" @click="handleToggle(true)"></i>
    <div class="img-modal-wrap">
      <i class="iconfont icon-eclose close" @click="close"></i>
      <img :src="showImg" alt="" />
    </div>
  </div>
</template>
<script>
import { defineComponent, computed, watch, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'ImagesPreview',
  props: {
    imgList: {
      type: Array,
      default: () => []
    },
    curIndex: {
      type: Number,
      default: 0
    }
  },
  setup(props, { emit }) {
    const { imgList, curIndex } = toRefs(props)
    const state = reactive({
      showModal: true,
      index: 0,
      showToggle: false,
      showImg: '',
      lists: []
    })
    watch(
      () => imgList.value,
      (val) => {
        if (val.length) {
          state.showImg = imgList.value[curIndex.value].url
          state.lists = [].concat(imgList.value)
        }
        state.showToggle = imgList.value.length > 1
      },
      {
        immediate: true
      }
    )
    function close() {
      state.showModal = false
      emit('close', false)
    }
    function handleToggle(flag) {
      state.index = flag ? ++state.index : --state.index
      if (state.index >= state.lists.length) {
        state.index = 0
      }
      if (state.index < 0) {
        state.index = state.lists.length - 1
      }
      state.showImg = state.lists[state.index].url
    }
    return {
      close,
      handleToggle,
      ...toRefs(state)
    }
  }
})
</script>
<style lang="scss" scoped>
.img-modal-preview {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  text-align: center;
  z-index: 800;

  .icon-img-modal {
    position: fixed;
    font-size: 30px;
    color: #fff;
    opacity: 0.8;
    cursor: pointer;
    z-index: 500;
    line-height: normal;

    &:hover {
      opacity: 1;
    }
  }

  .icon-right {
    bottom: 3%;
    right: 45%;
  }

  .icon-left {
    bottom: 3%;
    left: 45%;
  }

  .img-modal-wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 100;
    width: auto;
    max-height: 85%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    img {
      max-width: 85vw;
      max-height: 85vh;
    }

    .close {
      color: #fff;
      line-height: normal;
      font-size: 44px;
      position: absolute;
      right: -50px;
      top: -40px;
      z-index: 500;
      cursor: pointer;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
