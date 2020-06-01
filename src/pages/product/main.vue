<template>
  <div class="main">
    <div class="main-banner">
      <i>
        ￥
        <span>{{main.priceText}}</span>
      </i>
      <div>{{main.soldCount}}件已售</div>
    </div>
    <div class="main-title">
      <span>{{main.title}}</span>
    </div>
    <div class="main-msg">
    <span>{{main.postage}}</span>
    <span>月销量 {{main.sellCount}}件</span>
    <span>{{main.from}}</span>
    </div>
  </div>
</template>
<script>
import { getProductMain } from "api/product";
export default {
  name: "ProductMain",
  data() {
    return {
      main: []
    };
  },
  created() {
    this.getMain(this.$route.params.id);
  },
  methods: {
    getMain(id) {
      if (id === undefined) {
        return;
      }
      return getProductMain(id).then(data => {
        if (!data) {
          return;
        }
        this.main = data;
        if (this.main.postage === "快递: 0.00") {
          this.main.postage = "包邮";
        }
        if (parseInt(this.main.sellCount) > 10000) {
          this.main.sellCount = Math.ceil(parseInt(this.main.sellCount) / 10000)+'万';
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";
.main {
  width: 100%;
  &-banner {
    height: 44px;
    border-top: 2px solid #f47896;
    background: linear-gradient(to right, #ef338f, #ef3648);
  }
  &-title {
    height: 35px;
    line-height: 35px;
    font-size: 13px;
    background-color: white;
    border-bottom: 1px solid $bgc-theme;
    padding: 0 10px;
    color: black;
    @include ellipsis();
  }
  &-msg {
    height: 26px;
    line-height: 26px;
    background-color: white;
    padding: 0 10px;
    @include flex-between();
  }
  &-banner {
    color: white;
    @include flex-between();
    padding: 0 10px;
  }
  &-banner span {
    font-size: 20px;
  }
  &-banner div {
    background-color: #cc2e43;
    width: 82px;
    height: 26px;
    text-align: center;
    line-height: 26px;
    border-radius: 5px;
    font-size: 10px;
  }
}
</style>