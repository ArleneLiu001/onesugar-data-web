<template>
  <div class="no-infoPage">
    <div class="img-part">
      <img :src="errorImg" />
      <div class="noinfo-detail">
        <p>你找的页面走丢了！</p>
        <a-button type="primary" @click="goRouter('/')">返回首页</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import errorImg from '@/assets/image/errorPage/404.png'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const router = useRouter()
    function goRouter(url) {
      router.push(url)
    }
    return {
      goRouter,
      errorImg
    }
  }
})
</script>

<style lang="scss" scoped>
.no-infoPage {
  background: #2a3642;
  height: calc(100vh - 150px);
  position: relative;
  .img-part {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    background: #2a3642;
    left: 0;
    right: 0;
    img {
      width: 787px;
      height: 542px;
    }
    .noinfo-detail {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -45px;
      text-align: center;
      p {
        font-size: 14px;
        color: #2a3642;
        text-align: center;
        margin-bottom: 10px;
        line-height: 23px;
      }
    }
  }
}
</style>
