<template>
  <div>
    <div class="recommend">
      <h3 class="recommend-title">热卖推荐</h3>
      <div class="loading-container" v-if="!recommends.length">
          <me-loading inline ></me-loading>
      </div>
      <ul class="recommend-list" v-else>
        <li class="recommend-item" v-for="(item,index) in recommends" :key="index">
          <!-- 因为是组件之间的跳转，就用router-link，后面还跟一些参数，要写成对象，并且要写name不能写path -->
          <router-link
            class="recommend-link"
            :to="{name:'home-product', params: {id: item.baseinfo.itemId}}"
          >
            <p class="recommend-pic">
              <!-- v-lazy是懒加载插件的 -->
              <img class="recommend-img" v-lazy="item.baseinfo.picUrlNew" />
            </p>
            <p class="recommend-name">{{item.name.shortName}}</p>
            <p class="recommend-origPrice">
              <del>￥{{item.price.origPrice}}</del>
            </p>
            <p class="recommend-info">
              <span class="recommend-price">
                ￥
                <strong class="recommend-price-num">{{item.price.actPrice}}</strong>
              </span>
              <span class="recommend-count">{{item.remind.soldCount}}件已售</span>
            </p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getHomeRecommend } from "api/home";
import MeLoading from 'base/loading';
export default {
  name: "HomeRecommend",
  components:{
    MeLoading
  },
  data() {
    return {
      recommends: [],
      curPage: 1,
      totalPage: 1
    };
  },
  created() {
    this.getRecommend();
  },
  methods: {
    //API
    update(){
      return this.getRecommend();
    },
    getRecommend() {
      if (this.curPage > this.totalPage) {//错误的情况
        return Promise.reject(new Error('没有更多了'));
      }
      return getHomeRecommend(this.curPage).then(data => {
        return new Promise(resolve => {//只有这样写，才能判断data是否有值，不会因为data没有值而传了个undefined，而且这样才可以在index.vue执行后面的then
          if (data) {
          this.curPage++;
          this.totalPage = data.totalPage;
          this.recommends = this.recommends.concat(data.itemList); //就是添加在数组后面
          this.$emit('loaded',this.recommends);
          resolve();
        }
        })
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";
.recommend {
  &-title {
    position: relative;
    width: 100%;
    padding: 10px 0;
    font-size: $font-size-l;
    text-align: center;

    &:before,
    &:after {
      content: "";
      position: absolute;
      top: 50%;
      width: 40%;
      height: 1px;
      background-color: #ddd;
    }
    &:before {
      left: 0;
    }
    &:after {
      right: 0;
    }
  }
  &-list {
    @include flex-between();
    flex-wrap: wrap;
  }
  &-item {
      width:49%;
      background-color: #fff;
      box-shadow: 0 1px 1px 0 rgba(0,0,0,.12);
      margin-bottom: 8px;
  }
  &-link {
      display:block;
  }
  &-pic {//为了实现等比例放大，这下面的css是特殊的方法
      position: relative;
      width:100%;
      padding-top: 100%;//margin-top和padding-top是相对于宽的不是高的
      margin-bottom: 5px;
  } 
  &-img {
      position: absolute;
      top: 0;
      left:0;
      width:100%;
      height:100%;
  }
  &-name{
      height:36px;
      padding: 0 5px;
      margin-bottom: 8px;
      line-height:1.5;
      @include multiline-ellipsis();
  }
  &-origPrice{
      padding:0 5px;
      margin-bottom: 8px;
      color: #ccc;
  }
  &-info{
      @include flex-between();
      padding:0 5px;
      margin-bottom: 8px;
  }
  &-price{
      color:#e61414;
  }
  &-count{
      color:#999;
  }
}
.loading-container{
    padding-top:100px;
}
</style>