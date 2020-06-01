<template>
  <transition name="collage">
    <div class="collage-wrapper" v-show="visible">
      <div class="collage-true success">{{ message }}</div>
      <!-- <div class="collage-true" :class="{success:isActive}">收藏成功</div>
      <div class="collage-true" :class="{cancel:hasError}">取消收藏</div> -->
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: false
    },
    hasError: {
      type: Boolean,
      default: false
    },
    message:{
      type:String,
      default:''
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";
.collage-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
  z-index: $category-popup-z-index;
  width: 100%;
  height: 100px;
  @include flex-center();
  .success,
  .cancel {
    width: 40%;
    height: 130px;
    background-color: rgba(0, 0, 0, 0.5);
    text-align: center;
    line-height: 130px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 15px;
    color:white;
  }
}
.collage-enter-active,
.collage-enter-leave {
  transition: opacity 0.5s;
}
.collage-enter,
.collage-enter-to {
  opacity: 0;
}
</style>