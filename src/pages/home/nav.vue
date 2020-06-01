<template>
  <nav class="nav">
    <ul class="nav-list">
      <li class="nav-item" v-for="(item,index) in navs" :key="index">
        <a :href="item.linkUrl" class="nav-link">
          <img :src="item.picUrl" class="nav-pic" />
          <span>{{item.text}}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { navItems } from "./config";
export default {
  name: "HomeNav",
  created() {//因为只渲染一次，所以可以只写在created()里面，不需要在data()里面写navs的赋值，不然是性能上的浪费
    this.navs = navItems;
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";
.nav {
  width: 100%;
  padding-top: 15px;
  background-color: #fff;
  &-list{
    display: flex;
    flex-wrap:wrap;
  }
  &-item{
    width:20%;
    margin-bottom: 15px;
  }
  &-link{
    @include flex-center(column);
  }
  &-pic{
    width:60%;
    margin-bottom: 8px;
  }
}
</style>