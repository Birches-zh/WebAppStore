<template>
<!-- 总的容器 -->
  <div id="app" class="g-container">

    <!-- 可视区的容器 -->
    <div class="g-view-container">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>

    <!-- 底部容器 -->
    <div class="g-footer-container">
      <c-tabbar></c-tabbar>
    </div>
  </div>
</template>

<script>
import CTabbar from 'components/tabbar'
export default {
  name: 'App',
  components:{
    CTabbar
  }
};
</script>

