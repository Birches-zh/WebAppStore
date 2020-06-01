<template>
  <div class="content-wrapper">
    <!-- loading -->
    <div class="loading-container" v-if="isLoading">
      <div class="loading-wrapper">
        <me-loading></me-loading>
      </div>
    </div>
    <me-scroll ref="scroll" @scroll="scroll">
      <div class="content">
        <!-- pic -->
        <div class="pic" v-if="content.banner">
          <a :href="content.banner.linkUrl" class="pic-link">
            <img :src="content.banner.picUrl" alt class="pic-img" />
          </a>
        </div>
        <!--section -->
        <div class="section" v-for="(section,index) in content.data" :key="index">
          <h4 class="section-title">{{section.name}}</h4>
          <ul class="section-list">
            <li class="section-item" v-for="(item,i) in section.itemList" :key="i">
              <a :href="item.linkUrl" class="section-link">
                <p class="section-pic" v-if="item.picUrl">
                  <img @load="updateScroll" v-lazy="item.picUrl" alt class="section-img" />
                </p>
                <p class="section-name">{{item.name}}</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </me-scroll>
    <div class="g-backtop-container">
      <me-backtop @backtop="backToTop" :visible="isBacktopVisible"></me-backtop>
    </div>
  </div>
</template>
<script>
import MeLoading from "base/loading";
import MeScroll from "base/scroll";
import MeBacktop from "base/backtop";
import { getCategoryContent } from "api/category";
import storage from "assets/js/storage";
import {
  CATEGORY_CONTENT_KEY,
  CATEGORY_CONTENT_UPDATE_TIME_INTERVAL
} from "./config";
export default {
  name: "CategpryContent",
  components: {
    MeLoading,
    MeScroll,
    MeBacktop
  },
  props: {
    curId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      content: {},
      isBacktopVisible: false,
      isLoading: false
    };
  },
  watch: {
    //curId的值传过来就开始获取数据
    curId(id) {
      this.isLoading = true;
      this.getContent(id).then(() => {
        this.isLoading = false;
        this.backToTop(0);
      });
    }
  },
  methods: {
    //获取数据
    getContent(id) {
      //本地获取数据
      let contents = storage.get(CATEGORY_CONTENT_KEY);
      let updateTime; //上一次保存的更新时间
      const curTime = new Date().getTime(); //当前的时间，获取它的时间初

      if (contents && contents[id]) {
        updateTime = contents[id].updateTime || 0; //获取contents对象的id时间初，没有就给它个0
        if (curTime - updateTime <= CATEGORY_CONTENT_UPDATE_TIME_INTERVAL) {
          //小于24小时以内的都是在缓存期以内，所以在缓存中获取数据
          return this.getContentByLocalStorage(contents[id]); //它是一个promise对象，这样就可以继续做其它事
        } else {
          //HTTP
          return this.getContentByHTTP(id).then(() => {
            this.updateLocalStorage(contents, id, curTime);
          });
        }
      } else {
        //HTTP，如果contents获取不到内容就走这一步
        return this.getContentByHTTP(id).then(() => {
          this.updateLocalStorage(contents, id, curTime);
        });
      }
      //服务器获取数据
      // return getCategoryContent(id).then(data => {
      //   return new Promise(resolve => {
      //     if(data){
      //       this.content = data;
      //       resolve();
      //     }
      //   })
      // })
    },
    getContentByLocalStorage(content) {//从缓存获取数据
      this.content = content.data ;
      return Promise.resolve(); //表示成功的获取到了数据
    },
    getContentByHTTP(id) {//HTTP，如果contents获取不到内容就走这一步
      return getCategoryContent(id).then(data => {
        return new Promise(resolve => {
          if (data) {
            this.content = data;
            resolve();
          }
        });
      });
    },
    updateLocalStorage(contents, id, curTime){//更新localstorage数据
      contents = contents || {};
      contents[id] = {};
      contents[id].data = this.content;
      contents[id].updateTime = curTime;
      storage.set(CATEGORY_CONTENT_KEY,contents);
    },
    //滚动
    scroll(transition, scroll) {
      this.isBacktopVisible = transition < 0 && -transition > scroll.height;
    },
    //返回顶部
    backToTop(speed) {
      this.$refs.scroll && this.$refs.scroll.scrollToTop(speed);
    },
    //更新滚动条
    updateScroll() {
      this.$refs.scroll && this.$refs.scroll.update();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";
.content-wrapper {
  position: relative;
  height: 100%;
}
.loading-container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: $category-popup-z-index;
  @include flex-center();
  width: 100%;
  height: 100%;
  .mine-loading {
    color: #fff;
    font-size: 14px;
  }
}
.loading-wrapper {
  width: 50%;
  padding: 30px 0;
  background-color: $modal-bgc;
  border-radius: 4px;
}
.content {
  padding: 10px;
}
.pic {
  margin-bottom: 12px;
  &-link {
    display: block;
  }
  &-img {
    width: 100%;
  }
}
.section {
  margin-bottom: 12px;
  &:last-child {
    margin-bottom: 0;
  }
  &-title {
    height: 28px;
    line-height: 28px;
    color: #080808;
    font-weight: bold;
  }
  &-list {
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 10px 10px 0;
  }
  &-item {
    width: (100% / 3);
  }
  &-link {
    display: block;
  }
  &-pic {
    position: relative;
    width: 80%;
    padding-bottom: 80%;
    margin: 0 auto;
  }
  &-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  &-name {
    height: 36px;
    line-height: 36px;
    text-align: center;
    @include ellipsis();
  }
}
.g-backtop-container {
  bottom: 10px;
}
</style>