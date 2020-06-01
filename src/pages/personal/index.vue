<template>
<me-scroll>
    <img class="personal" src="./me.png" alt="">
</me-scroll>
</template>
<script>
import MeScroll from 'base/scroll'
export default {
    name:'personal',
    data(){
        return{

        }
    },
    components:{
        MeScroll
    }

}
</script>
<style lang="scss" scoped>
.personal{
    width:100%;
    height:100%;
}
</style>