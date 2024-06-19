<template>
  <div class="mask-modal">
    <div class="mask-dialog"></div>
    <div class="mask-box">
      <div class="mask-top">
        <img :src="img" alt />
        <span class="mask-close" :style="{color: theme}" @click="$emit('close')">×</span>
      </div>
      <div class="mask-content">
        <div class="mask-isolation" :style="{background: theme}"></div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MaskBox',
  props: {
    theme: {
      type: String,
      default: '#3597D5'
    },
    img: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.mask-modal {
  .mask-dialog {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    width: 100vw;
    height: 100vh;
    background: #000;
    opacity: 0.4;
  }
  .mask-box {
    position: fixed;
    left: 50%;
    top: 40%;
    z-index: 1010;
    transform: translate(-50%, -50%);
    width: 430px;
    border-radius: 5px;
    .mask-isolation {
      height: 10px;
    }
    .mask-top {
      position: relative;
      height: 72px;
      padding: 18px 24px;
      background: #313232;
      img {
        float: left;
        height: 36px;
      }
      .mask-close {
        position: absolute;
        right: 8px;
        top: 0px;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
      }
    }
    .mask-content {
      background: #fff;
      min-height: 350px;
    }
  }
}
</style>