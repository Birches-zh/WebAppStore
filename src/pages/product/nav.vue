<template>
  <div class="Product-nav g-footer-container">
    <div class="Product-nav-item">
      <i class="iconfont icon-home"></i>
      <span>首页</span>
    </div>
    <div class="Product-nav-item">
      <i class="iconfont icon-service"></i>
      <span>客服</span>
    </div>
    <div class="Product-nav-item"  v-on:click="collageActive">
      <i class="iconfont" :class="{'icon-collect1':success,'icon-collect2':cancel}"></i>
      <span ref="collage">收藏</span>
    </div>
    <div class="Product-nav-item shop">
      <span>加入购物车</span>
    </div>
    <div class="Product-nav-item quick">
      <span>马上抢</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "ProductNav",
  data(){
    return{
      collage:false,
      success:true,
      cancel:false
    }
  },
  methods: {
    collageActive(){
      if(this.collage === false){
      this.success=false;
      this.cancel=true;
      this.collage =true;
      this.$refs.collage.innerHTML="已收藏"
      this.$emit('CollageSuccess');
      }else{
      this.success=true;
      this.cancel=false;
      this.collage =false;
      this.$refs.collage.innerHTML="收藏"
      this.$emit('CollageCancel');
      }

    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";
.Product-nav {
  z-index: $tabbar-z-index;
  display: flex;
  width: 100%;
  height: $tabbar-height;
  background-color: #fff;
}
.Product-nav-item {
  flex: 1;
  @include flex-center(column);
  .iconfont {
    margin-bottom: 4px;
    font-size: $icon-font-size;
  }
}
.shop {
  flex: 2;
  color: white;
  background-color: rgb(255, 149, 0);
}
.quick {
  flex: 2;
  color: white;
  background-color: rgb(255, 0, 54);
}
.icon-collect{
  font-size:1px;
}
</style>