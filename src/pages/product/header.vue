<template>
<me-navbar class="header" title="商品详情">
<i class="iconfont icon-back" slot="left" @click="goBack"></i>
<i class="iconfont icon-cart" slot="right"></i>
</me-navbar>
</template>
<script>
import MeNavbar from 'base/navbar'
export default {
    data(){
        return{
        }
    },
    components:{
        MeNavbar
    },
    methods:{
        goBack(){
            this.$router.back();
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";
.header{
    &.mine-navbar{
        color: white;
        background-color: $header-bgc-translucent;
    }
    .iconfont{
        font-size: $icon-font-size;
        color: $icon-color-default;
    }
}
</style>