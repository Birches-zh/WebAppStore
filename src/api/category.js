import axios from 'axios';//引入axios
import {SUCC_CODE,TIMEOUT} from './config';

const CancelToken = axios.CancelToken;//取消前一次请求，是axios提供的一个方法
let cancel;//通过cancel来接收取消方法，通过它来取消请求
//获取内容数据--ajax
export const getCategoryContent = (id) =>{
    cancel && cancel('取消了前一次请求');
    cancel = null;
    return axios.get(`http://www.imooc.com/api/category/content/${id}`,{
        timeout:TIMEOUT,//这是一个延时
        cancelToken: new CancelToken(function executor(c){
            cancel = c;
        })
    }).then(res =>{
        if(res.data.code === SUCC_CODE){
            return res.data.content;
        }
        throw new Error(err);
    }).catch(err =>{
        if(axios.isCancel(err)){//取消前一次请求
            console.log(err)
        }else{
            //handle error
            console.log(err);
        }
    })
}