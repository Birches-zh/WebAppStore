<template>
  <swiper :options="swiperOption" ref="swiper">
    <div class="mine-scroll-pull-down" v-if="pullDown">
      <me-loading :text="pullDownText" inline ref="pullDownLoading"></me-loading>
    </div>
    <swiper-slide>
      <!-- 滚动条只有一个swiperSlider，所以在这里就添加了一个slot -->
      <slot></slot>
    </swiper-slide>
    <div class="mine-scroll-pull-up" v-if="pullUp">
      <me-loading :text="pullUpText" inline ref="pullUpLoading"></me-loading>
    </div>
    <!-- 这个是滚动条的拉条 -->
    <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
  </swiper>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import MeLoading from "base/loading";
import {
  //下拉
  PULL_DOWN_HEIGHT,
  PULL_DOWN_TEXT_INIT,
  PULL_DOWN_TEXT_START,
  PULL_DOWN_TEXT_ING,
  PULL_DOWN_TEXT_END,
  // 上拉
  PULL_UP_HEIGHT,
  PULL_UP_TEXT_INIT,
  PULL_UP_TEXT_START,
  PULL_UP_TEXT_ING,
  PULL_UP_TEXT_END
} from "./config";

export default {
  name: "MeScroll",
  components: {
    swiper,
    swiperSlide,
    MeLoading
  },
  props: {
    scrollbar: {
      //默认是需要滚动条的
      type: Boolean,
      default: true
    },
    data: {
      //这是为了recommend获取到值之后更新滚动条,监听传进来data的数据,不需要写默认值
      type: [Array, Object]
    },
    pullDown: {
      type: Boolean,
      default: false
    },
    pullUp: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  watch: {
    //外面传过来的data值发生了变化就执行update更新滚动条
    data() {
      this.update();
    }
  },
  created(){
    this.init();
  },
  methods: {
    update() {//更新滚动条，要先获取swiper.update，这里的swiper是构造函数，而不是swiper组件
      //数据准备好了，但不保证DOM渲染出来了
      //在这里执行以下update
      this.$nextTick(() =>{
        this.$refs.swiper && this.$refs.swiper.swiper.update();
      });
    },
    scrollToTop(speed,runCallbakcs){//返回顶部
      this.$refs.swiper && this.$refs.swiper.swiper.slideTo(0,speed,runCallbakcs);
    },
    init() {
      this.pulling = false; //是否正在上拉或下拉，默认是false
      this.pullDownText = PULL_DOWN_TEXT_INIT;
      this.pullUpText = PULL_UP_TEXT_INIT;
      this.swiperOption = {
        //配置参数
        direction: "vertical", //垂直滚动条
        slidesPerView: "auto", //一页能看几张图片
        freeMode: true, //可以自由滚动距离
        setWrapperSize: true, //自动获取页面的高度
        scrollBar: {
          //如果scrollbar为true则显示
          el: this.scrollbar ? ".swiper-scrollbar" : null,
          hide: true //hide为自动隐藏
        },
        on: {
          //滚动的事件触发
          sliderMove: this.scroll,
          touchEnd: this.touchEnd,
          transitionEnd:this.scrollEnd
        }
      };
    },
    scroll() {
      const swiper = this.$refs.swiper.swiper; //前面是swiper组件，后面的是swiper的实例对象

      //传出一个判断什么时候返回顶部按钮什么时候显示什么时候隐藏
      this.$emit('scroll',swiper.translate,swiper);

      if (this.pulling) {
        //如果为真表示正在上拉或下拉
        return;
      }
      if (swiper.translate > 0) {
        //下拉
        //下拉刷新，首先大于0
        if (!this.pullDown) {
          return;
        }
        if (swiper.translate > PULL_DOWN_HEIGHT) {
          // this.pullDownText = '111';这样会照成渲染时页面的一个闪动，解决这个BUG用API来改变值
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_START);
        } else {
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_INIT);
        }
      } else if (swiper.isEnd) {
        //上拉，isEnd是判断是否到了底部
        if (!this.pullup) {
          return;
        }
        //Math.abs是绝对值的意思，isPullUp是判断是否达到了触发的条件
        const isPullUp =
          Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT >
          parseInt(swiper.$wrapperEl.css("height"));

        if (isPullUp) {
          this.$refs.pullUpLoading.setText(PULL_UP_TEXT_START);
        } else {
          this.$refs.pullUpLoading.setText(PULL_UP_TEXT_INIT);
        }
      }
    },
    scrollEnd(){
      //滚动停止,触发backtotop的图标显示
      const swiper = this.$refs.swiper.swiper;
      this.$emit('scroll-end',swiper.translate,swiper,this.pulling);
    },
    touchEnd() {
      const swiper = this.$refs.swiper.swiper; //前面是swiper组件，后面的是swiper的实例对象

      if (this.pulling) {
        //如果为真表示正在上拉或下拉
        return;
      }
      if (swiper.translate > PULL_DOWN_HEIGHT) {
        if (!this.pullDown) {
          return;
        }

        this.pulling = true;
        swiper.allowTouchMove = false; //禁止触摸，正在加载你还想触摸？
        swiper.setTransition(swiper.params.speed); //通过参数找到初始的速度
        swiper.setTranslate(PULL_DOWN_HEIGHT); //touchEnd之后移动到100的位置
        swiper.params.virtualTranslate = true; //定住不给回弹
        this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_ING); //更改文字
        //因为是基础组件，所以不更新数据
        //在这里最后传一个加载完成之后执行的方法，也就是要传一个pull-down自定义方法出去，里面有pullDownEnd方法
        this.$emit("pull-down", this.pullDownEnd);
      } else if (swiper.isEnd) {
        //底部
        const totalHeight = parseInt(swiper.$wrapperEl.css("height"));
        const isPullUp =
          Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT >
          totalHeight; //判断是否满足触发条件
        if (isPullUp) {
          //上拉
          if (!this.pullUp) {
            return;
          }
          this.pulling = true;
          swiper.allowTouchMove = false; //禁止触摸
          swiper.setTransition(swiper.params.speed);
          swiper.setTranslate(-(totalHeight + PULL_UP_HEIGHT - swiper.height));
          swiper.params.virtualTranslate = true; //定住不给回弹
          this.$refs.pullUpLoading.setText(PULL_UP_TEXT_ING);
          this.$emit("pull-up", this.pullUpEnd);
        }
      }
    },
    pullDownEnd() {
      //上拉结束恢复原值
      this.pulling = false;
      const swiper = this.$refs.swiper.swiper;
      this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_END);
      swiper.params.virtualTranslate = false; //可以回弹
      swiper.allowTouchMove = true; //可以触摸
      swiper.setTransition(swiper.params.speed);
      swiper.setTranslate(0); //回到原始的位置
      setTimeout(() => {//这是下拉回弹后把Header显示出来的一个事件
      this.$emit('pull-down-transition-end')
      },swiper.params.speed);
    },
    pullUpEnd() {
      const swiper = this.$refs.swiper.swiper;
      this.pulling = false;
      this.$refs.pullUpLoading.setText(PULL_UP_TEXT_END);
      swiper.params.virtualTranslate = false; //可以回弹
      swiper.allowTouchMove = true; //可以触摸
    }
  }
};
</script>
<style lang="scss"scoped>
.swiper-container {
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.swiper-slide {
  height: auto;
}
.mine-scroll-pull-up,
.mine-scroll-pull-down {
  position: absolute;
  left: 0;
  width: 100%;
}
.mine-scroll-pull-down {
  bottom: 100%;
  height: 80px;
}
.mine-scroll-pull-up {
  top: 100%;
  height: 30px;
}
</style>