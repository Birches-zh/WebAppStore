<template>
  <div class="comment">
    <h1 class="comment-h1">商品评价({{comment.totalCount}})</h1>
    <ul class="comment-list">
      <li class="comment-item" v-for="(item,index) in comment.keywords" :key="index">
        <span class="comment-link">{{item.word}}({{item.count}})</span>
      </li>
    </ul>
    <div class="comment-comment">
      <i class="comment-user">
        <img class="comment-img" :src="user.headPic" alt />
        {{user.userName}}
      </i>
      <p class="comment-text">{{user.content}}</p>
      <p class="comment-time">{{user.dateTime}} {{user.skuInfo}}</p>
    </div>
  </div>
</template>
<script>
import { getProductComment } from "api/product";
export default {
  data() {
    return {
      user: [],
      comment: []
    };
  },
  created() {
    this.getComment(this.$route.params.id);
  },
  methods: {
    getComment(id) {
      return getProductComment(id).then(data => {
        this.comment = data;
        this.user = this.comment.rateList[0];
        this.$emit("update", this.comment);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";
.comment {
  padding: 13px 10px;
  margin-top: 8px;
  background-color: white;
  &-h1 {
    height: 18px;
    font-size: 13px;
  }
  &-list {
    width: 100%;
    height: 100px;
    margin: 0 auto;
    padding: 10px 0;
    background-color: white;
  }
  &-item {
    float: left;
    box-sizing: border-box;
    width: 28%;
    height: 30px;
    margin: 5px 1%;
    background: #ffeeee;
    border-radius: 10px;
    line-height: 30px;
    text-align: center;
  }
  &-link {
    font-size: 10px;
  }
  &-user {
    height: 23px;
    line-height: 26px;
    display: block;
    margin: 0px 0px 10px 0;
  }
  &-img{
    margin-right:5px; 
    width:25px;
    height:25px;
    border-radius: 25px
  }
  &-text {
    color:black;
    height: 43px;
    line-height: 20px;
    @include ellipsi();
  }
  &-time {
    color: #999999;
    font-size: 10px;
    @include ellipsis();
  }
}
</style>
