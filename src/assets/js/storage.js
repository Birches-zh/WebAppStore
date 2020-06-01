const storage = window.localStorage;

export default{
    //序列化传过来的值，将它变成字符串
    set(key,val){
        if(val === undefined){
            return;
        }
        storage.setItem(key,serialize(val));
    },
    //反序例化，将它变成对象
    get(key,def){//def是在调用的时候，如果没获取到返回的值
        const val = deserialize(storage.getItem(key));
        return val === undefined ? def :val;
    },
    //清除键的内容
    remove(key){
        storage.removeItem(key);
    },
    //所有内容都清掉
    clear(){
        storage.clear();
    }
};
function serialize(val){
    //会把传过来的值转换成字符串的意思
    //JSON.stringify(true);  // 'true'
    return JSON.stringify(val);
}
function deserialize(val){
    if(typeof val !=='string'){
        return undefined;
    }
    //try一定会执行，如果try有错误，就执行catch
    try{
    //服务器接收的数据转换成JavaScript对象
    // <p id="demo"></p>
 
    // <script>
    // var obj = JSON.parse('{ "name":"runoob", "alexa":10000, "site":"www.runoob.com" }');
    // document.getElementById("demo").innerHTML = obj.name + "：" + obj.site;
    // </script>
    return JSON.parse(val);
    }
    //处理并不是json.parse的格式
    catch(e){
        return val || undefined;
    }
}