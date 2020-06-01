import storage from "assets/js/storage";
import { SEARCH_HISTORY_KEYWORD_KEY } from "pages/search/config";
export const searchMixin = {
    //把点击过的保存在localstorage
    //mixins在vue官网说最好写自己的私有方法，前面要加$_前缀
    methods:{
        $_search_selectItem(keyword) {
            console.log(keyword);
        let keywords = storage.get(SEARCH_HISTORY_KEYWORD_KEY, []);
        
        if (keywords.length !== 0) {
          //如果已经有保存过的了，还点击了它，就把原来的删除然后重新保存，就显示在最开头的
        keywords = keywords.filter(val => val !== keyword);  //1、只要value值不等于keyword就保留下来
        }
        keywords.unshift(keyword); //2、最后再把keyword从头开始添加
        
        storage.set(SEARCH_HISTORY_KEYWORD_KEY, keywords);//3、最终把keywords的数组添加在localstorage里
  
        // location.href = `https://s.m.taobao.com/h5?event_submit_do_new_search_auction=1&_input_
        //       charset=utf-8&topSearch=1&atype=b&searchfrom=1&action=home%3Aredirect_app_action&from=
        //       1&sst=1&n=20&buying=buyitnow&q=${keyword}`;
      }
    }
}