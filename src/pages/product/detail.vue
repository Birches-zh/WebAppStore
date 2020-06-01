<template>
  <div class="detail">
    <h1 class="detail-title">宝贝详情</h1>
    <ul>
      <li>
        <img src alt />
      </li>
    </ul>
  </div>
</template>
<script>
import { getProductDetailText } from "api/product";
import { getProductDetail } from "api/product";
export default {
  data() {
    return {
      detailsText: [],
      details: []
    };
  },
  created() {
    this.getDetailText(this.$route.params.id);
  },
  methods: {
    getDetailText(id) {
      if (id === undefined) {
        return;
      }
      return getProductDetailText(id).then(data => {
        this.detailsText = data.item.moduleDescUrl;
        console.log(this.detailsText);
      });
      this.getDetail(this.detailsText);
    },
    getDetail(url) {
      console.log(url);
      if (url === undefined) {
        return;
      }
      return getProductDetail(url).then(data => {
        this.details = data;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";
.detail {
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
}
</style>