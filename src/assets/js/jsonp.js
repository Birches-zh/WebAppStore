//获取数据
//第一步，引入

import jsonp from 'jsonp';


const parseParam = param =>{
    let params = [];
    for(const key in param){
        params.push([key,param[key]])
    }//变成这样[[page,1],[psize,20]]
    return params.map(value => value.join('=')).join('&')//[page=1,page=20] ,再.join('&')就变成了page=1&psize=20
}


//提供外界接口，在外面暴露方法 //拼接url,返回的是一个promise对象
export default(url,data,options) =>{
    url +=(url.indexOf('?') < 0 ? '?' :'&') + parseParam(data);//<0表示url没有问号，没有问号给它加一个，有的话直接加&

    return new Promise((resolve,reject) =>{//需要返回的是一个promise对象
        jsonp(url,options,(err,data) => {
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}