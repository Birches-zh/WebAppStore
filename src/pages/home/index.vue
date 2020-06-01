<template>
  <div class="home">
    
    <!-- 头部 -->
    <header class="g-header-container">
      <home-header :class="{'header-transition':isHeaderTransition}" ref="header"></home-header>
    </header>

    <!-- 滚动页面 -->
    <me-scroll
      :data="recommends"
      pullDown
      pullUp
      @pull-down="pullToRefresh"
      @pull-up="pullToLoadMore"
      @scroll="scroll"
      @scroll-end="scrollEnd"
      @pull-down-transition-end="pullDownTransitionEnd"
      ref="scroll"
    >
      <home-slider ref="slider"></home-slider>
      <home-nav></home-nav>
      <home-recommend @loaded="getRecommends" ref="recommend"></home-recommend>
    </me-scroll>

    <!-- 返回顶部按钮 -->
    <div class="g-backtop-container">
      <me-backtop :visible='isBacktopVisible' @backtop='backToTop'></me-backtop>
    </div>
    <!-- 二级页面路由 -->
    <router-view></router-view>
  </div>
</template>
<script>
import HomeHeader from "./header";
import HomeSlider from "./slider";
import HomeNav from "./nav";
import HomeRecommend from "./recommend";
import MeScroll from "base/scroll";
import MeBacktop from 'base/backtop';
import {HEADER_TRANSITION_HEIGHT} from './config';

export default {
  name: "Home",
  components: {
    HomeHeader,
    HomeSlider,
    HomeNav,
    HomeRecommend,
    MeScroll,
    MeBacktop
  },
  data() {
    return {
      recommends: [],
      isBacktopVisible:false,//默认不显示
      isHeaderTransition:false
    };
  },
  methods: {
    updateScroll() {
      //更新滚动条
    },
    getRecommends(recommends) {
      //更新滚动条
      this.recommends = recommends;
    },
    pullToRefresh(end) {
      //触发scroll的touchEnd下的pullDownEnd
      this.$refs.slider.update().then(end);
      // setTimeout(() => {
      //   end();
      // },1000)
    },
    pullToLoadMore(end) {
      this.$refs.recommend.update().then(end)
        .catch(err => {
          if (err) {
            console.log(err);
          }
          end();
        });
      // setTimeout(() => {
      //   console.log('上拉');
      //   end();
      // }, 1000);
    },
    scroll(translate){//触发Header的CSS
      this.changeHeaderStatus(translate);
    },
    scrollEnd(translate,scroll,pulling){
      if(!pulling){//如果pulling不存在才能执行这个
            this.changeHeaderStatus(translate);
      }
      this.isBacktopVisible = translate < 0 && -translate > scroll.height;
    },
    pullDownTransitionEnd(){
      this.$refs.header.show();
    },
    backToTop(){
      this.$refs.scroll && this.$refs.scroll.scrollToTop(300);
    },
    changeHeaderStatus(translate){
      if(translate > 0){
        this.$refs.header.hide();
        return;
      }else{
        this.$refs.header.show();
        this.isHeaderTransition = -translate > HEADER_TRANSITION_HEIGHT;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";
.home {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: $bgc-theme;
}
</style>