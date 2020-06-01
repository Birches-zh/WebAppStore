<template>
  <div class="slider-wrapper">
    <!-- v-if 意思是没有数据才懒加载 -->
    <me-loading inline v-if="!sliders.length"></me-loading>
    <!-- 传参 -->
    <!-- else就直接输出数据-->
    <me-slider
      :data="sliders"
      :direction="direction"
      :loop="loop"
      :interval="interval"
      :pagination="pagination"
      v-else
    >
      <!-- 这里直接写就会直接写到插槽位置 -->
      <swiper-slide v-for="(item,index) in sliders" :key="index">
        <a :href="item.linkUrl" class="slider-link">
          <img :src="item.picUrl" alt class="slider-img" />
        </a>
      </swiper-slide>
    </me-slider>
  </div>
</template>

<script>
import MeSlider from "base/slider";
import { swiperSlide } from "vue-awesome-swiper";// 业务组件
import { sliderOptions } from "./config";// 配置文件
import { getHomeSlider } from "api/home";//用axio插件来引入服务器上的数据
import MeLoading from "base/loading";
export default {
  name: "HomeSlider",
  components: {
    MeSlider,
    MeLoading,
    swiperSlide
  },
  data() {
    return {
      direction: sliderOptions.direction,
      loop: sliderOptions.loop,
      interval: sliderOptions.interval,
      pagination: sliderOptions.pagination,
      sliders: []
      // sliders: [
      //   //本地引入的图片，一定要加require，服务器上引入的就不用
      //   {
      //     linkUrl: "https://www.imooc.com",
      //     picUrl: require("./1.jpg")
      //   },
      //   {
      //     linkUrl: "https://www.imooc.com",
      //     picUrl: require("./2.jpg")
      //   },
      //   {
      //     linkUrl: "https://www.imooc.com",
      //     picUrl: require("./3.jpg")
      //   },
      //   {
      //     linkUrl: "https://www.imooc.com",
      //     picUrl: require("./4.jpg")
      //   }
      // ]
    };
  },
  created() {
    this.getSliders();
  },
  methods: {
    //API
    update(){
     return this.getSliders();
    },
    //获取数据，然后赋值给sliders
    getSliders() {
      return getHomeSlider().then(data => {
        this.sliders = data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.slider-wrapper {
  height: 183px;
}
.slider-link {
  display: block;
}
.slider-link,
.slider-img {
  width: 100%;
  height: 100%;
}
</style>