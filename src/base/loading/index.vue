<template>
  <div class="mine-loading" :class="{'mine-loading-inline':inline}">
    <!-- 图标：也不一定总是图片，如果OFF则不显示图片 -->
    <span class="mine-loading-indicator" v-if="indicator === 'on'">
      <slot>
        <img src="./loading.gif" alt="loading" />
      </slot>
    </span>
    <!-- 文字:也不一定总是文字，如果不是text提示文字就不显示 -->
    <span class="mine-loading-text" v-if="loadingText">{{loadingText}}</span>
  </div>
</template>
<script>
export default {
  name: "MeLoading",
  //接收参数
  props: {
    indicator: {
      type: String,
      default: "on",
      validator(value) {
        return ["on", "off"].indexOf(value) > -1;
      }
    },
    text: {
      type: String,
      default: "加载中..."
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    text(text) {
      this.loadingText = text;
    }
  },
  data() {
    //为了不再直接从子组件直接修改父组件的值的一个方法，自己再加一个值
    return {
      loadingText: this.text
    };
  },
  methods: {
    setText(text) {
      this.loadingText = text;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";
.mine-loading {
  overflow: hidden;
  width: 100%;
  height: 100%;
  @include flex-center(column);

  &.mine-loading-inline {
    flex-direction: row;
    .mine-loading-indicator ~ .mine-loading-text {
      //波浪线表示前者要能找到后者才能生效
      margin-top: 0;
      margin-left: 6px;
    }
  }
}
.mine-loading-indicator ~ .mine-loading-text {
  margin-top: 6px;
}
</style>