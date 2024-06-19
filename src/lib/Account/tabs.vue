<template>
  <div class="login-lr">
    <span v-for="item in tabList" :key="item.type" @click="$emit('update:value', item.type), $emit('change')" :class="{ active: value === item.type }" :style="{ borderBottom: value === item.type ? `2px solid ${theme}` : 'none' }" v-text="item.text"></span>
  </div>
</template>

<script>
export default {
  name: 'tabsAccountBox',
  emits: ['change', 'update:value'],
  props: {
    value: {
      type: String,
      default: ''
    },
    tabList: {
      type: Array,
      default: () => []
    },
    theme: {
      type: String,
      default: '#3597D5'
    }
  }
}
</script>

<style lang="scss" scoped>
.login-lr {
  height: 50px;
  text-align: center;
  span {
    line-height: 50px;
    color: rgba(0, 0, 0, 0.65);
    display: inline-block;
    width: 130px;
    font-size: 16px;
    cursor: pointer;
  }
  &:last-child {
    margin-right: 0;
  }
  .active {
    color: rgba(0, 0, 0, 0.85);
    font-weight: bold;
  }
}
</style>