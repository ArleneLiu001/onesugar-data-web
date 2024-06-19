<template>
  <div class="meun-tabs">
    <span class="item"
          :class="{ active: active === tab.type }"
          v-for="tab in obj"
          :key="tab.type"
          @click="selectClick(tab)">{{ tab.title }}
      <span v-if="tab.amount"
            class="base-red">{{ tab.amount>99?'(99+)': tab.amount}}</span>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    obj: {
      type: Array,
      default: () => []
    },
    active: {
      type: Number,
      default: 0
    }
  },
  methods: {
    selectClick (obj) {
      if (obj.type === this.active) return
      this.$emit('select', obj)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
.meun-tabs {
  background: #fff;
  height: 40px;
  padding: 10px 0;
  margin-bottom: 8px;
  .item {
    line-height: 20px;
    color: rgba(0, 0, 0, 0.85);
    margin: 0 12px;
    padding-bottom: 5px;
    &.active,
    &:hover {
      border-bottom: 2px solid $base-color;
      font-weight: bold;
      cursor: pointer;
      color: $base-color;
    }
  }
}
</style>
