<template>
  <div class="slider-wrapper">
    <me-loading inline v-if="!sliders.length"></me-loading>
    <me-slider
      :data="sliders"
      :direction="direction"
      :loop="loop"
      :interval="interval"
      :pagination="pagination"
      v-else
    >
    <swiper-slide v-for="(item,index) in sliders" :key="index">
        <a href="" class="slider-link">
            <img :src="item" alt="" class="slider-img">
        </a>
    </swiper-slide>
    </me-slider>
  </div>
</template>
<script>
import MeSlider from "base/slider";
import MeLoading from "base/loading";
//业务组件
import { swiperSlide } from "vue-awesome-swiper";
//配置文件
import { sliderOptions } from "./config";
//引入json数据
import { getProductSlider } from "api/product";
export default {
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
    };
  },
  created() {
    this.getSliders(this.$route.params.id);
  },
  methods: {
    getSliders(id) {
      if (id === undefined) {
        return;
      }
      return getProductSlider(id).then(data => {
        this.sliders = data.item.images;
        // console.log(data.item.moduleDescUrl);
        // this.$emit('DetailUrl',data.item.moduleDescUrl);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.slider-wrapper{
    height:425px;
    padding-top: 50px;  
}
.slider-link{
    display:block;
}
.slider-link
.slider-img{
    width:100%;
    height:100%;
}
</style>