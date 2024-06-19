<template>
  <div class="sub-header">
    <div class="container clearfix flex tac">
      <div class="header-wrap">
        <div class="header-left">
          <div class="left-logo">Arlene博客</div>
          <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" class="menu-style" />
        </div>

        <div class="header-right">
          <a-input-search v-model:value="state.inputValue" placeholder="输入标题" enter-button="搜索" size="large" @search="onSearch" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineComponent, ref, h, reactive } from 'vue'
import { Menu, Input } from 'ant-design-vue'
const current = ref(['mail'])
const state = reactive({
  inputValue: ''
})
const items = ref([
  {
    key: 'home',
    label: '首页'
  },
  {
    key: 'front',
    label: 'web前端'
  },
  {
    key: 'java',
    label: 'Java后端'
  },
  {
    key: 'bili',
    label: 'b站精华'
  },
  // {
  //   key: 'java',
  //   label: 'Java后端',
  //   children: [
  //     {
  //       type: 'group',
  //       label: 'Item 1',
  //       children: [
  //         {
  //           label: 'Option 1',
  //           key: 'setting:1'
  //         },
  //         {
  //           label: 'Option 2',
  //           key: 'setting:2'
  //         }
  //       ]
  //     },
  //   ]
  // },
  {
    key: 'self',
    label: h(
      'a',
      {
        href: 'https://arleneliu001.github.io/blog/',
        target: '_blank'
      },
      '个人博客'
    )
  }
])
function onSearch(e) {
  //
}
</script>
<style lang="scss" scoped>
.header-wrap {
  background: #fff;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .header-left {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .left-logo {
      font-size: 1.3rem;
      margin-right: 40px;
      font-weight: 600;
      color: #2c3e50;
      position: relative;
    }
    .menu-style {
      font-size: 16px;
    }
  }
}
</style>
