<template>
  <!-- swiper组件，swiperOption是从外面传过来的参数 -->
  <swiper :options="swiperOption" :key="keyId">
    <!-- 插槽在slider.vue中写的swiperslider组件就会被插到这里 -->
    <slot></slot>
    <!-- 分页器 -->
    <div class="swiper-pagination" v-if="pagination" slot="pagination"></div>
  </swiper>
</template>
<script>
// 引入swiper插件
import { swiper } from "vue-awesome-swiper";
export default {
  name: "MeSlider",
  components: {
    swiper
  },
  //接收参数
  props: {
    //滑动的方向
    direction: {
      type: String,
      default: "horizontal", //水平
      validator(value) {
        //验证，value是自己返回来的值，大于-1，就是这个两个值之一
        return ["horizontal", "vertical"].indexOf(value) > -1;
      }
    },
    //控制自动轮播和轮播速度
    interval: {
      type: Number,
      default: 3000,
      validator(value) {
        //验证，值必须大于0/
        return value >= 0;
      }
    },
    //无缝滚动
    loop: {
      type: Boolean,
      default: true
    },
    //分页器
    pagination: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default() {
        //因为数组不是基本类型，返回的是一个引用所以这样写，这里的写法，可以不需要传data参数，它的默认值是[]空数组
        return [];
      }
    }
  },
  data() {
    return {
      keyId: Math.random()
    };
  },
  watch: {
    data(newData) {
      if (newData.length === 0) {
        return;
      }
      this.swiperOption.loop = newData.length ===1 ? false : this.loop;//每次刷新后的loop需要重新判断一下
      this.keyId = Math.random();
    }
  },
  created(){
    this.init();
  },
  methods:{
    init(){//不写在data(){return{}}里是因为性能上的优化，只执行一次的东西写在那是性能上的浪费
      this.swiperOption = {
        watchOverflow: true, //只有一个slider(非loop),swiper会失效且隐藏导航
        direction: this.direction,
        autoplay: this.interval
          ? {
              //如果不为真就根本不开启自动轮播
              delay: this.interval,
              disableOnInteraction: false //一旦用户有交互就停止了自动轮播，就是自动轮播的时候你一滑就不自动轮播了false表示不停止
            }
          : false,
        slidesPerView: 1, //设置slider容器能够同时显示slider数量
        loop: this.data.length <= 1 ? false : this.loop, //无缝滚动
        pagination: {
          //分页器,el是分页器的元素
          el: this.pagination ? ".swiper-pagination" : null
        }
      }
    }
  }
};
</script>
<style lang="scss"scoped>
.swiper-container {
  width: 100%;
  height: 100%;
}
</style>