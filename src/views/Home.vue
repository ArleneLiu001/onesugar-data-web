<template>
  <div class="main">
    <div class="item-wrap">
      <div class="item-list" v-for="(item, index) in state.dataList" :key="index" @click="goDetail(item)">
        <img :src="item.img" class="item-img" />
        <div class="item-right">
          <h2
            ><div class="item-header">{{ item.header }}</div></h2
          >
          <div class="desc">{{ item.desc }}</div>
          <div class="flex item-footer">
            <div class="create-time">{{ item.createTime }}</div>
            <div class="item-reader">阅读({{ item.reader }}K)</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import { Image } from 'ant-design-vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const state = reactive({
  dataList: [
    {
      code: '1',
      header: '开发高并发秒杀抢购系统|基于SpringBoot3+Vue3 （更新完毕）',
      desc: '课程介绍：随着技术的不断发展和更新，Spring Boot 和 Vue.js 也分别迎来了它们的最新版本：Spring Boot 3 和 Vue 3。这两个框架的结合为开发者提供了更加高效、灵活的前后端分离开发模式。下面我们将对 Spring Boot 3 和 Vue 3 相关的概念知识点进行详细解释。',
      img: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      createTime: '2024-06-18',
      reader: '5'
    }
  ]
})
function goDetail(item) {
  router.push(`/detail?code=${item.code}`)
}
</script>
<style lang="scss" scoped>
.item-wrap {
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .item-list {
    cursor: pointer;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    width: 49%;
    height: 180px;
    background-color: #fff;
    padding-bottom: 10px;
    padding-top: 10px;
    border-bottom: 2px solid #dfe1e2;
    border-radius: 3px;
    &:nth-child(odd) {
      margin-right: 1%;
    }
    .item-img {
      width: 240px;
      height: 160px;
      margin-left: 10px;
      overflow: hidden;
      margin-right: 20px;
    }
    .item-right {
      position: relative;
      flex: 1;
      margin-right: 10px;
    }
    .item-header {
      color: #555;
      text-decoration: none;
      font-size: 18px;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: wrap;
    }
    .desc {
      font-size: 12px;
      color: #999;
      line-height: 1.6;
      margin-top: 10px;
      overflow: hidden;
      height: 60px;
      padding-right: 10px;
    }
    .item-footer {
      position: absolute;
      bottom: 10px;
      color: #bbb;
      .item-reader {
        margin-left: 10px;
      }
    }
  }
}
</style>