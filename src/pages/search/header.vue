<template>
<me-navbar class="header">
    <i class="iconfont icon-back" slot="left" @click="goBack"></i>
    <me-search-box slot="center" placeholder="开学季有礼，好货5折起" @query="query"></me-search-box>
</me-navbar>
</template>
<script>
import MeNavbar from 'base/navbar';
import MeSearchBox from 'base/search-box';
export default {
    components:{
        MeNavbar,
        MeSearchBox
    },
    methods:{
        query(query){
            this.$emit("query",query);
        },
        goBack(){//返回上一级
            this.$router.back();
        }
    }
}
</script>
<style lang="scss"scoped>

</style>