<template>
  <transition name="product">
    <div class="product" v-if="isShow">
      <me-collage 
      :visible="visible"
      :isActive="isActive"
      :hasError="hasError"
      :message="message"
      ></me-collage>
      <header class="g-header-container">
        <product-header></product-header>
      </header>
      <div class="g-view-container">
      <me-scroll>
        <product-slider></product-slider>
        <me-loading inline v-show="!loading"></me-loading>
        <div v-show="loading">
          <product-main></product-main>
          <product-comment @update="updates"></product-comment>
          <product-shop></product-shop>
          <product-detail></product-detail>
        </div>
      </me-scroll>
      </div>
      <product-nav @CollageSuccess="CollageSuccess" @CollageCancel="CollageCancel"></product-nav>
    </div>
  </transition>
</template>
<script>
import ProductHeader from "./header";
import ProductSlider from "./slider";
import ProductMain from "./main";
import ProductComment from "./comment";
import ProductShop from "./shop";
import ProductNav from "./nav";
import ProductDetail from "./detail";
import MeLoading from "base/loading";
import MeScroll from "base/scroll";
import MeCollage from "base/collage";

export default {
  name: "home-product",
  components: {
    ProductHeader,
    ProductSlider,
    ProductMain,
    ProductComment,
    ProductShop,
    ProductNav,
    ProductDetail,
    MeScroll,
    MeLoading,
    MeCollage
  },
  data() {
    return {
      data: {},
      isShow: false,
      loading: false,
      visible: false,
      isActive:false,
      hasError:false,
      message:''
    };
  },
  methods: {
    updates(comment) {
      this.data = comment;
      this.loading = true;
    },
    CollageSuccess() {
      this.visible = true;
      this.isActive = true;
      setTimeout(() => {
        this.visible = false;
        this.isActive = false;
      }, 1200);
      this.message="收藏成功！"
    },
    CollageCancel() {
      this.visible = true;
      this.hasError = true;
      setTimeout(() => {
        this.visible = false;
        this.hasError = false;
      }, 1200);
      this.message="取消收藏！"
    }
  },
  mounted() {
    this.isShow = true;
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";
.product {
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  z-index: $product-z-index;
  width: 100%;
  height: 100%;
  background-color: $bgc-theme;
  &-enter-active,
  &-leave-active {
    transition: all 0.3s;
  }
  &-enter,
  &-leave-to {
    transform: translateX(100%);
  }
}
</style>