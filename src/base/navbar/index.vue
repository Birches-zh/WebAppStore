<template>
    <div class="mine-navbar">
        <!-- v-if表示没用则不会被渲染出来，被用才显示，注意这里写的是$slots -->
        <div class="mine-navbar-left" v-if="$slots.left">
            <slot name="left"></slot>
        </div>
        <div class="mine-navbar-center" v-if="$slots.center">
            <slot name="center"></slot>
        </div>
        <div class="mine-navbar-right" v-if="$slots.right">
            <slot name="right"></slot>
        </div>
        <!-- 因为省略号会和布局冲突，所以要把v-text写在span里 -->
        <h1 class="mine-navbar-title" v-if="title">
            <span class="mine-navbar-text" v-text="title"></span>
        </h1>
    </div>
</template>

<script>
export default {
    name:'MeNavbar',
    props:{
        title:{
            type:String,//不传则是空
            default:""
        }
    }
};
</script>

<style lang="scss" scoped>
    @import "~assets/scss/mixins";

    .mine-navbar{
        position:relative;
        @include flex-between();
        height:50px;
        background-color:#fff;
        
        &-left{
            margin-left:10px;
            ~ .mine-navbar-right{//~表示后面有这个class就会生效，不一定是紧挨着的
                position:static;
            }
        }

        &-center{
            flex:1;
            margin:0 10px;
            ~ .mine-navbar-right{//left和right其中有一个存在就让它设置static
                position:static;
            }
        }
        &-right{
            position:absolute;
            right:0;
            @include flex-center();
            height:100%;
            margin-right:10px;
        }
        &-title{
            position: absolute;
            top: 0;
            bottom: 0;
            left:20%;
            right:20%;
            @include flex-center();
            text-align:center;
        }
        // line-height和width是为了防止字被overflow：hidden隐藏
        &-text{
            width:100%;
            font-size: 18px;
            line-height:1.5;
            @include ellipsis();
        }
    }
</style>