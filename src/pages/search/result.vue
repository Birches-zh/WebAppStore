<template>
  <div class="result">
    <div class="loading-container" v-show="loading">
      <me-loading></me-loading>
    </div>
    <ul class="g-list" v-show="!loading && results.length">
      <li
      class="g-list-item"
      v-for="(item ,index) in results"
      :key="index"
      @click="$_search_selectItem(item[0])"
      >
    <span class="g-list-text">{{item[0]}}</span>
      </li>
    </ul>
    <div class="no-result" v-show="!loading && !results.length">没有结果</div>
  </div>
</template>
<script>
import MeLoading from 'base/loading';
import {getSearchResult} from 'api/search';
import {searchMixin} from 'assets/js/mixins';//点击的时候会用到

export default {
    name:'SearchResult',
    components:{
        MeLoading
    },
    mixins:[searchMixin],
    data(){
        return{
            results:[],
            loading:false
        }
    },
    props:{
        query:{
            type:String,
            default:''
        }
    },
    watch:{
        query(query) {
        this.getResult(query);
        }
    },
    methods: {
        getResult(keyword){
            if(!keyword){
                return;
            }
            this.loading=true;
            getSearchResult(keyword).then(data =>{
                if(data){
                    this.results = data;
                    this.loading=false;
                }
            });
        }
    }
};
</script>
<style lang="scss"scoped>
.loading-container{
    padding-top: 50px;
}
</style>