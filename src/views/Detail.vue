<template>
  <div class="detail mt-20">
    <div class="detail-main">
      <div class="d-subtitle">{{ state.dataDetail.title }}</div>
      <div class="d-info">
        <span>{{ state.dataDetail.createTime }}</span>
        <span class="ml-20">作者：{{ state.dataDetail.author }}</span>
        <span class="ml-20">阅读（{{ state.dataDetail.reader }}）</span>
      </div>
      <div class="base-title tac font22 bold mt-30">{{ state.dataDetail.title }}</div>
      <div>
        <div class="font16 mt-30 mb-30 bold">课程介绍</div>
        <div>{{ state.dataDetail.desc }}</div>
        <img :src="state.dataDetail.img" alt="" />
      </div>
      <div class="couse-item">
        <div class="font16 mt-30 mb-30 bold">课程目录</div>
        <img :src="state.dataDetail.descImg" alt="" />
      </div>
      <div class="couse-item">
        <div class="font16 mt-30 mb-30 bold">更多好课推荐</div>
        <img :src="state.dataDetail.descImg" alt="" />
      </div>
      <div class="couse-item">
        <div class="font16 mt-30 mb-30 bold">课程下载</div>
        <img :src="state.dataDetail.descImg" alt="" />
      </div>
    </div>
    <div class="detail-right">
      <div class="d-top"></div>
      <div class="d-bottom">
        <div class="bold font18">最新文章</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import { Image } from 'ant-design-vue'
import { useRouter } from 'vue-router'
const state = reactive({
  dataDetail: {
    code: '1',
    title: 'React18 系统入门 进阶实战《欢乐购》',
    createTime: '2024年4月19日 下午2:52',
    img: '',
    descImg: '',
    moreRecord: '',
    reader: '2',
    author: '雷锋',
    desc: '前端技术专家 Dell 老师带你系统构建 React18 技术体系，并结合“欢乐购”项目，快速积累企业级前端项目实战经验，落地 React18 与 TypeScript 结合的实用开发技巧。同时老师分享了React框架核心源码实现原理的深度思考，进一步帮助大家 “学懂用活”，真正走近框架，全面提升技术实力。'
  }
})
</script>
<style lang="scss" scoped>
.detail {
  display: flex;

  .detail-main {
    margin-right: 20px;
    background-color: #fff;
    border-bottom: 2px solid #dfe1e2;
    border-radius: 3px;
    padding: 30px;
    .d-subtitle {
      font-size: 18px;
      margin: 0 0 10px;
      font-weight: 700;
    }
    .d-info {
      span {
        font-size: 12px;
        color: #999;
      }
    }
  }
  .detail-right {
    width: 360px;
    background-color: #fff;
    padding: 20px;
    .d-top {
    }
    .d-bottom {
      width: 360px;
    }
  }
}
</style>