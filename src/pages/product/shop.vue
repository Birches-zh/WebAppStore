<template>
  <div class="shop">
    <a :href="shop.taoShopUrl">
      <div class="shop-item">
        <div class="shop-img">
          <img class="shop-imgs" :src="shop.shopIcon" alt />
        </div>
        <div class="shop-name">
          <p>{{shop.shopName}}</p>
          <img class="shop-name-img" :src="shop.creditLevelIcon" alt />
        </div>
      </div>
      <div class="shop-detail">
        <ul class="shop-detail-text">
          <li v-for="(item,index) in shop.evaluates" :key="index">
            <span>{{item.title}} {{item.score}}</span>
          </li>
        </ul>
      </div>
    </a>
  </div>
</template>
<script>
import { getProductShop } from "api/product";
export default {
  name: "productShop",
  data() {
    return {
      shop: []
    };
  },
  created() {
    this.getShop(this.$route.params.id);
  },
  methods: {
    getShop(id) {
      return getProductShop(id).then(data => {
        this.shop = data;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";
.shop {
  display: block;
  margin-top: 8px;
  width: 100%;
  height: 113px;
  padding: 10px;
  background-color: white;
  &-item {
    height: 50px;
  }
  &-img {
    width: 50px;
    height: 50px;
    border: 1px solid #cbcbcb;
    margin-right: 10px;
    float: left;
  }
  &-imgs {
    width: 100%;
    height: 100%;
  }
  &-name {
    padding-top: 2px;
    height: 50px;
    line-height: 23px;
    margin-left: 9px;
    color: black;
    &-img {
      width: 29px;
      height: 14px;
    }
  }
  &-detail {
    padding: 20px 30px;
  }
  &-detail-text {
    @include flex-between();
  }
}
</style>